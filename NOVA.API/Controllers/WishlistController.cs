
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NOVA.BLL.DTOs.Wishlist;
using NOVA.BLL.Interfaces;
using System.Security.Claims;

namespace NOVA.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistService _wishlistService;

        public WishlistController(IWishlistService wishlistService)
        {
            _wishlistService = wishlistService;
        }

        // GET: api/Wishlist/mine
        [Authorize]
        [HttpGet("mine")]
        public async Task<IActionResult> GetMyWishlist()
        {
            var claim = User.FindFirstValue(
                ClaimTypes.NameIdentifier);

            if (!int.TryParse(claim, out var userId))
                return Unauthorized(new
                {
                    message = "Invalid user identity in token."
                });

            var wishlist = await _wishlistService
                .GetByUserIdAsync(userId);

            return Ok(wishlist);
        }

        // GET: api/Wishlist/user/5 (legacy route)
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var wishlist = await _wishlistService
                .GetByUserIdAsync(userId);

            return Ok(wishlist);
        }

        // POST: api/Wishlist
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Add(
            [FromBody] CreateWishlistItemDto dto)
        {
            var claim = User.FindFirstValue(
                ClaimTypes.NameIdentifier);

            if (!int.TryParse(claim, out var userId))
                return Unauthorized();

            if (dto == null || dto.FurnitureId <= 0)
                return BadRequest(new
                {
                    message = "Invalid furniture ID."
                });

            dto.UserId = userId;

            try
            {
                var added = await _wishlistService.AddAsync(dto);

                if (!added)
                    return BadRequest(new
                    {
                        message = "Could not add furniture to wishlist."
                    });

                return Ok(new
                {
                    message = "Furniture added to wishlist successfully."
                });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new
                {
                    message = ex.Message
                });
            }
        }

        // DELETE: api/Wishlist/user/5/furniture/10
        [Authorize]
        [HttpDelete("user/{userId}/furniture/{furnitureId}")]
        public async Task<IActionResult> Remove(
            int userId,
            int furnitureId)
        {
            var claim = User.FindFirstValue(
                ClaimTypes.NameIdentifier);

            if (!int.TryParse(claim, out var currentUserId))
                return Unauthorized();

            if (currentUserId != userId)
                return Forbid();

            var removed = await _wishlistService
                .RemoveAsync(currentUserId, furnitureId);

            if (!removed)
                return NotFound(new
                {
                    message = "Wishlist item not found."
                });

            return Ok(new
            {
                message = "Furniture removed from wishlist successfully."
            });
        }
    }
}

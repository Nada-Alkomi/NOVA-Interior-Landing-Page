
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using NOVA.BLL.DTOs.Furniture;
using NOVA.BLL.Interfaces;

namespace NOVA.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FurnitureController : ControllerBase
    {
        private readonly IFurnitureService _furnitureService;

        public FurnitureController(IFurnitureService furnitureService)
        {
            _furnitureService = furnitureService;
        }

        // POST: api/Furniture
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create(
            [FromForm] CreateFurnitureDto dto)
        {
            var furniture = await _furnitureService.CreateAsync(dto);

            return Ok(furniture);
        }

        // GET: api/Furniture
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var furniture = await _furnitureService.GetAllAsync();

            return Ok(furniture);
        }

        // GET: api/Furniture/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var furniture = await _furnitureService.GetByIdAsync(id);

            if (furniture == null)
            {
                return NotFound(new
                {
                    message = "Furniture not found."
                });
            }

            return Ok(furniture);
        }

        // PUT: api/Furniture/5
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            [FromBody] UpdateFurnitureDto dto)
        {
            var updated = await _furnitureService.UpdateAsync(id, dto);

            if (!updated)
            {
                return NotFound(new
                {
                    message = "Furniture not found."
                });
            }

            return Ok(new
            {
                message = "Furniture updated successfully."
            });
        }

        // DELETE: api/Furniture/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _furnitureService.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Furniture not found."
                });
            }

            return Ok(new
            {
                message = "Furniture deleted successfully."
            });
        }

        // GET: api/Furniture/search
        [HttpGet("search")]
        public async Task<IActionResult> Search(
            [FromQuery] string? search,
            [FromQuery] int? categoryId,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice)
        {
            var furniture = await _furnitureService.SearchAsync(
                search,
                categoryId,
                minPrice,
                maxPrice);

            return Ok(furniture);
        }
    }
}

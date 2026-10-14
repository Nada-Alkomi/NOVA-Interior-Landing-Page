using System;
using System.Collections.Generic;
using System.Text;

using NOVA.BLL.DTOs.Wishlist;
using NOVA.BLL.Interfaces;
using NOVA.DAL.Models;
using NOVA.DAL.Repositories.UnitOfWork;

namespace NOVA.BLL.Services
{
    public class WishlistService : IWishlistService
    {
        private readonly IUnitOfWork _unitOfWork;

        public WishlistService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<WishlistItemDto>> GetByUserIdAsync(
            int userId)
        {
            var wishlistItems = await _unitOfWork.WishlistItems
                .FindAsync(x => x.UserId == userId);

            return wishlistItems.Select(MapToDto);
        }

        public async Task<bool> AddAsync(CreateWishlistItemDto dto)
        {
            var user = await _unitOfWork.Users
                .GetByIdAsync(dto.UserId);

            if (user == null)
                throw new InvalidOperationException(
                    $"User with ID {dto.UserId} was not found.");

            var furniture = await _unitOfWork.Furniture
                .GetByIdAsync(dto.FurnitureId);

            if (furniture == null)
                throw new InvalidOperationException(
                    $"Furniture with ID {dto.FurnitureId} was not found.");

            var alreadyExists = await _unitOfWork.WishlistItems
                .ExistsAsync(x =>
                    x.UserId == dto.UserId &&
                    x.FurnitureId == dto.FurnitureId);

            if (alreadyExists)
                throw new InvalidOperationException(
                    "This furniture item is already in your wishlist.");

            var wishlistItem = new WishlistItem
            {
                UserId = dto.UserId,
                FurnitureId = dto.FurnitureId,
                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.WishlistItems.AddAsync(wishlistItem);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RemoveAsync(
            int userId,
            int furnitureId)
        {
            var items = await _unitOfWork.WishlistItems
                .FindAsync(x =>
                    x.UserId == userId &&
                    x.FurnitureId == furnitureId);

            var wishlistItem = items.FirstOrDefault();

            if (wishlistItem == null)
                return false;

            _unitOfWork.WishlistItems.Delete(wishlistItem);

            await _unitOfWork.SaveChangesAsync();

            return true;
        }

     
private static WishlistItemDto MapToDto(
    WishlistItem wishlistItem)
        {
            var furniture = wishlistItem.Furniture;

            return new WishlistItemDto
            {
                Id = wishlistItem.Id,
                UserId = wishlistItem.UserId,
                FurnitureId = wishlistItem.FurnitureId,
                CreatedAt = wishlistItem.CreatedAt,

                FurnitureName = furniture?.Name ?? string.Empty,
                Description = furniture?.Description,
                Price = furniture?.Price ?? 0,
                ImageUrl = furniture?.ImageUrl,
                CategoryName = furniture?.Category?.Name
            };
        }

    }
}
using System.IO;
using System;
using System.Linq;
using NOVA.BLL.DTOs.Furniture;
using NOVA.BLL.Interfaces;
using NOVA.DAL.Models;
using NOVA.DAL.Repositories.UnitOfWork;

namespace NOVA.BLL.Services
{
    public class FurnitureService : IFurnitureService
    {
        private readonly IUnitOfWork _unitOfWork;

        public FurnitureService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<FurnitureDto>> GetAllAsync()
        {
            var furniture = await _unitOfWork.Furniture.GetAllAsync();
            return furniture.Select(MapToDto);
        }

        public async Task<FurnitureDto?> GetByIdAsync(int id)
        {
            var furniture = await _unitOfWork.Furniture.GetByIdAsync(id);

            if (furniture == null)
                return null;

            return MapToDto(furniture);
        }


        public async Task<FurnitureDto> CreateAsync(CreateFurnitureDto dto)
        {
            string? imageUrl = null;

            if (dto.ImageFile != null && dto.ImageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "images"
                );

                Directory.CreateDirectory(uploadsFolder);

                var extension = Path.GetExtension(dto.ImageFile.FileName);
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };

                if (!allowedExtensions.Contains(extension, StringComparer.OrdinalIgnoreCase))
                {
                    throw new InvalidOperationException(
                        "Only JPG, JPEG, PNG, and WEBP images are allowed."
                    );
                }

                var fileName = $"{Guid.NewGuid()}{extension}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                await using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.ImageFile.CopyToAsync(stream);
                }

                imageUrl = $"/images/{fileName}";
            }

            var furniture = new Furniture
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                ImageUrl = imageUrl,
                CategoryId = dto.CategoryId,
                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.Furniture.AddAsync(furniture);
            await _unitOfWork.SaveChangesAsync();

            return MapToDto(furniture);
        }


        public async Task<bool> UpdateAsync(int id, UpdateFurnitureDto dto)
        {
            var furniture = await _unitOfWork.Furniture.GetByIdAsync(id);

            if (furniture == null)
                return false;

            furniture.Name = dto.Name;
            furniture.Description = dto.Description;
            furniture.Price = dto.Price;
            furniture.ImageUrl = dto.ImageUrl;
            furniture.CategoryId = dto.CategoryId;
            furniture.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.Furniture.Update(furniture);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var furniture = await _unitOfWork.Furniture.GetByIdAsync(id);

            if (furniture == null)
                return false;

            _unitOfWork.Furniture.Delete(furniture);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<FurnitureDto>> SearchAsync(
            string? search,
            int? categoryId,
            decimal? minPrice,
            decimal? maxPrice)
        {
            var furniture = await _unitOfWork.Furniture.SearchAsync(
                search,
                categoryId,
                minPrice,
                maxPrice);

            return furniture.Select(MapToDto);
        }

        private static FurnitureDto MapToDto(Furniture furniture)
        {
            return new FurnitureDto
            {
                Id = furniture.Id,
                Name = furniture.Name,
                Description = furniture.Description,
                Price = furniture.Price,
                ImageUrl = furniture.ImageUrl,
                CategoryId = furniture.CategoryId,
                CategoryName = furniture.Category?.Name
            };
        }
    }
}
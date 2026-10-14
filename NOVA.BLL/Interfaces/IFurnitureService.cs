using NOVA.BLL.DTOs.Furniture;

namespace NOVA.BLL.Interfaces
{
    public interface IFurnitureService
    {
        Task<IEnumerable<FurnitureDto>> GetAllAsync();

        Task<FurnitureDto?> GetByIdAsync(int id);

        Task<FurnitureDto> CreateAsync(
            CreateFurnitureDto dto);

        Task<bool> UpdateAsync(
            int id,
            UpdateFurnitureDto dto);

        Task<bool> DeleteAsync(int id);

        Task<IEnumerable<FurnitureDto>> SearchAsync(
            string? search,
            int? categoryId,
            decimal? minPrice,
            decimal? maxPrice);
    }
}

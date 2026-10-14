using NOVA.DAL.Models;

namespace NOVA.DAL.Repositories.RepoFurniture
{
    public interface IRepoFurniture
    {
        Task<IEnumerable<Furniture>> GetAllAsync();

        Task<Furniture?> GetByIdAsync(int id);

        Task AddAsync(Furniture furniture);

        void Update(Furniture furniture);

        void Delete(Furniture furniture);

        Task<IEnumerable<Furniture>> SearchAsync(
            string? search,
            int? categoryId,
            decimal? minPrice,
            decimal? maxPrice);
    }
}
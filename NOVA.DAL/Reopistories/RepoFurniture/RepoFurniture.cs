using Microsoft.EntityFrameworkCore;
using NOVA.DAL.Data;
using NOVA.DAL.Models;

namespace NOVA.DAL.Repositories.RepoFurniture
{
    public class RepoFurniture : IRepoFurniture
    {
        private readonly AppDbContext _context;

        public RepoFurniture(AppDbContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Furniture>> GetAllAsync()
        {
            return await _context.Furnitures
                .Include(f => f.Category)
                .AsNoTracking()
                .ToListAsync();
        }



        public async Task<Furniture?> GetByIdAsync(int id)
        {
            return await _context.Furnitures
                .Include(f => f.Category)
                .FirstOrDefaultAsync(f => f.Id == id);
        }



        public async Task AddAsync(Furniture furniture)
        {
            await _context.Furnitures.AddAsync(furniture);
        }



        public void Update(Furniture furniture)
        {
            _context.Furnitures.Update(furniture);
        }



        public void Delete(Furniture furniture)
        {
            _context.Furnitures.Remove(furniture);
        }


     

        public async Task<IEnumerable<Furniture>> SearchAsync(
            string? search,
            int? categoryId,
            decimal? minPrice,
            decimal? maxPrice)
        {
            var query = _context.Furnitures
                .Include(f => f.Category)
                .AsNoTracking()
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(f =>
                    f.Name.Contains(search));
            }

            if (categoryId.HasValue)
            {
                query = query.Where(f =>
                    f.CategoryId == categoryId.Value);
            }

            if (minPrice.HasValue)
            {
                query = query.Where(f =>
                    f.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(f =>
                    f.Price <= maxPrice.Value);
            }

            return await query.ToListAsync();
        }
    }
}
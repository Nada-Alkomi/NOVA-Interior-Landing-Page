using NOVA.DAL.Data;
using NOVA.DAL.Models;
using NOVA.DAL.Repositories.GenericRepository;
using NOVA.DAL.Repositories.RepoFurniture;
using FurnitureRepository = NOVA.DAL.Repositories.RepoFurniture.RepoFurniture;

namespace NOVA.DAL.Repositories.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public IGenericRepository<User> Users { get; }
        public IGenericRepository<Category> Categories { get; }

        public IRepoFurniture Furniture { get; }

        public IGenericRepository<Service> Services { get; }
        public IGenericRepository<Project> Projects { get; }
        public IGenericRepository<ProjectMember> ProjectMembers { get; }
        public IGenericRepository<WishlistItem> WishlistItems { get; }
        public IGenericRepository<Document> Documents { get; }
        public IGenericRepository<ContactInquiry> ContactInquiries { get; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context;

            Users = new GenericRepository<User>(_context);
            Categories = new GenericRepository<Category>(_context);

            Furniture = new FurnitureRepository(_context);

            Services = new GenericRepository<Service>(_context);
            Projects = new GenericRepository<Project>(_context);
            ProjectMembers = new GenericRepository<ProjectMember>(_context);
            WishlistItems = new GenericRepository<WishlistItem>(_context);
            Documents = new GenericRepository<Document>(_context);
            ContactInquiries = new GenericRepository<ContactInquiry>(_context);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
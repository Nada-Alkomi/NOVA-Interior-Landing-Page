using NOVA.DAL.Models;
using NOVA.DAL.Repositories.GenericRepository;
using NOVA.DAL.Repositories.RepoFurniture;
using System;
using System.Collections.Generic;
using System.Text;


namespace NOVA.DAL.Repositories.UnitOfWork
{
    public interface IUnitOfWork
    {
        IGenericRepository<User> Users { get; }
        IGenericRepository<Category> Categories { get; }

        IRepoFurniture Furniture { get; }

        IGenericRepository<Service> Services { get; }
        IGenericRepository<Project> Projects { get; }
        IGenericRepository<ProjectMember> ProjectMembers { get; }
        IGenericRepository<WishlistItem> WishlistItems { get; }
        IGenericRepository<Document> Documents { get; }
        IGenericRepository<ContactInquiry> ContactInquiries { get; }

        Task<int> SaveChangesAsync();
    }
}

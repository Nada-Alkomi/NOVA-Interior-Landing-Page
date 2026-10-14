using Microsoft.EntityFrameworkCore;
using NOVA.DAL.Configurations;
using NOVA.DAL.Models;

namespace NOVA.DAL.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // =========================
        // DbSets
        // =========================

        public DbSet<User> Users { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Furniture> Furnitures { get; set; }

        public DbSet<Service> Services { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<ProjectMember> ProjectMembers { get; set; }

        public DbSet<WishlistItem> WishlistItems { get; set; }

        public DbSet<Document> Documents { get; set; }

        public DbSet<ContactInquiry> ContactInquiries { get; set; }


        // =========================
        // Model Configurations
        // =========================

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(
                new UserConfiguration()
            );

            modelBuilder.ApplyConfiguration(
                new CategoryConfiguration()
            );

            modelBuilder.ApplyConfiguration(
                new FurnitureConfiguration()
            );

            modelBuilder.ApplyConfiguration(
                new ServiceConfiguration()
            );

            modelBuilder.ApplyConfiguration(
                new ProjectConfiguration()
            );

            modelBuilder.ApplyConfiguration(
                new ProjectMemberConfiguration()
            );

            modelBuilder.ApplyConfiguration(
                new WishlistItemConfiguration()
            );

            modelBuilder.ApplyConfiguration(
                new DocumentConfiguration()
            );

            modelBuilder.ApplyConfiguration(
                new ContactInquiryConfiguration()
            );
        }
    }
}
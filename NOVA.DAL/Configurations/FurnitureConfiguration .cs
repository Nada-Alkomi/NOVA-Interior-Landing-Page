using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NOVA.DAL.Models;

namespace NOVA.DAL.Configurations
{
        public class FurnitureConfiguration : IEntityTypeConfiguration<Furniture>
        {
            public void Configure(EntityTypeBuilder<Furniture> modelBuilder)
            {
                modelBuilder.HasKey(x => x.Id);

                modelBuilder.Property(x => x.Name)
                    .IsRequired()
                    .HasMaxLength(150);

                modelBuilder.Property(x => x.Description)
                    .HasMaxLength(1000);

                modelBuilder.Property(x => x.Price)
                    .HasPrecision(18, 2)
                    .IsRequired();

                modelBuilder.Property(x => x.ImageUrl)
                    .HasMaxLength(500);

                modelBuilder.Property(x => x.CreatedAt)
                    .IsRequired();

                modelBuilder.HasOne(x => x.Category)
                    .WithMany(x => x.Furniture)
                    .HasForeignKey(x => x.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
            }
        }
    
}

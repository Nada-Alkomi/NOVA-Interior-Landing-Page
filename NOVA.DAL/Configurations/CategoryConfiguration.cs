using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NOVA.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> modelBuilder)
        {
            modelBuilder.HasKey(x => x.Id);

            modelBuilder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.HasIndex(x => x.Name)
                .IsUnique();

            modelBuilder.Property(x => x.Description)
                .HasMaxLength(500);

            modelBuilder.HasMany(x => x.Furniture)
                .WithOne(x => x.Category)
                .HasForeignKey(x => x.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

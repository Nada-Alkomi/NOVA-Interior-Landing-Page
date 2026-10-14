using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NOVA.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Configurations
{

    public class WishlistItemConfiguration : IEntityTypeConfiguration<WishlistItem>
    {
        public void Configure(EntityTypeBuilder<WishlistItem> modelBuilder)
        {
            modelBuilder.HasKey(x => x.Id);

            modelBuilder.Property(x => x.CreatedAt)
                .IsRequired();

            modelBuilder.HasIndex(x => new
            {
                x.UserId,
                x.FurnitureId
            })
            .IsUnique();

            modelBuilder.HasOne(x => x.User)
                .WithMany(x => x.WishlistItems)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.HasOne(x => x.Furniture)
                .WithMany(x => x.WishlistItems)
                .HasForeignKey(x => x.FurnitureId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

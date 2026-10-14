using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NOVA.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> modelBuilder)
        {
            modelBuilder.HasKey(x => x.Id);

            modelBuilder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(150);

            modelBuilder.HasIndex(x => x.Email)
                .IsUnique();

            modelBuilder.Property(u => u.Phone)
                .IsRequired()
                .HasMaxLength(20);

            modelBuilder.Property(u => u.Address)
                .IsRequired()
                .HasMaxLength(300);

            modelBuilder.Property(x => x.PasswordHash)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Property(x => x.Role)
                .IsRequired();

            modelBuilder.Property(x => x.CreatedAt)
                .IsRequired();
        }
    }
}

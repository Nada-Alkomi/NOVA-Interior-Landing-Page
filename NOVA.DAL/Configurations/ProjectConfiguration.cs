using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NOVA.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Configurations
{

    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> modelBuilder)
        {
            modelBuilder.HasKey(x => x.Id);

            modelBuilder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(200);

            modelBuilder.Property(x => x.Description)
                .HasMaxLength(2000);

            modelBuilder.Property(x => x.Status)
                .IsRequired();

            modelBuilder.Property(x => x.Progress)
                .IsRequired();

            modelBuilder.Property(x => x.ImageUrl)
                .HasMaxLength(500);

            modelBuilder.Property(x => x.CreatedAt)
                .IsRequired();

            modelBuilder.HasOne(x => x.User)
                .WithMany(x => x.Projects)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NOVA.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Configurations
{
    public class ServiceConfiguration : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> modelBuilder)
        {
            modelBuilder.HasKey(x => x.Id);

            modelBuilder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(150);

            modelBuilder.Property(x => x.Description)
                .HasMaxLength(1000);

            modelBuilder.Property(x => x.ImageUrl)
                .HasMaxLength(500);

            modelBuilder.Property(x => x.CreatedAt)
                .IsRequired();
        }
    }
}

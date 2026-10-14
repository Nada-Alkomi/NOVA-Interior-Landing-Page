using Microsoft.EntityFrameworkCore;
using NOVA.DAL.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Configurations
{

    public class DocumentConfiguration : IEntityTypeConfiguration<Document>
    {
        public void Configure(EntityTypeBuilder<Document> modelBuilder)
        {
            modelBuilder.HasKey(x => x.Id);

            modelBuilder.Property(x => x.FileName)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Property(x => x.FilePath)
                .IsRequired()
                .HasMaxLength(500);

            modelBuilder.Property(x => x.ContentType)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Property(x => x.FileSize)
                .IsRequired();

            modelBuilder.Property(x => x.UploadedAt)
                .IsRequired();

            modelBuilder.HasOne(x => x.User)
                .WithMany(x => x.Documents)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

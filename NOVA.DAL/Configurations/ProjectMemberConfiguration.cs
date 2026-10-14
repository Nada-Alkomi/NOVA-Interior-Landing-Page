using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NOVA.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Configurations
{

    public class ProjectMemberConfiguration : IEntityTypeConfiguration<ProjectMember>
    {
        public void Configure(EntityTypeBuilder<ProjectMember> modelBuilder)
        {
            modelBuilder.HasKey(x => new
            {
                x.ProjectId,
                x.UserId
            });

            modelBuilder.Property(x => x.AssignedAt)
                .IsRequired();

            modelBuilder.HasOne(x => x.Project)
                .WithMany(x => x.ProjectMembers)
                .HasForeignKey(x => x.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.HasOne(x => x.User)
                .WithMany(x => x.ProjectMembers)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

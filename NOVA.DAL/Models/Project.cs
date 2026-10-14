using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Models
{
    public class Project
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public ProjectStatus Status { get; set; }

        public int Progress { get; set; }

        public string? ImageUrl { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }


        // Customer who owns the project

        public User User { get; set; } = null!;


        // Team members working on the project

        public ICollection<ProjectMember> ProjectMembers { get; set; }
            = new List<ProjectMember>();
    }
}

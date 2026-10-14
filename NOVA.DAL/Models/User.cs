using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text;

namespace NOVA.DAL.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;


        public string PasswordHash { get; set; } = string.Empty;

        public UserRole Role { get; set; }

        public DateTime CreatedAt { get; set; }


        // Relationships

        public ICollection<Project> Projects { get; set; }
            = new List<Project>();

        public ICollection<ProjectMember> ProjectMembers { get; set; }
            = new List<ProjectMember>();

        public ICollection<WishlistItem> WishlistItems { get; set; }
            = new List<WishlistItem>();

        public ICollection<Document> Documents { get; set; }
            = new List<Document>();
    }
}

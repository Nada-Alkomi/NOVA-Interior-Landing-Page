using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Models
{
    public class ProjectMember
    {
        public int ProjectId { get; set; }

        public int UserId { get; set; }

        public DateTime AssignedAt { get; set; }


        // Relationships

        public Project Project { get; set; } = null!;

        public User User { get; set; } = null!;
    }
}

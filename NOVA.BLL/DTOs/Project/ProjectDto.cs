using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.BLL.DTOs.Project
{
  
        public class ProjectDto
        {
            public int Id { get; set; }
            public string Name { get; set; } = string.Empty;
            public string? Description { get; set; }
            public string Status { get; set; } = string.Empty;
            public int Progress { get; set; }
            public string? ImageUrl { get; set; }
            public int UserId { get; set; }
            public DateTime CreatedAt { get; set; }
        }
    
}

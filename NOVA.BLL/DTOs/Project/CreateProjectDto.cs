using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.BLL.DTOs.Project
{
    public class CreateProjectDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int UserId { get; set; }
        public string? ImageUrl { get; set; }
    }
}

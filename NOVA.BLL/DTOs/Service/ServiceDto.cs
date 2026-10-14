using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.BLL.DTOs.Service
{
    public class ServiceDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
    }
}

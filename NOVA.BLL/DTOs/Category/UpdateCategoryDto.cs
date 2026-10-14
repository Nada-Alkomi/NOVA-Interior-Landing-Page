using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.BLL.DTOs.Category
{
    public class UpdateCategoryDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}

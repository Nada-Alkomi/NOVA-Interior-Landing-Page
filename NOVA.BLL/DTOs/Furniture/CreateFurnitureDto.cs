
using Microsoft.AspNetCore.Http;

namespace NOVA.BLL.DTOs.Furniture
{
    public class CreateFurnitureDto
    {
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public decimal Price { get; set; }

        public IFormFile? ImageFile { get; set; }

        public int CategoryId { get; set; }
    }
}

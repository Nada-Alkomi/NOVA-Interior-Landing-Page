
namespace NOVA.BLL.DTOs.Wishlist
{
    public class WishlistItemDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int FurnitureId { get; set; }
        public DateTime CreatedAt { get; set; }

        // Furniture details
        public string FurnitureName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public string? CategoryName { get; set; }
    }
}

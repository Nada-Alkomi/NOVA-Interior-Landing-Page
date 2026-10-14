using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Models
{
    public class Furniture
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public decimal Price { get; set; }

        public string? ImageUrl { get; set; }

        public int CategoryId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }


        // Relationships

        public Category Category { get; set; } = null!;

        public ICollection<WishlistItem> WishlistItems { get; set; }
            = new List<WishlistItem>();
    }
}

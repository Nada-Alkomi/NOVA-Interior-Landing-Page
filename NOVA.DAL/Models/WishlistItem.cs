using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Models
{
    public class WishlistItem
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int FurnitureId { get; set; }

        public DateTime CreatedAt { get; set; }


        // Relationships

        public User User { get; set; } = null!;

        public Furniture Furniture { get; set; } = null!;
    }
}

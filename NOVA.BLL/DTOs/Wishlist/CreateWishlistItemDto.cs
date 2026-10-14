using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.BLL.DTOs.Wishlist
{
    public class CreateWishlistItemDto
    {
        public int UserId { get; set; }
        public int FurnitureId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

using NOVA.BLL.DTOs.Wishlist;

namespace NOVA.BLL.Interfaces
{
    public interface IWishlistService
    {
        Task<IEnumerable<WishlistItemDto>> GetByUserIdAsync(int userId);

        Task<bool> AddAsync(CreateWishlistItemDto dto);

        Task<bool> RemoveAsync(int userId, int furnitureId);
    }
}

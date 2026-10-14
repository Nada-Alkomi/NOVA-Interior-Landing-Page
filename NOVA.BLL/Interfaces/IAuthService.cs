using System;
using System.Collections.Generic;
using System.Text;

using NOVA.BLL.DTOs.Auth;

namespace NOVA.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<bool> RegisterAsync(RegisterDto dto);
        Task<string?> LoginAsync(LoginDto dto);
    }
}

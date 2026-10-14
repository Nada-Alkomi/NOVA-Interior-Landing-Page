using System;
using System.Collections.Generic;
using System.Text;

using NOVA.DAL.Models;

namespace NOVA.BLL.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}

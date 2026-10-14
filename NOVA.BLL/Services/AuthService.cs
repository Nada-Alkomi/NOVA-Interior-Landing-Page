using NOVA.BLL.DTOs.Auth;
using NOVA.BLL.Interfaces;
using NOVA.DAL.Models;
using NOVA.DAL.Repositories.UnitOfWork;
using Microsoft.AspNetCore.Identity;

namespace NOVA.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        private readonly PasswordHasher<User> _passwordHasher =
            new PasswordHasher<User>();

        public AuthService(IUnitOfWork unitOfWork, ITokenService tokenService)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;

        }

        public async Task<bool> RegisterAsync(RegisterDto dto)
        {
            
            if (dto.Password != dto.ConfirmPassword)
                return false;

            
            var emailExists = await _unitOfWork.Users
                .ExistsAsync(u => u.Email == dto.Email);

            if (emailExists)
                return false;

            
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                Address = dto.Address,
                Role = UserRole.Customer,
                CreatedAt = DateTime.UtcNow
            };

            
            user.PasswordHash =
                _passwordHasher.HashPassword(user, dto.Password);

            
            await _unitOfWork.Users.AddAsync(user);

            
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
        public async Task<string?> LoginAsync(LoginDto dto)
        {
            // 1. Find user by email
            var users = await _unitOfWork.Users
                .FindAsync(u => u.Email == dto.Email);

            var user = users.FirstOrDefault();

            if (user == null)
                return null;

            // 2. Verify password
            var result = _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                dto.Password
            );

            if (result == PasswordVerificationResult.Failed)
                return null;

            // 3. Generate JWT
            var token = _tokenService.GenerateToken(user);

            return token;
        }

    }
}
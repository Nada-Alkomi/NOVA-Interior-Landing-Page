using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NOVA.DAL.Data;
using NOVA.DAL.Models;

namespace NOVA.API.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAdminAsync(AppDbContext context)
        {
            var adminExists = await context.Users
                .AnyAsync(u => u.Role == UserRole.Admin);

            if (adminExists)
                return;

            var admin = new User
            {
                Name = "NOVA Admin",
                Email = "admin@nova.com",
                Phone = "01000000000",
                Address = "NOVA Office",
                Role = UserRole.Admin,
                CreatedAt = DateTime.UtcNow
            };

            var passwordHasher = new PasswordHasher<User>();

            admin.PasswordHash = passwordHasher.HashPassword(
                admin,
                "Admin@12345"
            );

            await context.Users.AddAsync(admin);
            await context.SaveChangesAsync();
        }
    }
}
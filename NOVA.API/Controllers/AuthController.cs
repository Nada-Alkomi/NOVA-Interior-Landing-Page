
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NOVA.BLL.DTOs.Auth;
using NOVA.BLL.Interfaces;
using NOVA.DAL.Data;
using System.Security.Claims;

namespace NOVA.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly AppDbContext _context;

        public AuthController(
            IAuthService authService,
            AppDbContext context)
        {
            _authService = authService;
            _context = context;
        }

        // POST: api/Auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var result = await _authService.RegisterAsync(dto);

            if (!result)
            {
                return BadRequest(new
                {
                    message = "Registration failed. Email may already exist or passwords do not match."
                });
            }

            return Ok(new
            {
                message = "User registered successfully."
            });
        }

        // POST: api/Auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var token = await _authService.LoginAsync(dto);

            if (token == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            return Ok(new
            {
                message = "Login successful.",
                token = token
            });
        }

        // GET: api/Auth/me
        [Authorize]
        [HttpGet("me")]
        public IActionResult GetMe()
        {
            var userId = User.FindFirstValue(
                ClaimTypes.NameIdentifier);

            var name = User.FindFirstValue(
                ClaimTypes.Name);

            var email = User.FindFirstValue(
                ClaimTypes.Email);

            var role = User.FindFirstValue(
                ClaimTypes.Role);

            return Ok(new
            {
                userId,
                name,
                email,
                role
            });
        }

        // GET: api/Auth/users-count
        [Authorize(Roles = "Admin")]
        [HttpGet("users-count")]
        public async Task<IActionResult> GetUsersCount()
        {
            var count = await _context.Users.CountAsync();

            return Ok(new
            {
                count
            });
        }

        // GET: api/Auth/admin-test
        [Authorize(Roles = "Admin")]
        [HttpGet("admin-test")]
        public IActionResult AdminTest()
        {
            return Ok(new
            {
                message = "Welcome Admin!"
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    userId = u.Id,
                    name = u.Name,
                    email = u.Email,
                    role = u.Role
                })
                .ToListAsync();

            return Ok(users);
        }
    }
}


using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NOVA.BLL.DTOs.Project;
using NOVA.BLL.Interfaces;

namespace NOVA.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        // GET: api/Project
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projects = await _projectService.GetAllAsync();
            return Ok(projects);
        }

        // GET: api/Project/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var project = await _projectService.GetByIdAsync(id);

            if (project == null)
            {
                return NotFound(new
                {
                    message = "Project not found."
                });
            }

            return Ok(project);
        }

        // POST: api/Project
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateProjectDto dto)
        {
            var userIdValue =
                User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(userIdValue, out var userId))
            {
                return Unauthorized(new
                {
                    message = "Invalid user ID."
                });
            }

            dto.UserId = userId;

            var project = await _projectService.CreateAsync(dto);

            return Ok(new
            {
                message = "Project created successfully.",
                data = project
            });
        }

        // PUT: api/Project/5
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            [FromBody] UpdateProjectDto dto)
        {
            var updated = await _projectService.UpdateAsync(id, dto);

            if (!updated)
            {
                return NotFound(new
                {
                    message = "Project not found."
                });
            }

            return Ok(new
            {
                message = "Project updated successfully."
            });
        }

        // DELETE: api/Project/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _projectService.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Project not found."
                });
            }

            return Ok(new
            {
                message = "Project deleted successfully."
            });
        }
    }
}
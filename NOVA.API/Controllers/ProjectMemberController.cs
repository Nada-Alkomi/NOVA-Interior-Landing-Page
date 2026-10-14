using Microsoft.AspNetCore.Mvc;
using NOVA.BLL.DTOs.ProjectMember;
using NOVA.BLL.Interfaces;

namespace NOVA.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectMemberController : ControllerBase
    {
        private readonly IProjectMemberService _projectMemberService;

        public ProjectMemberController(
            IProjectMemberService projectMemberService)
        {
            _projectMemberService = projectMemberService;
        }

        // GET: api/ProjectMember/project/5
        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetByProjectId(int projectId)
        {
            var members = await _projectMemberService
                .GetByProjectIdAsync(projectId);

            return Ok(members);
        }

        // POST: api/ProjectMember
        [HttpPost]
        public async Task<IActionResult> AddMember(
            CreateProjectMemberDto dto)
        {
            var added = await _projectMemberService
                .AddMemberAsync(dto);

            if (!added)
            {
                return BadRequest(new
                {
                    message = "Project or user not found, user is not a Team Member, or member is already assigned."
                });
            }

            return Ok(new
            {
                message = "Team Member assigned successfully."
            });
        }

        // DELETE: api/ProjectMember/project/5/user/3
        [HttpDelete("project/{projectId}/user/{userId}")]
        public async Task<IActionResult> RemoveMember(
            int projectId,
            int userId)
        {
            var removed = await _projectMemberService
                .RemoveMemberAsync(projectId, userId);

            if (!removed)
            {
                return NotFound(new
                {
                    message = "Project member not found."
                });
            }

            return Ok(new
            {
                message = "Team Member removed successfully."
            });
        }
    }
}
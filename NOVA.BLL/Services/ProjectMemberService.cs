using System;
using System.Collections.Generic;
using System.Text;

using NOVA.BLL.DTOs.ProjectMember;
using NOVA.BLL.Interfaces;
using NOVA.DAL.Models;
using NOVA.DAL.Repositories.UnitOfWork;

namespace NOVA.BLL.Services
{
    public class ProjectMemberService : IProjectMemberService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProjectMemberService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<ProjectMemberDto>> GetByProjectIdAsync(
            int projectId)
        {
            var members = await _unitOfWork.ProjectMembers
                .FindAsync(x => x.ProjectId == projectId);

            return members.Select(MapToDto);
        }

        public async Task<bool> AddMemberAsync(
            CreateProjectMemberDto dto)
        {
            // Check that the project exists
            var project = await _unitOfWork.Projects
                .GetByIdAsync(dto.ProjectId);

            if (project == null)
                return false;

            // Check that the user exists
            var user = await _unitOfWork.Users
                .GetByIdAsync(dto.UserId);

            if (user == null)
                return false;

            // Only Team Members can be assigned to projects
            if (user.Role != UserRole.TeamMember)
                return false;

            // Prevent assigning the same member twice
            var alreadyAssigned = await _unitOfWork.ProjectMembers
                .ExistsAsync(x =>
                    x.ProjectId == dto.ProjectId &&
                    x.UserId == dto.UserId);

            if (alreadyAssigned)
                return false;

            var projectMember = new ProjectMember
            {
                ProjectId = dto.ProjectId,
                UserId = dto.UserId,
                AssignedAt = DateTime.UtcNow
            };

            await _unitOfWork.ProjectMembers.AddAsync(projectMember);

            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RemoveMemberAsync(
            int projectId,
            int userId)
        {
            var members = await _unitOfWork.ProjectMembers
                .FindAsync(x =>
                    x.ProjectId == projectId &&
                    x.UserId == userId);

            var projectMember = members.FirstOrDefault();

            if (projectMember == null)
                return false;

            _unitOfWork.ProjectMembers.Delete(projectMember);

            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        private static ProjectMemberDto MapToDto(
            ProjectMember projectMember)
        {
            return new ProjectMemberDto
            {
                ProjectId = projectMember.ProjectId,
                UserId = projectMember.UserId,
                AssignedAt = projectMember.AssignedAt
            };
        }
    }
}

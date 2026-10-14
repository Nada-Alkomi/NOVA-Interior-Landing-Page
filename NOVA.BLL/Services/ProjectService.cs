using System;
using System.Collections.Generic;
using System.Text;

using NOVA.BLL.DTOs.Project;
using NOVA.BLL.Interfaces;
using NOVA.DAL.Models;
using NOVA.DAL.Repositories.UnitOfWork;

namespace NOVA.BLL.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<ProjectDto>> GetAllAsync()
        {
            var projects = await _unitOfWork.Projects.GetAllAsync();

            return projects.Select(MapToDto);
        }

        public async Task<ProjectDto?> GetByIdAsync(int id)
        {
            var project = await _unitOfWork.Projects.GetByIdAsync(id);

            if (project == null)
                return null;

            return MapToDto(project);
        }

        public async Task<ProjectDto> CreateAsync(CreateProjectDto dto)
        {
            var project = new Project
            {
                Name = dto.Name,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl,

                // Default values for a new project
                Status = ProjectStatus.NotStarted,
                Progress = 0,

                UserId = dto.UserId,
                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.Projects.AddAsync(project);

            await _unitOfWork.SaveChangesAsync();

            return MapToDto(project);
        }

        public async Task<bool> UpdateAsync(
            int id,
            UpdateProjectDto dto)
        {
            var project = await _unitOfWork.Projects.GetByIdAsync(id);

            if (project == null)
                return false;

            project.Name = dto.Name;
            project.Description = dto.Description;
            project.ImageUrl = dto.ImageUrl;
            project.Status = dto.Status;
            project.Progress = dto.Progress;
            project.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.Projects.Update(project);

            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var project = await _unitOfWork.Projects.GetByIdAsync(id);

            if (project == null)
                return false;

            _unitOfWork.Projects.Delete(project);

            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        private static ProjectDto MapToDto(Project project)
        {
            return new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                Status = project.Status.ToString(),
                Progress = project.Progress,
                ImageUrl = project.ImageUrl,
                UserId = project.UserId,
                CreatedAt = project.CreatedAt
            };
        }
    }
}

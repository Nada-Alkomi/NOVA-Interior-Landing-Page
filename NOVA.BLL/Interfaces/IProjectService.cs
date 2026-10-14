using System;
using System.Collections.Generic;
using System.Text;

using NOVA.BLL.DTOs.Project;

namespace NOVA.BLL.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAllAsync();

        Task<ProjectDto?> GetByIdAsync(int id);

        Task<ProjectDto> CreateAsync(CreateProjectDto dto);

        Task<bool> UpdateAsync(int id, UpdateProjectDto dto);

        Task<bool> DeleteAsync(int id);
    }
}

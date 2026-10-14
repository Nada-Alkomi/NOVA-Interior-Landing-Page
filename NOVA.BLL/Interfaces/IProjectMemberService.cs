using System;
using System.Collections.Generic;
using System.Text;

using NOVA.BLL.DTOs.ProjectMember;

namespace NOVA.BLL.Interfaces
{
    public interface IProjectMemberService
    {
        Task<IEnumerable<ProjectMemberDto>> GetByProjectIdAsync(int projectId);

        Task<bool> AddMemberAsync(CreateProjectMemberDto dto);

        Task<bool> RemoveMemberAsync(int projectId, int userId);
    }
}

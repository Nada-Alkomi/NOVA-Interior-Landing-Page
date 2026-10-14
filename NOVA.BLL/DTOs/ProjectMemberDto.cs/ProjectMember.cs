using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.BLL.DTOs.ProjectMember
{
    public class ProjectMemberDto
    {
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public DateTime AssignedAt { get; set; }
    }
}

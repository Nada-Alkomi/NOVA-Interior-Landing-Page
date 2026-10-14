using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.BLL.DTOs.ContactInquiry
{
    public class ContactInquiryDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public int? UserId { get; set; }
    }
}
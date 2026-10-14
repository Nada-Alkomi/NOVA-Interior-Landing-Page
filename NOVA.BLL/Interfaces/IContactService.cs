using System;
using System.Collections.Generic;
using System.Text;

using NOVA.BLL.DTOs.ContactInquiry;

namespace NOVA.BLL.Interfaces
{
    public interface IContactService
    {
        Task<IEnumerable<ContactInquiryDto>> GetAllAsync();

        Task<ContactInquiryDto?> GetByIdAsync(int id);

        Task<ContactInquiryDto> CreateAsync(CreateContactInquiryDto dto);
    }
}

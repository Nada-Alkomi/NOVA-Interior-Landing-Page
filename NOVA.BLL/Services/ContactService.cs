using System;
using System.Collections.Generic;
using System.Text;

using NOVA.BLL.DTOs.ContactInquiry;
using NOVA.BLL.Interfaces;
using NOVA.DAL.Models;
using NOVA.DAL.Repositories.UnitOfWork;

namespace NOVA.BLL.Services
{
    public class ContactService : IContactService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ContactService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<ContactInquiryDto>> GetAllAsync()
        {
            var inquiries = await _unitOfWork.ContactInquiries.GetAllAsync();

            return inquiries.Select(MapToDto);
        }

        public async Task<ContactInquiryDto?> GetByIdAsync(int id)
        {
            var inquiry = await _unitOfWork.ContactInquiries.GetByIdAsync(id);

            if (inquiry == null)
                return null;

            return MapToDto(inquiry);
        }

        public async Task<ContactInquiryDto> CreateAsync(
            CreateContactInquiryDto dto)
        {
            var inquiry = new ContactInquiry
            {
                Name = dto.Name,
                Email = dto.Email,
                Subject = dto.Subject,
                Message = dto.Message,
                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.ContactInquiries.AddAsync(inquiry);

            await _unitOfWork.SaveChangesAsync();

            return MapToDto(inquiry);
        }

        private static ContactInquiryDto MapToDto(
            ContactInquiry inquiry)
        {
            return new ContactInquiryDto
            {
                Id = inquiry.Id,
                Name = inquiry.Name,
                Email = inquiry.Email,
                Subject = inquiry.Subject,
                Message = inquiry.Message,
                CreatedAt = inquiry.CreatedAt
            };
        }
    }
}

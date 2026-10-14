using System;
using System.Collections.Generic;
using System.Text;
using NOVA.BLL.DTOs.Service;
using NOVA.BLL.Interfaces;
using NOVA.DAL.Models;
using NOVA.DAL.Repositories.UnitOfWork;
namespace NOVA.BLL.Services
{
        public class ServiceService : IServiceService
        {
            private readonly IUnitOfWork _unitOfWork;

            public ServiceService(IUnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<IEnumerable<ServiceDto>> GetAllAsync()
            {
                var services = await _unitOfWork.Services.GetAllAsync();

                return services.Select(MapToDto);
            }

            public async Task<ServiceDto?> GetByIdAsync(int id)
            {
                var service = await _unitOfWork.Services.GetByIdAsync(id);

                if (service == null)
                    return null;

                return MapToDto(service);
            }

            public async Task<ServiceDto> CreateAsync(CreateServiceDto dto)
            {
                var service = new Service
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    ImageUrl = dto.ImageUrl,
                    CreatedAt = DateTime.UtcNow
                };

                await _unitOfWork.Services.AddAsync(service);

                await _unitOfWork.SaveChangesAsync();

                return MapToDto(service);
            }

            public async Task<bool> UpdateAsync(
                int id,
                UpdateServiceDto dto)
            {
                var service = await _unitOfWork.Services.GetByIdAsync(id);

                if (service == null)
                    return false;

                service.Name = dto.Name;
                service.Description = dto.Description;
                service.ImageUrl = dto.ImageUrl;
                service.UpdatedAt = DateTime.UtcNow;

                _unitOfWork.Services.Update(service);

                await _unitOfWork.SaveChangesAsync();

                return true;
            }

            public async Task<bool> DeleteAsync(int id)
            {
                var service = await _unitOfWork.Services.GetByIdAsync(id);

                if (service == null)
                    return false;

                _unitOfWork.Services.Delete(service);

                await _unitOfWork.SaveChangesAsync();

                return true;
            }

            private static ServiceDto MapToDto(Service service)
            {
                return new ServiceDto
                {
                    Id = service.Id,
                    Name = service.Name,
                    Description = service.Description,
                    ImageUrl = service.ImageUrl
                };
            }
        }
    
}

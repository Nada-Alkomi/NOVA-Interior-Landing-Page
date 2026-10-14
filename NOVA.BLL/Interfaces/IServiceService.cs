using System;
using System.Collections.Generic;
using System.Text;
using NOVA.BLL.DTOs;
using NOVA.BLL.DTOs.Service;
namespace NOVA.BLL.Interfaces
{
        public interface IServiceService
        {
            Task<IEnumerable<ServiceDto>> GetAllAsync();

            Task<ServiceDto?> GetByIdAsync(int id);

            Task<ServiceDto> CreateAsync(CreateServiceDto dto);

            Task<bool> UpdateAsync(int id, UpdateServiceDto dto);

            Task<bool> DeleteAsync(int id);
        }
    
}

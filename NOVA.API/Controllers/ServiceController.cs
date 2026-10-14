using Microsoft.AspNetCore.Mvc;
using NOVA.BLL.DTOs.Service;
using NOVA.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NOVA.BLL.DTOs.Service;
using NOVA.BLL.Interfaces;
namespace NOVA.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        // GET: api/Service
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var services = await _serviceService.GetAllAsync();

            return Ok(services);
        }

        // GET: api/Service/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var service = await _serviceService.GetByIdAsync(id);

            if (service == null)
            {
                return NotFound(new
                {
                    message = "Service not found."
                });
            }

            return Ok(service);
        }

        // POST: api/Service
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateServiceDto dto)
        {
            var service = await _serviceService.CreateAsync(dto);

            return Ok(new
            {
                message = "Service created successfully.",
                data = service
            });
        }

        // PUT: api/Service/5
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateServiceDto dto)
        {
            var updated = await _serviceService.UpdateAsync(id, dto);

            if (!updated)
            {
                return NotFound(new
                {
                    message = "Service not found."
                });
            }

            return Ok(new
            {
                message = "Service updated successfully."
            });
        }

        // DELETE: api/Service/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _serviceService.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Service not found."
                });
            }

            return Ok(new
            {
                message = "Service deleted successfully."
            });
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using NOVA.BLL.DTOs.ContactInquiry;

using NOVA.BLL.Interfaces;

namespace NOVA.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        // GET: api/Contact
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var inquiries = await _contactService.GetAllAsync();

            return Ok(inquiries);
        }

        // GET: api/Contact/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var inquiry = await _contactService.GetByIdAsync(id);

            if (inquiry == null)
            {
                return NotFound(new
                {
                    message = "Contact inquiry not found."
                });
            }

            return Ok(inquiry);
        }

        // POST: api/Contact
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateContactInquiryDto dto)
        {
            var inquiry = await _contactService.CreateAsync(dto);

            return Ok(new
            {
                message = "Your message has been sent successfully.",
                data = inquiry
            });
        }
    }
}
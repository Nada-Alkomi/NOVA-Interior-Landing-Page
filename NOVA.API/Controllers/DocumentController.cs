using Microsoft.AspNetCore.Mvc;
using NOVA.BLL.DTOs.Document;
using NOVA.BLL.Interfaces;
using NOVA.DAL.Models.Requests;
namespace NOVA.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService _documentService;

        public DocumentController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        // GET: api/Document/user/5
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var documents = await _documentService
                .GetByUserIdAsync(userId);

            return Ok(documents);
        }

        // GET: api/Document/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var document = await _documentService
                .GetByIdAsync(id);

            if (document == null)
            {
                return NotFound(new
                {
                    message = "Document not found."
                });
            }

            return Ok(document);
        }

        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Upload([FromForm] DocumentUploadRequest request)
        {
            if (request.File == null || request.File.Length == 0)
                return BadRequest(new { message = "Please select a file." });

            var dto = new CreateDocumentDto
            {
                UserId = request.UserId,
                FileStream = request.File.OpenReadStream(),
                FileName = request.File.FileName,
                ContentType = request.File.ContentType,
                FileSize = request.File.Length
            };

            var document = await _documentService.UploadAsync(dto);

            if (document == null)
                return BadRequest(new { message = "File upload failed." });

            return Ok(document);
        }

        // DELETE: api/Document/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _documentService.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Document not found."
                });
            }

            return Ok(new
            {
                message = "Document deleted successfully."
            });
        }
    }
}
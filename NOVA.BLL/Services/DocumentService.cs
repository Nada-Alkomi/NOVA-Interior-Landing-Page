using System;
using System.Collections.Generic;
using System.Text;
using NOVA.BLL.DTOs.Document;
using NOVA.BLL.Interfaces;
using NOVA.DAL.Models;
using NOVA.DAL.Repositories.UnitOfWork;

namespace NOVA.BLL.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly string[] _allowedExtensions =
        {
            ".pdf",
            ".jpg",
            ".jpeg",
            ".png",
            ".docx"
        };

        private const long MaxFileSize = 5 * 1024 * 1024; // 5 MB

        public DocumentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<DocumentDto>> GetByUserIdAsync(
            int userId)
        {
            var documents = await _unitOfWork.Documents
                .FindAsync(x => x.UserId == userId);

            return documents.Select(MapToDto);
        }

        public async Task<DocumentDto?> GetByIdAsync(int id)
        {
            var document = await _unitOfWork.Documents
                .GetByIdAsync(id);

            if (document == null)
                return null;

            return MapToDto(document);
        }

        public async Task<DocumentDto?> UploadAsync(
            CreateDocumentDto dto)
        {
            // Check if user exists
            var user = await _unitOfWork.Users
                .GetByIdAsync(dto.UserId);

            if (user == null)
                return null;

            // Validate file size
            if (dto.FileSize <= 0 || dto.FileSize > MaxFileSize)
                return null;

            // Get file extension
            var extension = Path.GetExtension(dto.FileName)
                .ToLowerInvariant();

            // Validate file type
            if (!_allowedExtensions.Contains(extension))
                return null;

            // Create uploads folder
            var uploadsFolder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "Uploads",
                "Documents");

            Directory.CreateDirectory(uploadsFolder);

            // Generate unique file name
            var uniqueFileName =
                $"{Guid.NewGuid()}{extension}";

            var filePath = Path.Combine(
                uploadsFolder,
                uniqueFileName);

            // Save physical file
            using (var stream = new FileStream(
                filePath,
                FileMode.Create))
            {
                await dto.FileStream.CopyToAsync(stream);
            }

            // Save file metadata
            var document = new Document
            {
                FileName = dto.FileName,
                FilePath = filePath,
                ContentType = dto.ContentType,
                FileSize = dto.FileSize,
                UserId = dto.UserId,
                UploadedAt = DateTime.UtcNow
            };

            await _unitOfWork.Documents.AddAsync(document);

            await _unitOfWork.SaveChangesAsync();

            return MapToDto(document);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var document = await _unitOfWork.Documents
                .GetByIdAsync(id);

            if (document == null)
                return false;

            // Delete physical file
            if (File.Exists(document.FilePath))
            {
                File.Delete(document.FilePath);
            }

            // Delete database record
            _unitOfWork.Documents.Delete(document);

            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        private static DocumentDto MapToDto(Document document)
        {
            return new DocumentDto
            {
                Id = document.Id,
                FileName = document.FileName,
                ContentType = document.ContentType,
                FileSize = document.FileSize,
                UploadedAt = document.UploadedAt,
                UserId = document.UserId
            };
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

using NOVA.BLL.DTOs.Document;

namespace NOVA.BLL.Interfaces
{
    public interface IDocumentService
    {
        Task<IEnumerable<DocumentDto>> GetByUserIdAsync(int userId);

        Task<DocumentDto?> GetByIdAsync(int id);

        Task<DocumentDto?> UploadAsync(CreateDocumentDto dto);

        Task<bool> DeleteAsync(int id);
    }
}

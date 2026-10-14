using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.AspNetCore.Http;

namespace NOVA.DAL.Models.Requests
{
    public class DocumentUploadRequest
    {
        public int UserId { get; set; }

        public IFormFile File { get; set; } = null!;
    }
}

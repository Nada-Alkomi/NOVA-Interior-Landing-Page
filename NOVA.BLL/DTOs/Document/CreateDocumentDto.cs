using System;
using System.Collections.Generic;
using System.Text;

    namespace NOVA.BLL.DTOs.Document
    {
        public class CreateDocumentDto
        {
            public int UserId { get; set; }

            public Stream FileStream { get; set; } = null!;

            public string FileName { get; set; } = string.Empty;

            public string ContentType { get; set; } = string.Empty;

            public long FileSize { get; set; }
        }
    }


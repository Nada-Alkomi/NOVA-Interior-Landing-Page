using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Models
{
    public class Document
    {
        public int Id { get; set; }

        public string FileName { get; set; } = string.Empty;

        public string FilePath { get; set; } = string.Empty;

        public string ContentType { get; set; } = string.Empty;

        public long FileSize { get; set; }

        public int UserId { get; set; }

        public DateTime UploadedAt { get; set; }


        // Relationship

        public User User { get; set; } = null!;
    }
}

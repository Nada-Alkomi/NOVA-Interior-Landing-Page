using System;
using System.Collections.Generic;
using System.Text;

namespace NOVA.DAL.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }


        // Relationships

        public ICollection<Furniture> Furniture { get; set; }
            = new List<Furniture>();
    }
}

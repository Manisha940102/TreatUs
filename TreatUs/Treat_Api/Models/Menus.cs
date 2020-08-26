using System;

namespace Treat_Api.Models
{
    public class Menus
    {
        public string MenuId { get; set; } = Guid.NewGuid().ToString();
       
        public string MenuName { get; set; }

        public string Category { get; set; }

        public string Price { get; set; }

        public string Specification { get; set; }

        public int Ratings { get; set; }

        public string ImageBase64 { get; set; }
    }
}

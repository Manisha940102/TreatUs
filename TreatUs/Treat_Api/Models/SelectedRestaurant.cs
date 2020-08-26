using System.Collections.Generic;


namespace Treat_Api.Models
{
    public class SelectedRestaurant
    {
        public string Id { get; set; }

        public string RestaurantName { get; set; }

        public string Address { get; set; }

        public string TelephoneNo { get; set; }

        public string Category { get; set; }

        public List<Menus> Menus { get; set; }
        
    }
}

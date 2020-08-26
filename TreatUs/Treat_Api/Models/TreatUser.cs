using System.Collections.Generic;

namespace Treat_Api.Models
{
    public class TreatUser
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public List<UserSelectedRestaurant> PickedItem { get; set; }
    }
}

using System.Collections.Generic;

namespace Treat_Api.Models
{
    public class TreatUsers
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public bool IsActive { get; set; }

        public List<UserSelectedRestaurant> PickedItem { get; set; }
    }
}

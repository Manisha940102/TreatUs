using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Treat_Api.Models
{
    public class Restaurants
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string RestaurantName { get; set; }

        public string Address { get; set; }

        public string TelephoneNo { get; set; }

        public string ImageBase64 { get; set; }

        public List<Menus> Menus { get; set; }
    }
}

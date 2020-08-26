using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Treat_Api.Models
{
    public class Login
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}

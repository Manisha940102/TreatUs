using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Treat_Api.Models
{
    public class Mail
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string TreatId { get; set; }

        public string[] Email { get; set; }

        public string Subject { get; set; }

        public string TreatUrl { get; set; }

        public string Date { get; set; }

        public string Time { get; set; }

    }
}

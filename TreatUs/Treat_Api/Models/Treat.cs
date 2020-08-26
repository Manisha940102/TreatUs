using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Treat_Api.Models
{
    public class Treat
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string DateTime { get; set; }

        public TreatTypes Type { get; set; }

        public string OtherTreatType { get; set; }

        public Category Category { get; set; }

        public List<Providers> Providers { get; set; }

        public List<Restaurants> Restaurants { get; set; }

        public List<TreatUsers> TreatUsers { get; set; }

        public TStatus Status { get; set; }

        public UserEmailStatus UserEmailStatus { get; set; }
    }

    public enum TStatus
    {
        Pending, InvitationSent, ProviderRejected, AllProviersAccepted
    }

    public enum TreatTypes
    {
        Birthday, FirstSalary, Car, Other
    }

    public enum Category
    {
        Breakfast, Lunch, Dinner, TeaParty,Drinks,Desserts,Other
    }

    public enum UserEmailStatus
    {
        Pending, AllEmaiSent
    }

}

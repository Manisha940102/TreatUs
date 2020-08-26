
namespace Treat_Api.Models
{
    public class TreatDatabaseSettings : ITreatDatabaseSettings
    {
        public string UsersCollectionName { get; set; }
        public string RestaurantsCollectionName { get; set; }   
        public string TreatCollectionName { get; set; }
        public string LoginCollectionName { get; set; }
        public string MailCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ITreatDatabaseSettings
    {
        string UsersCollectionName { get; set; }
        string RestaurantsCollectionName { get; set; } 
        string TreatCollectionName { get; set; }
        string LoginCollectionName { get; set; }
        string MailCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}

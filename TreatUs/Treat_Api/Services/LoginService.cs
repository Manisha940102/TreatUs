using System.Collections.Generic;
using System.Linq;
using Treat_Api.Models;
using MongoDB.Driver;

namespace Treat_Api.Services
{
    public class LoginService
    {
        private readonly IMongoCollection<Login> _login;

        public LoginService(ITreatDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _login = database.GetCollection<Login>(settings.LoginCollectionName);
        }

        public List<Login> Get() =>
           _login.Find(login => true).ToList();

        public Login Create(Login login)
        {
            _login.InsertOne(login);
            return login;
        }
    }
}

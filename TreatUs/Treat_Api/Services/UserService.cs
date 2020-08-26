using System.Collections.Generic;
using System.Linq;
using Treat_Api.Models;
using MongoDB.Driver;

namespace Treat_Api.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(ITreatDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public List<User> Get() =>
            _users.Find(user => true).ToList();

        public User Get(string id) =>
            _users.Find<User>(user => user.Id == id).FirstOrDefault();

        public User Gets(string email) =>
            _users.Find<User>(user => user.Email == email).FirstOrDefault();

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public User Update(string id, User user)
        {
            _users.ReplaceOne(treat => treat.Id == id, user);
            return user;
        }
        public void Remove(User user) =>
           _users.DeleteOne(user => user.Email == user.Email);

        public void Remove(string email) =>
            _users.DeleteOne(user => user.Email == email);
    }
}

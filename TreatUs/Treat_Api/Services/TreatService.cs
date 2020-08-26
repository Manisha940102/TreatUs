using System.Collections.Generic;
using System.Linq;
using Treat_Api.Models;
using MongoDB.Driver;

namespace Treat_Api.Services
{
    public class TreatService
    {
        private readonly IMongoCollection<Treat> _treat;

        public TreatService(ITreatDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _treat = database.GetCollection<Treat>(settings.TreatCollectionName);
        }

        public List<Treat> Get() =>
           _treat.Find(treat => true).ToList();

        public Treat Get(string id) =>
          _treat.Find<Treat>(treat => treat.Id == id).FirstOrDefault();

        public Treat Gets(string id) =>
           _treat.Find<Treat>(treat => treat.Id == id).FirstOrDefault();

        public Treat Create(Treat treat)
        {
            _treat.InsertOne(treat);
            return treat;
        }

        public Treat Creates(Treat treat)
        {
            _treat.InsertOne(treat);
            return treat;
        }

        public Treat Update(string id, Treat treat)
        {
             _treat.ReplaceOne(treat => treat.Id == id, treat);
            return treat;      
        }

        public void Remove(string id) =>
            _treat.DeleteOne(treat => treat.Id == id);   
    }
}

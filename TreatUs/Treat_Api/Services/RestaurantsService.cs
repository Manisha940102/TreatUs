using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Treat_Api.Models;
using MongoDB.Driver;

namespace Treat_Api.Services
{
    public class RestaurantsService
    {
        private readonly IMongoCollection<Restaurants> _restaurants;

        public RestaurantsService(ITreatDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _restaurants = database.GetCollection<Restaurants>(settings.RestaurantsCollectionName);
        }

        public List<Restaurants> Get() =>
            _restaurants.Find(restaurant => true).ToList();

        public Restaurants Get(string id) =>
            _restaurants.Find<Restaurants>(restaurant => restaurant.Id == id).FirstOrDefault();

        public Restaurants Gets(string restaurantName) =>
           _restaurants.Find<Restaurants>(restaurant => restaurant.RestaurantName == restaurantName).FirstOrDefault();

        public Restaurants Create(Restaurants restaurant)
        {
            _restaurants.InsertOne(restaurant);
            return restaurant;
        }

        public Restaurants Update(string id, Restaurants restaurant)
        {
            _restaurants.ReplaceOne(restaurant => restaurant.Id == id, restaurant);
            return restaurant;
        }

        public void Remove(Restaurants restaurant) =>
          _restaurants.DeleteOne(restaurant => restaurant.RestaurantName == restaurant.RestaurantName);

        public void Remove(string restaurantName) {
            _restaurants.DeleteOne(restaurant => restaurant.RestaurantName == restaurantName);
        }

    }
}

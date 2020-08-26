using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Treat_Api.Models;
using Treat_Api.Services;


namespace Treat_Api.Controllers
{
    [Route("api/restaurants")]
    [ApiController]
    public class RestaurantsController : Controller
    {
        private readonly RestaurantsService _restaurantsService;

        public RestaurantsController(RestaurantsService restaurantService)
        {
            _restaurantsService = restaurantService;
        }

        [HttpGet]
        public ActionResult<List<Restaurants>> Get() =>
            _restaurantsService.Get();

        [HttpGet("{id:length(24)}", Name = "GetRestaurant")]
        public ActionResult<Restaurants> Get(string id)
        {
            var restaurant = _restaurantsService.Get(id);

            if (restaurant == null)
            {
                return NotFound();
            }

            return restaurant;
        }


        [HttpPost]
        public ActionResult<Restaurants> Create(Restaurants restaurant)
        {
            _restaurantsService.Create(restaurant);

            return CreatedAtRoute("GetRestaurant", new { id = restaurant.Id.ToString() }, restaurant);
        }

        [HttpPut("{id:length(24)}")]
        public ActionResult<Restaurants> Update([FromRoute] string id, [FromBody] Restaurants restaurant)
        {
            var admin = _restaurantsService.Get(id);

            if (admin == null)
            {
                return NotFound();
            }

            _restaurantsService.Update(id, restaurant);

            return admin;
        }

        [HttpDelete("{restaurantName}")]
        public IActionResult Delete(string restaurantName)
        {
            var restaurant = _restaurantsService.Gets(restaurantName);

            if (restaurant == null)
            {
                return NotFound();
            }

            _restaurantsService.Remove(restaurant.RestaurantName);

            return NoContent();
        }
    }
}


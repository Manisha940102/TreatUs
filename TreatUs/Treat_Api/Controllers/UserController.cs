using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Treat_Api.Models;
using Treat_Api.Services;


namespace Treat_Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<User>> Get() =>
            _userService.Get();

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            _userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
        }

        [HttpDelete("{email}")]
        public IActionResult Delete(string email)
        {
            var user = _userService.Gets(email);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Remove(user.Email);

            return NoContent();
        }

        [HttpPut("{id:length(24)}")]
        public ActionResult<User> Update([FromRoute] string id, [FromBody] User user)
        {
            var admin = _userService.Get(id);

            if (admin == null)
            {
                return NotFound();
            }

            _userService.Update(id, user);

            return user;
        }
    }
}

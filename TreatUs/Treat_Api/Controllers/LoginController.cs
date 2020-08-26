using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Treat_Api.Models;
using Treat_Api.Services;

namespace Treat_Api.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly LoginService _loginService;

        public LoginController(LoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpGet]
        public ActionResult<List<Login>> Get() =>

                _loginService.Get();

        [HttpPost]
        public ActionResult<Login> Create(Login login)
        {
            var admin = _loginService.Create(login);

            CreatedAtRoute("Getlogin", new { id = login.Id.ToString() }, admin);

            return admin;
        }

    }
}

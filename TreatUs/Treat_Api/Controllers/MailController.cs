using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Treat_Api.Services;
using Treat_Api.Models;


namespace Treat_Api.Controllers
{
    [Route("api/sendMail")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly MailService _mailService;

        public MailController(MailService mailService)
        {
            _mailService = mailService;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost("providers/{id:length(24)}")]
        public ActionResult<Boolean> sendProviderEmail([FromBody]ProviderEmail providerMails)
        {
           bool status =  _mailService.sendProviderEmail(providerMails);

            return status;

        }

        [HttpPost("{id:length(24)}")]
        public ActionResult<Boolean> sendEmail([FromBody]Mail mails)
        {
           bool status =  _mailService.sendEmail(mails);

            return status;
        }

        [HttpPost("deleteProviders")]
        public ActionResult<Boolean> sendDeleteEmail([FromBody]Mail mails)
        {
            bool status = _mailService.sendDeleteEmails(mails);

            return status;
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}


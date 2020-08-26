using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Treat_Api.Models;
using Treat_Api.Services;


namespace Treat_Api.Controllers
{
    [Route("api/treat")]
    [ApiController]
    public class TreatController : Controller
    {
        private readonly TreatService _treatService;

        public TreatController(TreatService treatService)
        {
            _treatService = treatService;
        }

        [HttpGet]
        public ActionResult<List<Treat>> Get() =>
               _treatService.Get();

        [HttpGet("{name}/{id:length(24)}")]
        public ActionResult<Treat> Get(string id)
        {
            var treat = _treatService.Get(id);

            if (treat == null)
            {
                return NotFound();
            }

            return treat;
        }

        [HttpGet("{id:length(24)}")]
        public ActionResult<Treat> Gets(string id)
        {
            var treat = _treatService.Gets(id);

            if (treat == null)
            {
                return NotFound();
            }
            
           return treat;
        }


        [HttpPost]
        public ActionResult<Treat> Create(Treat treat)
        {
            var admin = _treatService.Create(treat);

            CreatedAtRoute("GetadminSummary", new { id = treat.Id.ToString() }, admin);

            return admin;
        }

        [HttpPost("{id:length(24)}")]
        public ActionResult<Treat> Creates([FromRoute]string id, [FromBody]Treat treat)
        {
            var admin = _treatService.Creates(treat);

            CreatedAtRoute( new { id = treat.Id.ToString() }, admin);

            return admin;
        }

        [HttpPut("{id:length(24)}")]
        public ActionResult<Treat> Update([FromRoute] string id, [FromBody] Treat treat)
        {
            var admin = _treatService.Get(id);

            if (admin == null)
            {
                return NotFound();
            }

            _treatService.Update(id, treat);

            return treat;
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var user = _treatService.Gets(id);

            if (user == null)
            {
                return NotFound();
            }

            _treatService.Remove(id);

            return NoContent();
        }

    }
    
}

using System;
using System.Threading.Tasks;
using RemisionES.Service;
using Microsoft.AspNetCore.Mvc;
using Pemarsa.API.fwk;
using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using Microsoft.Extensions.Configuration;

namespace Pemarsa.API.Controllers
{
    [Route("api/[controller]")]
    public class RemisionESController : BaseController
    {
        private readonly IRemisionService _service;
        public static IConfiguration Configuration { get; set; }
        public RemisionESController(IRemisionService service)
        {
            _service = service;
        }

        [HttpPost("CrearRemision")]
        public async Task<IActionResult> CrearRemision([FromBody]Remision remision)
        {
            try
            {

                return Ok(await _service.CrearRemision(remision, new UsuarioDTO()));

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }


    }
}

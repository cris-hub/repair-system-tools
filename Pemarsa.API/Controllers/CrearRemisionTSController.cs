using CrearRemisionTS.DTO;
using CrearRemisionTS.Service;
using Microsoft.AspNetCore.Mvc;
using Pemarsa.API.fwk;
using Pemarsa.CanonicalModels;
using System;
using System.Threading.Tasks;

namespace Pemarsa.API.Controllers
{
    [Route("api/[controller]")]
    public class CrearRemisionTSController : BaseController
    {
        private readonly ICrearRemisionService _service;

        public CrearRemisionTSController(ICrearRemisionService crearRemisionService)
        {
            _service = crearRemisionService;
        }

        [HttpPost("CrearRemision")]
        public async Task<IActionResult> CrearRemision([FromBody] RemisionDTO remision)
        {
            try
            {
                return Ok(await _service.CrearRemision(remision, new UsuarioDTO()));
            }
            catch (Exception e)
            {

                return BadRequest(e);
            }
        }
    
    }
}

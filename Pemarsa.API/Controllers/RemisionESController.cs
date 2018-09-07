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

        [HttpPut("ActualizarEstadoRemision")]
        public async Task<IActionResult> ActualizarEstadoRemision([FromQuery] string estado, [FromQuery] string guidRemision)
        {
            try
            {
                return Ok(await _service.ActualizarEstadoRemision(estado,Guid.Parse(guidRemision), new UsuarioDTO()));
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut("ActualizarObservacion")]
        public async Task<IActionResult> ActualizarObservacion([FromQuery]string Observacion, [FromQuery] string guidRemision)
        {
            try
            {
                return Ok(await _service.ActualizarObservacion(Observacion, Guid.Parse(guidRemision), new UsuarioDTO()));
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("ConsultarRemisionesPendientes")]
        public async Task<IActionResult> ConsultarRemisionesPendientes(Paginacion paginacion)
        {
            try
            {
                var result = await _service.ConsultarRemisionesPendientes(paginacion, new UsuarioDTO());
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2 });
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("ConsultarRemisionesPendientesPorFiltro")]
        public async Task<IActionResult> ConsultarRemisionesPendientesPorFiltro([FromQuery]RemisionPendienteFiltroDTO remisionPendiente)
        {
            try
            {
                var result = await _service.ConsultarRemisionesPendientesPorFiltro(remisionPendiente, new UsuarioDTO());
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2 });
            }
            catch (Exception)
            {

                throw;
            }
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

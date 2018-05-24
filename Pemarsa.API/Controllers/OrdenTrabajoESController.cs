using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using OrdenTrabajoES.Service;
using Pemarsa.API.fwk;
using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Pemarsa.API.Controllers
{
    [Route("api/[controller]")]
    public class OrdenTrabajoESController : BaseController
    {
        private readonly IOrdenTrabajoService _service;
        public static IConfiguration Configuration { get; set; }

        public OrdenTrabajoESController(IOrdenTrabajoService service)
        {
            _service = service;
        }

        [HttpPost("CrearSolicitudDeTrabajo")]
        public async Task<IActionResult> CrearSolicitudDeTrabajo([FromBody]SolicitudOrdenTrabajo solicitudOrdenTrabajo)
        {
            try
            {
                //se obtiene la informacion del appsettings
                var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json");

                //se obtiene la configuracion establecida en el appsettings
                Configuration = builder.Build();

                var pathServer = Configuration["FileServer:VirtualPath"];
                return Ok(await _service.CrearSolicitudDeTrabajo(solicitudOrdenTrabajo, pathServer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarSolicitudDeTrabajoPorGuid")]
        public async Task<IActionResult> ConsultarSolicitudDeTrabajoPorGuid([FromQuery]string guidSolicitudOrdenTrabajo)
        {
            try
            {
                return Ok((await _service.ConsultarSolicitudDeTrabajoPorGuid(Guid.Parse(guidSolicitudOrdenTrabajo))));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarSolicitudesDeTrabajo")]
        public async Task<IActionResult> ConsultarSolicitudesDeTrabajo(Paginacion paginacion)
        {
            try
            {
                var result = (await _service.ConsultarSolicitudesDeTrabajo(paginacion));
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

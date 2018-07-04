using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using OrdenTrabajoES.Service;
using Pemarsa.API.fwk;
using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using ProcesoES.Service;
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
        private readonly IOrdenTrabajoService _ordenTrabajoServicio;
        private readonly IProcesoService _procesoService;
        public static IConfiguration Configuration { get; set; }

        public OrdenTrabajoESController(IOrdenTrabajoService service, IProcesoService procesoService)
        {
            _ordenTrabajoServicio = service;
            _procesoService = procesoService;
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
                return Ok(await _ordenTrabajoServicio.CrearSolicitudDeTrabajo(solicitudOrdenTrabajo, pathServer));
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
                return Ok((await _ordenTrabajoServicio.ConsultarSolicitudDeTrabajoPorGuid(Guid.Parse(guidSolicitudOrdenTrabajo))));
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
                var result = (await _ordenTrabajoServicio.ConsultarSolicitudesDeTrabajo(paginacion));

                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarSolicitudesDeTrabajoPorFiltro")]
        public async Task<IActionResult> ConsultarSolicitudesDeTrabajoPorFiltro([FromQuery]ParametrosSolicitudOrdenTrabajoDTO parametrosDTO)
        {
            try
            {
                var result = (await _ordenTrabajoServicio.ConsultarSolicitudesDeTrabajoPorFiltro(new ParametrosSolicitudOrdenTrabajoDTO
                {
                    CantidadRegistros = parametrosDTO.CantidadRegistros,
                    PaginaActual = parametrosDTO.PaginaActual,
                    Responsable = parametrosDTO.Responsable,
                    Cliente = parametrosDTO.Cliente,
                    ClienteLinea = parametrosDTO.ClienteLinea,
                    DetallesSolicitud = parametrosDTO.DetallesSolicitud,
                    Estado = parametrosDTO.Estado
                }));
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ActualizarEstadoSolicitudDeTrabajo")]
        public async Task<IActionResult> ActualizarEstadoSolicitudDeTrabajo([FromQuery]string guidSolicitudOrdenTrabajo, [FromQuery]string estado)
        {
            try
            {
                return Ok(await _ordenTrabajoServicio.ActualizarEstadoSolicitudDeTrabajo(Guid.Parse(guidSolicitudOrdenTrabajo), estado));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("ActualizarSolcitudDeTrabajo")]
        public async Task<IActionResult> ActualizarSolcitudDeTrabajo([FromBody]SolicitudOrdenTrabajo solicitudOrdenTrabajo)
        {
            try
            {
                //se obtiene la informacion del appsettings 
                var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

                // se obtiene la configuracion establecida en el appsettings 
                Configuration = builder.Build();

                var pathServer = Configuration["FileServer:VirtualPath"];

                return Ok(await _ordenTrabajoServicio.ActualizarSolcitudDeTrabajo(solicitudOrdenTrabajo, pathServer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("CrearOrdenDeTrabajo")]
        public async Task<IActionResult> CrearOrdenDeTrabajo([FromBody]SolicitudOrdenTrabajo solicitudOrdenTrabajo)
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
                Guid OrdenDeTrabajoGuid = await _ordenTrabajoServicio.CrearOrdenDeTrabajoDesdeSolicitudTrabajo(solicitudOrdenTrabajo, pathServer);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } // modioficar retorno de este metodo

        [HttpGet("ConsultarOrdenDeTrabajoPorGuid")]
        public async Task<IActionResult> ConsultarOrdenDeTrabajoPorGuid([FromQuery]string GuidOrdenDeTrabajo)
        {
            try
            {

                OrdenTrabajo ordenTrabajoConsultada = await _ordenTrabajoServicio.ConsultarOrdenDeTrabajoPorGuid(GuidOrdenDeTrabajo);


                return Ok(ordenTrabajoConsultada);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarOrdenesDeTrabajo")]
        public async Task<IActionResult> ConsultarOrdenesDeTrabajo(Paginacion paginacion)
        {
            try
            {
                var result = (await _ordenTrabajoServicio.ConsultarOrdenesDeTrabajo(paginacion));

                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarOrdenesDeTrabajoPorFiltro")]

        public async Task<IActionResult> ConsultarOrdenesDeTrabajoPorFiltro([FromQuery]ParametrosSolicitudOrdenTrabajoDTO parametrosDTO)
        {
            try
            {
                var result = (await _ordenTrabajoServicio.ConsultarOrdenesDeTrabajoPorFiltro(new ParametrosSolicitudOrdenTrabajoDTO
                {
                    CantidadRegistros = parametrosDTO.CantidadRegistros,
                    PaginaActual = parametrosDTO.PaginaActual
                   
                }));
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ActualizarEstadoOrdenDeTrabajo")]
        public async Task<IActionResult> ActualizarEstadoOrdenDeTrabajo([FromQuery]string guidSolicitudOrdenTrabajo, [FromQuery]string estado)
        {
            try
            {
                return Ok(await _ordenTrabajoServicio.ActualizarEstadoOrdenDeTrabajo(Guid.Parse(guidSolicitudOrdenTrabajo), estado));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPut("ActualizarOrdenDeTrabajo ")]
        public async Task<IActionResult> ActualizarOrdenDeTrabajo([FromBody]OrdenTrabajo ordenTrabajo)
        {
            try
            {
          

                return Ok(await _ordenTrabajoServicio.ActualizarOrdenDeTrabajo(ordenTrabajo));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}

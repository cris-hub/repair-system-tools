﻿using Microsoft.AspNetCore.Mvc;
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
                return Ok(await _ordenTrabajoServicio.CrearSolicitudDeTrabajo(solicitudOrdenTrabajo,  new UsuarioDTO()));
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
                return Ok((await _ordenTrabajoServicio.ConsultarSolicitudDeTrabajoPorGuid(Guid.Parse(guidSolicitudOrdenTrabajo), new UsuarioDTO())));
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
                var result = (await _ordenTrabajoServicio.ConsultarSolicitudesDeTrabajo(paginacion, new UsuarioDTO()));

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
                    Estado = parametrosDTO.Estado,
                    Prioridad = parametrosDTO.Prioridad
                }, new UsuarioDTO()));
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
                return Ok(await _ordenTrabajoServicio.ActualizarEstadoSolicitudDeTrabajo(Guid.Parse(guidSolicitudOrdenTrabajo), estado, new UsuarioDTO()));
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

                return Ok(await _ordenTrabajoServicio.ActualizarSolcitudDeTrabajo(solicitudOrdenTrabajo, new UsuarioDTO()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("CrearOrdenDeTrabajo")]
        public async Task<IActionResult> CrearOrdenDeTrabajo([FromBody]OrdenTrabajo ordenTrabajo)
        {
            try
            {

                Guid OrdenDeTrabajoGuid = await _ordenTrabajoServicio.CrearOrdenDeTrabajo(ordenTrabajo,  new UsuarioDTO());

                return Ok(OrdenDeTrabajoGuid);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarOrdenDeTrabajoPorGuid")]
        public async Task<IActionResult> ConsultarOrdenDeTrabajoPorGuid([FromQuery]string GuidOrdenDeTrabajo)
        {
            try
            {

                OrdenTrabajo ordenTrabajoConsultada = await _ordenTrabajoServicio.ConsultarOrdenDeTrabajoPorGuid(GuidOrdenDeTrabajo, new UsuarioDTO());


                return Ok(ordenTrabajoConsultada);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarHistorialModificacionesOrdenDeTrabajo")]
        public async Task<IActionResult> ConsultarHistorialModificacionesOrdenDeTrabajo([FromQuery]string guidProceso, Paginacion paginacion)
        {
            try
            {

                var historial = await _ordenTrabajoServicio.ConsultarHistorialModificacionesOrdenDeTrabajo(Guid.Parse(guidProceso), paginacion, new UsuarioDTO());


                return Ok(new { CantidadRegistros = historial.Item1, Listado = historial.Item2.ToList() });
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
                var result = (await _ordenTrabajoServicio.ConsultarOrdenesDeTrabajo(paginacion, new UsuarioDTO()));

                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarOrdenesDeTrabajoPorFiltro")]
        public async Task<IActionResult> ConsultarOrdenesDeTrabajoPorFiltro([FromQuery]ParametroOrdenTrabajoDTO parametrosDTO)
        {
            try
            {
                var result = (await _ordenTrabajoServicio.ConsultarOrdenesDeTrabajoPorFiltro(parametrosDTO, new UsuarioDTO()));
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("ActualizarEstadoOrdenDeTrabajo")]
        public async Task<IActionResult> ActualizarEstadoOrdenDeTrabajo([FromQuery]string guidSolicitudOrdenTrabajo, [FromQuery]string estado)
        {
            try
            {
                return Ok(await _ordenTrabajoServicio.ActualizarEstadoOrdenDeTrabajo(Guid.Parse(guidSolicitudOrdenTrabajo), estado, new UsuarioDTO()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("ActualizarOrdenDeTrabajo")]
        public async Task<IActionResult> ActualizarOrdenDeTrabajo([FromBody]OrdenTrabajo ordenTrabajo)
        {
            try
            {


                return Ok(await _ordenTrabajoServicio.ActualizarOrdenDeTrabajo(ordenTrabajo, new UsuarioDTO()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarHistorialProcesosDeOrdenDeTrabajo")]
        public async Task<IActionResult> ConsultarHistorialProcesosDeOrdenDeTrabajo([FromQuery]string guidOrdenTrabajo)
        {
            try
            {
                List<OrdenTrabajoHistorialProcesoDTO> historial = (await _ordenTrabajoServicio.ConsultarHistorialProcesosDeOrdenDeTrabajo(Guid.Parse(guidOrdenTrabajo), new UsuarioDTO())).ToList();

                return Ok(historial);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("ConsultarOrdenDeTrabajoParaRemision")]
        public async Task<IActionResult> ConsultarOrdenDeTrabajoParaRemision(Paginacion paginacion)
        {
            try
            {
                var result = await _ordenTrabajoServicio.ConsultarOrdenDeTrabajoParaRemision(paginacion, new UsuarioDTO());
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("ConsultarOrdenDeTrabajoParaRemisionPorFiltro")]
        public async Task<IActionResult> ConsultarOrdenDeTrabajoParaRemisionPorFiltro([FromQuery]OrdenTrabajoRemisionFiltroDTO ordenTrabajoRemision )
        {
            try
            {
                var result = await _ordenTrabajoServicio.ConsultarOrdenDeTrabajoParaRemisionPorFiltro(ordenTrabajoRemision, new UsuarioDTO());
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut("ActualizarObservacionRemision")]
        public async Task<IActionResult> ActualizarObservacionRemision([FromQuery]string Observacion,[FromQuery] string guidOrdenTrabajo)
        {
            try
            {
                return Ok(await _ordenTrabajoServicio.ActualizarObservacionRemision(Observacion,Guid.Parse(guidOrdenTrabajo), new UsuarioDTO()));
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("ConsultarOrdenTrabajoEstadoRemision")]
        public async Task<IActionResult> ConsultarOrdenTrabajoEstadoRemision([FromQuery]List<Guid> guidOrdenTrabajo)
        {
            try
            {
                return Ok(await _ordenTrabajoServicio.ConsultarOrdenTrabajoEstadoRemision(guidOrdenTrabajo,new UsuarioDTO()));
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut("ActualizarEstadoOrdenesDeTrabajo")]
        public async Task<IActionResult> ActualizarEstadoOrdenesDeTrabajo([FromQuery]List<Guid> guidsOrdenTrabajo, [FromQuery] string estado)
        {
            try
            {
                return Ok(await _ordenTrabajoServicio.ActualizarEstadoOrdenesDeTrabajo(guidsOrdenTrabajo, estado, new UsuarioDTO()));
            }
            catch (Exception)
            {

                throw;
            }
        }


    }
}

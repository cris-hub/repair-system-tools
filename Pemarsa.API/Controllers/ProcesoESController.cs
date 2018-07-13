using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Pemarsa.API.fwk;
using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using ProcesoES.Service;

namespace Pemarsa.API.Controllers
{

    [Route("api/[controller]")]
    public class ProcesoESController : BaseController
    {
        private readonly IProcesoService _procesoService;
        public static IConfiguration Configuration { get; set; }
        public ProcesoESController(IProcesoService procesoService)
        {
            _procesoService = procesoService;
        }

        [HttpGet("ConsultarProcesoPorGuid")]
        public async Task<IActionResult> ConsultarProcesoPorGuid([FromQuery]string guidProceso)
        {
            try
            {
                return Ok((await _procesoService.ConsultarProcesoPorGuid(Guid.Parse(guidProceso), new UsuarioDTO())));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ActualizarEstadoProceso")]
        public async Task<IActionResult> ActualizarEstadoProceso([FromQuery]string guidProceso, [FromQuery]string estado)
        {
            try
            {
                bool actualizo = await _procesoService.ActualizarEstadoProceso(Guid.Parse(guidProceso), estado, new UsuarioDTO());
                return Ok(actualizo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarProcesosPorTipo")]
        public async Task<IActionResult> ConsultarProcesosPorTipo([FromQuery]int tipoProceso, Paginacion paginacion)
        {
            try
            {
                Tuple<int, IEnumerable<Proceso>> procesos = await _procesoService.ConsultarProcesosPorTipo(tipoProceso, paginacion, new UsuarioDTO());
                return Ok(new { CantidadRegistros = procesos.Item1, Listado = procesos.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarProcesoPorId")]
        public async Task<IActionResult> ConsultarProcesoPorId([FromQuery]int idProceso)
        {
            try
            {
                return Ok(await _procesoService.ConsultarProcesoPorId(idProceso, new UsuarioDTO()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarProcesosPorTipoPorFiltro")]
        public async Task<IActionResult> ConsultarProcesosPorTipoPorFiltro([FromQuery]ParametrosProcesosoDTO parametrosDTO)
        {
            try
            {
                Tuple<int, IEnumerable<Proceso>> procesos = await _procesoService.ConsultarProcesosPorTipoPorFiltro(parametrosDTO, new UsuarioDTO());
                return Ok(procesos);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
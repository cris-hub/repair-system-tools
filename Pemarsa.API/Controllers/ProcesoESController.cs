using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DocumentoAdjuntoUS.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using OrdenTrabajoES.Service;
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
        private readonly IOrdenTrabajoService _ordenTrabajoService;

        public static IConfiguration Configuration { get; set; }
        public ProcesoESController(IProcesoService procesoService, IOrdenTrabajoService ordenTrabajoService)
        {
            _procesoService = procesoService;
            _ordenTrabajoService = ordenTrabajoService;

        }

        [HttpGet("ConsultarProcesoPorGuid")]
        public async Task<IActionResult> ConsultarProcesoPorGuid([FromQuery]string guidProceso)
        {
            try
            {
                Proceso proceso = await _procesoService.ConsultarProcesoPorGuid(Guid.Parse(guidProceso), new UsuarioDTO());
                proceso.OrdenTrabajo = await _ordenTrabajoService.ConsultarOrdenDeTrabajoPorGuid(proceso.OrdenTrabajo.Guid.ToString(), new UsuarioDTO());

                return Ok(proceso);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("CrearProceso")]
        public async Task<IActionResult> CrearProceso([FromBody]Proceso proceso)
        {
            try
            {
                Guid Guidproceso = await _procesoService.CrearProceso(proceso, new UsuarioDTO());
                return Ok(Guidproceso);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("ActualizarProceso")]
        public async Task<IActionResult> ActualizarProceso([FromBody]Proceso proceso)
        {
            try
            {
                bool seActualizo = await _procesoService.ActualizarProceso(proceso, new UsuarioDTO());
                return Ok(seActualizo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("CrearInspeccionConexiones")]
        public async Task<IActionResult> CrearInspeccionConexiones([FromBody]IEnumerable<InspeccionConexion> InspeccionesConexiones)
        {
            try
            {
                 IEnumerable<Guid> GuidsInspeccionConexiones = await _procesoService.CrearInspeccionConexiones(InspeccionesConexiones, new UsuarioDTO());
                return Ok(GuidsInspeccionConexiones);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPut("ActualizarInspeccionConexiones")]
        public async Task<IActionResult> ActualizarInspeccionConexiones([FromBody]IEnumerable<InspeccionConexion> InspeccionesConexiones)
        {
            try
            {
                bool seActualizo = await _procesoService.ActualizarInspeccionConexiones(InspeccionesConexiones, new UsuarioDTO());
                return Ok(seActualizo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("ActualizarEstadoProceso")]
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


        [HttpPut("ActualizarEstadoInspeccionPieza")]
        public async Task<IActionResult> ActualizarEstadoInspeccionPieza([FromQuery]string guidProceso, [FromQuery]int pieza, [FromQuery]int estado)
        {
            try
            {
                bool actualizo = await _procesoService.ActualizarEstadoInspeccionPieza(Guid.Parse(guidProceso), pieza, estado, new UsuarioDTO());
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
                return Ok(new { CantidadRegistros = procesos.Item1, Listado = procesos.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("CrearInspeccion")]
        public async Task<IActionResult> CrearInspeccion([FromQuery]string guidProceso, [FromQuery]int tipoInspeccion, [FromQuery]int pieza)
        {
            try
            {

                Guid GuidInspeccionCreada = await _procesoService.CrearInspeccion(Guid.Parse(guidProceso), tipoInspeccion, pieza, new UsuarioDTO());

                return Ok(GuidInspeccionCreada);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("ActualizarEstadoInspeccion")]
        public async Task<IActionResult> ActualizarEstadoInspeccion([FromQuery]string guidInspeccion, [FromQuery]int estado)
        {
            try
            {

                bool realizoActualizacion = await _procesoService.ActualizarEstadoInspeccion(Guid.Parse(guidInspeccion), estado, new UsuarioDTO());

                return Ok(realizoActualizacion);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPut("ActualizarInspeccion")]
        public async Task<IActionResult> ActualizarInspección([FromBody]Inspeccion inspeccion)
        {
            try
            {

                bool operacionCorrecta = await _procesoService.ActualizarInspección(inspeccion, new UsuarioDTO());

                return Ok(operacionCorrecta);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPut("ActualizarProcesoSugerir")]
        public async Task<IActionResult> ActualizarProcesoSugerir([FromQuery]string guiidProceso, [FromQuery]string guidProcesoSugerir)
        {
            try
            {

                bool operacionCorrecta = await _procesoService.ActualizarProcesoSugerir(Guid.Parse(guiidProceso), Guid.Parse(guidProcesoSugerir), new UsuarioDTO());

                return Ok(operacionCorrecta);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet("ConsultarSiguienteInspeccion")]
        public async Task<IActionResult> ConsultarSiguienteInspeccion([FromQuery]string guidProceso, [FromQuery]int pieza)
        {
            try
            {
                Inspeccion inspeccion = await _procesoService.ConsultarSiguienteInspeccion(Guid.Parse(guidProceso), pieza, new UsuarioDTO());


                return Ok(inspeccion);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarProcesoPorTipoYOrdenTrabajo")]
        public async Task<IActionResult> ConsultarProcesoPorTipoYOrdenTrabajo([FromQuery]int tipoProceso,[FromQuery]string guidOit)
        {
            try
            {
                Proceso proceso = await _procesoService.ConsultarProcesoPorTipoYOrdenTrabajo(tipoProceso, Guid.Parse(guidOit), new UsuarioDTO());
                

                return Ok(proceso);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("RechazarProceso")]
        public async Task<IActionResult> RechazarProceso([FromQuery]string guiidProceso, [FromQuery]string observacion)
        {
            try
            {

                bool operacionCorrecta = await _procesoService.RechazarProceso(Guid.Parse(guiidProceso), observacion, new UsuarioDTO());

                return Ok(operacionCorrecta);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
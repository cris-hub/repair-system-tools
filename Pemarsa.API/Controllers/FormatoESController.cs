using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using FormatoES.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Pemarsa.API.fwk;
using Pemarsa.CanonicalModels;
using Pemarsa.Domain;

namespace Pemarsa.API.Controllers
{

    [Route("api/[controller]")]
    public class FormatoESController : BaseController
    {
        private readonly IFormatoService _service;
        public static IConfiguration Configuration { get; set; }

        public FormatoESController(IFormatoService service)
        {
            _service = service;
        }

        [HttpPost("CrearFormato")]
        public async Task<IActionResult> CrearFormato([FromBody]Formato formato)
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


                return Ok(await _service.CrearFormato(formato, pathServer, new UsuarioDTO()));

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarFormatos")]
        public async Task<IActionResult> ConsultarFormatos(Paginacion paginacion)
        {
            try
            {
                var result = (await _service.ConsultarFormatos(paginacion, new UsuarioDTO()));
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarFormatoPorGuid")]
        public async Task<IActionResult> ConsultarFormatoPorGuid([FromQuery]string guidFormato)
        {
            try
            {
                return Ok((await _service.ConsultarFormatoPorGuid(Guid.Parse(guidFormato), new UsuarioDTO())));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarFormatosPorFiltro")]
        public async Task<IActionResult> ConsultarFormatosPorFiltro([FromQuery]ParametrosDTO parametrosDTO)
        {
            try
            {
                var result = (await _service.ConsultarFormatosPorFiltro(new ParametrosDTO
                {
                    CantidadRegistros = parametrosDTO.CantidadRegistros,
                    PaginaActual = parametrosDTO.PaginaActual,
                    Codigo = parametrosDTO.Codigo,
                    FechaCreacion = parametrosDTO.FechaCreacion,
                    FormatoAdjunto = parametrosDTO.FormatoAdjunto,
                    HerramientaId = parametrosDTO.HerramientaId,
                    HerramientaGuid = parametrosDTO.HerramientaGuid,
                    Conexion = parametrosDTO.Conexion,
                    TipoConexion = parametrosDTO.TipoConexion,
                }, new UsuarioDTO()));
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("ActualizarFormato")]
        public async Task<IActionResult> ActualizarFormato([FromBody]Formato formato)
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

                return Ok(await _service.ActualizarFormato(formato, pathServer, new UsuarioDTO()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarFormatoPorGuidHerramienta")]
        public async Task<IActionResult> ConsultarFormatoPorGuidHerramienta([FromQuery]string guidHerramienta)
        {
            try
            {
                return Ok((await _service.ConsultarFormatoPorGuid(Guid.Parse(guidHerramienta), new UsuarioDTO())));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarFormatoPorTipoConexion")]
        public async Task<IActionResult> ConsultarFormatoPorTipoConexion([FromQuery]int TipoConexion)
        {
            try
            {
                return Ok((await _service.ConsultarFormatoPorTipoConexion(TipoConexion, new UsuarioDTO())));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
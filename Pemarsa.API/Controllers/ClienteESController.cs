using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ClienteES.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Pemarsa.API.fwk;
using Pemarsa.CanonicalModels;
using Pemarsa.Domain;

namespace Pemarsa.API.Controllers
{
    [Route("api/[controller]")]
    public class ClienteESController : BaseController
    {
        private readonly IClienteService _service;
        public static IConfiguration Configuration { get; set; }

        public ClienteESController(IClienteService service)
        {
            _service = service;
        }

        [HttpPost("CrearCliente")]
        public async Task<IActionResult> CrearCliente([FromBody]Cliente cliente)
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

                return Ok(await _service.CrearCliente(cliente, pathServer,new UsuarioDTO()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarClientes")]
        public async Task<IActionResult> ConsultarClientes(Paginacion paginacion)
        {
            try
            {
                var result = (await _service.ConsultarClientes(paginacion, new UsuarioDTO()));
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarClientePorGuid")]
        public async Task<IActionResult> ConsultarClientePorGuid([FromQuery]string guidCliente)
        {
            try
            {
                return Ok((await _service.ConsultarClientePorGuid(Guid.Parse(guidCliente), new UsuarioDTO())));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarLineasPorGuidCliente")]
        public async Task<IActionResult> ConsultarLineasPorGuidCliente([FromQuery]string guidCliente)
        {
            try
            {
                return Ok((await _service.ConsultarLineasPorGuidCliente(Guid.Parse(guidCliente), new UsuarioDTO())));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarClientesPorFiltro")]
        public async Task<IActionResult> ConsultarClientesPorFiltro([FromQuery]ParametrosDTO parametrosDTO)
        {
            try
            {
                var result = (await _service.ConsultarClientesPorFiltro(new ParametrosDTO
                {
                    CantidadRegistros = parametrosDTO.CantidadRegistros,
                    PaginaActual = parametrosDTO.PaginaActual,
                    RazonSocial = parametrosDTO.RazonSocial,
                    Nit = parametrosDTO.Nit,
                    Telefono = parametrosDTO.Telefono,
                    Direccion = parametrosDTO.Direccion,
                    Estado = parametrosDTO.Estado
                }, new UsuarioDTO()));
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [HttpGet("ActualizarEstadoCliente")]
        public async Task<IActionResult> ActualizarEstadoCliente([FromQuery]string guidCliente, [FromQuery]string estado)
        {
            try
            {
                return Ok(await _service.ActualizarEstadoCliente(Guid.Parse(guidCliente), estado,new UsuarioDTO()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [HttpPut("ActualizarCliente")]
        public async Task<IActionResult> ActualizarCliente([FromBody]Cliente cliente)
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

                return Ok(await _service.ActualizarCliente(cliente, pathServer,  new UsuarioDTO()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
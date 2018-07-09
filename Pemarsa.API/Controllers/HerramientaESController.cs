using Pemarsa.API.fwk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HerramientaES.Service;
using Microsoft.AspNetCore.Mvc;
using Pemarsa.Domain;
using Pemarsa.CanonicalModels;

namespace Pemarsa.API.Controllers
{
    [Route("api/[controller]")]
    public class HerramientaESController : BaseController
    {
        private readonly IHerramientaService _service;

        public HerramientaESController(IHerramientaService service)
        {
            _service = service;
        }

        [HttpPost("CrearHerramienta")]
        public async Task<IActionResult> CrearCrearHerramientaCliente([FromBody]Herramienta herramienta)
        {
            try
            {
                return Ok(await _service.CrearHerramienta(herramienta,new UsuarioDTO()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarHerramientasPorGuidCliente")]
        public async Task<IActionResult> ConsultarHerramientasPorGuidCliente([FromQuery]string guidCliente)
        {
            try
            {
                return Ok((await _service.ConsultarHerramientasPorGuidCliente(Guid.Parse(guidCliente), new UsuarioDTO())));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarHerramientaPorGuid")]
        public async Task<IActionResult> ConsultarHerramientaPorGuid([FromQuery]string guidHerramienta)
        {
            try
            {
                return Ok((await _service.ConsultarHerramientaPorGuid(Guid.Parse(guidHerramienta), new UsuarioDTO())));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarHerramientas")]
        public async Task<IActionResult> ConsultarHerramientas(Paginacion paginacion)
        {
            try
            {
                var result = (await _service.ConsultarHerramientas(paginacion, new UsuarioDTO()));
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarHerramientasPorFiltro")]
        public async Task<IActionResult> ConsultarHerramientasPorFiltro([FromQuery] ParametrosHerramientasDTO parametrosHerramientasDTO)
        {
            try
            {
                var result = (await _service.ConsultarHerramientasPorFiltro(new ParametrosHerramientasDTO
                {
                    Nombre = parametrosHerramientasDTO.Nombre,
                    PaginaActual = parametrosHerramientasDTO.PaginaActual,
                    CantidadRegistros = parametrosHerramientasDTO.CantidadRegistros
                }, new UsuarioDTO()));
                return Ok(new { CantidadRegistros = result.Item1, Listado = result.Item2.ToList() });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("ActualizarHerramienta")]
        public async Task<IActionResult> ActualizarHerramienta([FromBody]Herramienta herramienta)
        {
            try
            {
                return Ok(await _service.ActualizarHerramienta(herramienta, new UsuarioDTO()));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}

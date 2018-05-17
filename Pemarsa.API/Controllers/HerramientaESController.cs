using Pemarsa.API.fwk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HerramientaES.Service;
using Microsoft.AspNetCore.Mvc;
using Pemarsa.Domain;

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
                return Ok(await _service.CrearHerramienta(herramienta));
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
                return Ok((await _service.ConsultarHerramientasPorGuidCliente(Guid.Parse(guidCliente))));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

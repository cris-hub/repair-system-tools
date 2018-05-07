using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClienteES.Service;
using Microsoft.AspNetCore.Mvc;
using Pemarsa.API.fwk;
using Pemarsa.Domain;

namespace Pemarsa.API.Controllers
{
    [Route("api/[controller]")]
    public class ClienteESController : BaseController
    {
        private readonly IClienteService _service;

        public ClienteESController(IClienteService service)
        {
            _service = service;
        }

        [HttpPost("CrearCliente")]
        public async Task<IActionResult> CrearCliente([FromBody]Cliente cliente)
        {
            try
            {
                return Ok(await _service.CrearCliente(cliente));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ConsultarClientes")]
        public async Task<IActionResult> ConsultarClientes()
        {
            try
            {
                return Ok((await _service.ConsultarClientes()));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
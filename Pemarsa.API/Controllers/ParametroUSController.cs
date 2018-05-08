using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pemarsa.Domain;
using ParametroUS.Service;

namespace Pemarsa.API.Controllers
{
    [Route("api/[controller]")]
    public class ParametroUSController: Controller
    {
        private readonly IParametroService _service;
        public ParametroUSController(IParametroService service)
        {
            _service = service;
        }
        [HttpGet("ConsultarParametrosPorEntidad")]
        public async Task<IActionResult> ConsultarParametrosPorEntidad([FromQuery]string entidad)
        {
            try
            {
                var consulta = await _service.ConsultarParametrosPorEntidad(entidad);

                return Ok(consulta);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

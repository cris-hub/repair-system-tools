using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FormatoES.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pemarsa.API.fwk;
using Pemarsa.Domain;

namespace Pemarsa.API.Controllers
{
    
    [Route("api/FormatoES")]
    public class FormatoESController : BaseController
    {
        private readonly IFormatoService _service;

        public FormatoESController(IFormatoService service)
        {
            _service = service;
        }
        [HttpPost("CrearFormato")]
        public async Task<IActionResult> CrearFormato([FromBody]Formato formato)
        {
            try
            {
                return Ok(await _service.CrearFormato(formato));

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

    }
}
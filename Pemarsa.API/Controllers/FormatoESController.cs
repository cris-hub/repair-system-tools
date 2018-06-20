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


                return Ok(await _service.CrearFormato(formato, pathServer));

            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

    }
}
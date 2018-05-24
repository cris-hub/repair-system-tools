﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using OrdenTrabajoES.Service;
using Pemarsa.API.fwk;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Pemarsa.API.Controllers
{
    [Route("api/[controller]")]
    public class OrdenTrabajoESController : BaseController
    {
        private readonly IOrdenTrabajoService _service;
        public static IConfiguration Configuration { get; set; }

        public OrdenTrabajoESController(IOrdenTrabajoService service)
        {
            _service = service;
        }

        [HttpPost("CrearSolicitudDeTrabajo")]
        public async Task<IActionResult> CrearSolicitudDeTrabajo([FromBody]SolicitudOrdenTrabajo solicitudOrdenTrabajo)
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
                return Ok(await _service.CrearSolicitudDeTrabajo(solicitudOrdenTrabajo, pathServer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Pemarsa.API.fwk;
using Pemarsa.Domain;
using ProcesoES.Service;

namespace Pemarsa.API.Controllers
{
    
    [Route("api/[controller]")]
    public class ProcesoESController : BaseController
    {
        private readonly  IProcesoService _service;
        public static IConfiguration Configuration { get; set; }
        public ProcesoESController(IProcesoService service)
        {
            _service = service;
        }



    }
}
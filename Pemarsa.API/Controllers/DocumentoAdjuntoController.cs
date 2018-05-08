using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentoAdjuntoUS.Service;
using Microsoft.AspNetCore.Mvc;
using Pemarsa.Domain;

namespace Pemarsa.API.Controllers
{
    [Route("api/[controller]")]
    public class DocumentoAdjuntoController : Controller
    {
        private readonly IDocumentoAdjuntoService _service;

        public DocumentoAdjuntoController(IDocumentoAdjuntoService documentoAdjuntoService)
        {
            _service = documentoAdjuntoService;
        }

       [HttpPut, Route("ActualizarDocumentoAdjunto")]
       public async Task<IActionResult> ActualizarDocumentoAdjunto([FromBody] DocumentoAdjunto documentoAdjunto)
        {
            try
            {
                return Ok(await _service.ActualizarDocumentoAdjunto(documentoAdjunto, "s"));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost, Route("CrearDocumentoAdjunto")]
        public async Task<IActionResult> CrearDocumentoAdjunto([FromBody] DocumentoAdjunto documentoAdjunto)
        {
            try
            {
                return Ok(await _service.CrearDocumentoAdjunto(documentoAdjunto, "s"));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
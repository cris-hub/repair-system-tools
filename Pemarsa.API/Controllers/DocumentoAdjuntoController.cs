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
                return Ok(await _service.ActualizarDocumentoAdjunto(documentoAdjunto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("ConsultarDocumentoAdjunto")]
        public async Task<IActionResult> ConsultarDocumentoAdjunto(int documentoAdjuntoId)
        {
            try
            {
                var result = (await _service.ConsultarDocumentoAdjuntoPorId(documentoAdjuntoId));
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }

        [HttpPost, Route("CrearDocumentoAdjunto")]
        public async Task<IActionResult> CrearDocumentoAdjunto([FromBody] DocumentoAdjunto documentoAdjunto)
        {
            try
            {
                return Ok(await _service.CrearDocumentoAdjunto(documentoAdjunto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
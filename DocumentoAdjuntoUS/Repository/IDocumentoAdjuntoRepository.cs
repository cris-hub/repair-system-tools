using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DocumentoAdjuntoUS.Repository
{
    internal interface IDocumentoAdjuntoRepository
    {
        Task<int> CrearDocumentoAdjunto(DocumentoAdjunto documentoAdjunto);
        Task<bool> ActualizarDocumentoAdjunto(DocumentoAdjunto documentoAdjunto);
        Task<string> ConsultarRutaActualPapelTrabajo(int AdjuntoId);
    }
}

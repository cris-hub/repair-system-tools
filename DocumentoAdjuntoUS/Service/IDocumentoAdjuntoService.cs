using Pemarsa.Domain;
using System.Threading.Tasks;

namespace DocumentoAdjuntoUS.Service
{
    public interface IDocumentoAdjuntoService
    {
        Task<int> CrearDocumentoAdjunto(DocumentoAdjunto documentoAdjunto, string RutaServer);
        Task<bool> ActualizarDocumentoAdjunto(DocumentoAdjunto documentoAdjunto, string RutaServer);
    }
}

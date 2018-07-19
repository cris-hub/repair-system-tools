using Pemarsa.Domain;
using System.Threading.Tasks;

namespace DocumentoAdjuntoUS.Service
{
    public interface IDocumentoAdjuntoService
    {
        Task<int> CrearDocumentoAdjunto(DocumentoAdjunto documentoAdjunto);
        Task<bool> ActualizarDocumentoAdjunto(DocumentoAdjunto documentoAdjunto);
        Task<DocumentoAdjunto> ConsultarDocumentoAdjuntoPorId(int documentoAdjuntoId);
    }
}

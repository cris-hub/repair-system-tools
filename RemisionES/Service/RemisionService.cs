using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DocumentoAdjuntoUS.Service;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;
using RemisionES.Repository;

namespace RemisionES.Service
{
    public class RemisionService : IRemisionService
    {
        private readonly IRemisionRepository _repository;
        private readonly IDocumentoAdjuntoService _serviceDocumentoAdjunto;

        private PemarsaContext _context;

        public RemisionService(PemarsaContext context, IDocumentoAdjuntoService serviceDocumentoAdjunto)
        {
            _repository = new RemisionRepository(context);
            _serviceDocumentoAdjunto = serviceDocumentoAdjunto;
            _context = context;
        }

        public async Task<Tuple<int, IEnumerable<RemisionPendienteDTO>>> ConsultarRemisionesPendientes(Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarRemisionesPendientes(paginacion,usuario);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Tuple<int, IEnumerable<RemisionPendienteDTO>>> ConsultarRemisionesPendientesPorFiltro(RemisionPendienteFiltroDTO remisionFiltro, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarRemisionesPendientesPorFiltro(remisionFiltro, usuario);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Guid> CrearRemision(Remision remision, UsuarioDTO usuario)
        {
            try
            {

                if (remision.ImagenFactura != null)
                {
                    await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(remision.ImagenFactura);
                }

                if (remision.ImagenRemision != null)
                {
                    await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(remision.ImagenRemision);
                }

                return await _repository.CrearRemision(remision, usuario);

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

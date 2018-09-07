using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RemisionES.Repository
{
    public interface IRemisionRepository
    {
        Task<Tuple<int, IEnumerable<RemisionPendienteDTO>>> ConsultarRemisionesPendientes(Paginacion paginacion, UsuarioDTO usuario);
        Task<Tuple<int, IEnumerable<RemisionPendienteDTO>>> ConsultarRemisionesPendientesPorFiltro(RemisionPendienteFiltroDTO remisionFiltro, UsuarioDTO usuario);
        Task<Guid> CrearRemision(Remision remision, UsuarioDTO usuario);
    }
}

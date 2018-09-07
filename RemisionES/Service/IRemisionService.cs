using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RemisionES.Service
{
    public interface IRemisionService
    {
        Task<bool> ActualizarEstadoRemision(string estado, Guid guidRemision, UsuarioDTO usuario);
        Task<bool> ActualizarObservacion(string observacion, Guid guidRemision, UsuarioDTO usuario);
        Task<Tuple<int, IEnumerable<RemisionPendienteDTO>>> ConsultarRemisionesPendientes(Paginacion paginacion, UsuarioDTO usuario);
        Task<Tuple<int, IEnumerable<RemisionPendienteDTO>>> ConsultarRemisionesPendientesPorFiltro(RemisionPendienteFiltroDTO remisionFiltro, UsuarioDTO usuario);
        Task<Guid> CrearRemision(Remision remision, UsuarioDTO usuario);
    }
}

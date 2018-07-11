using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProcesoES.Repository
{
    public interface IProcesoRepository
    {
        Task<Guid> CrearProceso(Proceso proceso,UsuarioDTO usuario);
        Task<Proceso> ConsultarProcesoPorGuid(Guid guidProceso, UsuarioDTO usuarioDTO);
        Task<bool> ActualizarEstadoProceso(Guid guid, string estado, UsuarioDTO usuarioDTO);
        Task<Tuple<int, IEnumerable<Proceso>>> ConsultarProcesosPorTipo(int tipoProceso, Paginacion paginacion, UsuarioDTO usuarioDTO);
        Task<Tuple<int, IEnumerable<Proceso>>> ConsultarProcesosPorTipoPorFiltro(ParametrosProcesosoDTO parametrosDTO, UsuarioDTO usuarioDTO);
    }
}

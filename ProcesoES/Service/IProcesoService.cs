using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pemarsa.CanonicalModels;
using Pemarsa.Domain;

namespace ProcesoES.Service
{
    public interface IProcesoService
    {
        Task<Guid> CrearProceso(Proceso proceso, UsuarioDTO usuario);

        Task<Proceso> ConsultarProcesoPorGuid(Guid guidProceso, UsuarioDTO usuarioDTO);

        Task<Proceso> ConsultarProcesoPorId(int idProceso, UsuarioDTO usuarioDTO);

        Task<bool> ActualizarEstadoProceso(Guid guid, string estado, UsuarioDTO usuarioDTO);

        Task<Tuple<int, IEnumerable<Proceso>>> ConsultarProcesosPorTipo(int tipoProceso, Paginacion paginacion, UsuarioDTO usuarioDTO);

        Task<Tuple<int, IEnumerable<Proceso>>> ConsultarProcesosPorTipoPorFiltro(ParametrosProcesosoDTO parametrosDTO, UsuarioDTO usuarioDTO);

        Task<Guid> CrearInspeccion(Guid guidProceso, int tipoInspeccion, int pieza, UsuarioDTO usuarioDTO);

        Task<bool> ActualizarEstadoInspeccion(Guid guid, int estado, UsuarioDTO usuarioDTO);
        Task<bool> ActualizarInspección(Inspeccion inspeccion, UsuarioDTO usuarioDTO);
    }
}

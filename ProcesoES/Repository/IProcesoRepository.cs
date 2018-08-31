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
        Task<Proceso> ConsultarProcesoPorId(int idProceso, UsuarioDTO usuarioDTO);
        Task<Guid> CrearInspeccion(Guid guidProceso, int tipoInspeccion, int pieza, UsuarioDTO usuarioDTO);
        Task<bool> ActualizarEstadoInspeccion(Guid guid, int estado);
        Task<bool> ActualizarInspección(Inspeccion inspeccion, UsuarioDTO usuarioDTO);
        Task<bool> ActualizarProcesoSugerir(Guid guidProceso, Guid guidProcesoSegurido, UsuarioDTO usuarioDTO);
        Task<Inspeccion> ConsultarSiguienteInspeccion(Guid guid,int pieza, UsuarioDTO usuarioDTO);
        Task<bool> ActualizarEstadoInspeccionPieza(Guid guid, int pieza, int estado, UsuarioDTO usuarioDTO);
        Task<Proceso> ConsultarProcesoPorTipoYOrdenTrabajo(int guidProceso, Guid guidOrdenTrabajo, UsuarioDTO usuarioDTO);
        Task<bool> RechazarProceso(Guid guid, string observacion, UsuarioDTO usuarioDTO);
        Task<IEnumerable<Guid>> CrearInspeccionConexiones(IEnumerable<InspeccionConexion> inspeccionesConexiones, UsuarioDTO usuarioDTO);
        Task<bool> ActualizarInspeccionConexiones(IEnumerable<InspeccionConexion> inspeccionesConexiones, UsuarioDTO usuarioDTO);
        Task<bool> ActualizarProceso(Proceso proceso, UsuarioDTO usuarioDTO);
        Task<Guid> CrearDetalleSoldadura(DetalleSoldadura detalleSoldadura, UsuarioDTO usuario);
        Task<DetalleSoldadura> ConsultarDetalleSoldaduraPorGuid(Guid guidDetalleSoldadura, UsuarioDTO usuarioDTO);
    }
}

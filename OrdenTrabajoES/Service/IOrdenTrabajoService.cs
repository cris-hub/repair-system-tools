using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OrdenTrabajoES.Service
{
    public interface IOrdenTrabajoService
    {
        Task<Guid> CrearSolicitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer, UsuarioDTO usuario);

        Task<SolicitudOrdenTrabajo> ConsultarSolicitudDeTrabajoPorGuid(Guid guidSolicitudOrdenTrabajo, UsuarioDTO usuario);

        Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajo(Paginacion paginacion, UsuarioDTO usuario);

        Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajoPorFiltro(ParametrosSolicitudOrdenTrabajoDTO parametrosDTO, UsuarioDTO usuario);

        Task<bool> ActualizarEstadoSolicitudDeTrabajo(Guid guidSolicitudOrdenTrabajo, string estado, UsuarioDTO usuario);

        Task<bool> ActualizarSolcitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer, UsuarioDTO usuario);

        Task<Guid> CrearOrdenDeTrabajo(OrdenTrabajo ordenTrabajo, string RutaServer, UsuarioDTO usuario);

        Task<OrdenTrabajo> ConsultarOrdenDeTrabajoPorGuid(string guidOrdenDeTrabajoPor, UsuarioDTO usuario);

        Task<Tuple<int, IEnumerable<OrdenTrabajo>>> ConsultarOrdenesDeTrabajo(Paginacion parametrosSolicitudOrdenTrabajoDTO, UsuarioDTO usuario);

        Task<Tuple<int, IEnumerable<OrdenTrabajo>>> ConsultarOrdenesDeTrabajoPorFiltro(ParametroOrdenTrabajoDTO parametrosDTO, UsuarioDTO usuario);

        Task<bool> ActualizarEstadoOrdenDeTrabajo(Guid guid, string estado, UsuarioDTO usuario);

        Task<bool> ActualizarOrdenDeTrabajo(OrdenTrabajo ordenTrabajo, UsuarioDTO usuario);

        Task<bool> CrearHistorialModificacionesOrdenDeTrabajo(List<OrdenTrabajoHistorialModificacion> modificacionesOrdenTrabajo, UsuarioDTO usuario);

        Task<Tuple<int, IEnumerable<OrdenTrabajoHistorialModificacion>>> ConsultarHistorialModificacionesOrdenDeTrabajo(Guid guidSolicitudOrdenTrabajo, UsuarioDTO usuario);



    }
}

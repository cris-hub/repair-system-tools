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
        Task<Guid> CrearSolicitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer);
        Task<SolicitudOrdenTrabajo> ConsultarSolicitudDeTrabajoPorGuid(Guid guidSolicitudOrdenTrabajo);
        Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajo(Paginacion paginacion);
        Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajoPorFiltro(ParametrosSolicitudOrdenTrabajoDTO parametrosDTO);
        Task<bool> ActualizarEstadoSolicitudDeTrabajo(Guid guidSolicitudOrdenTrabajo, string estado);
        Task<bool> ActualizarSolcitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer);
        Task<Guid> CrearOrdenDeTrabajoDesdeSolicitudTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer);
        Task<OrdenTrabajo> ConsultarOrdenDeTrabajoPorGuid(string guidOrdenDeTrabajoPor);
        Task<Tuple<int, IEnumerable<OrdenTrabajo>>> ConsultarOrdenesDeTrabajo(Paginacion parametrosSolicitudOrdenTrabajoDTO);

        Task<Tuple<int, IEnumerable<OrdenTrabajo>>> ConsultarOrdenesDeTrabajoPorFiltro(ParametrosSolicitudOrdenTrabajoDTO parametrosDTO);
        Task<bool> ActualizarEstadoOrdenDeTrabajo(Guid guid, string estado);
        Task<bool> ActualizarOrdenDeTrabajo(OrdenTrabajo ordenTrabajo);
    }
}

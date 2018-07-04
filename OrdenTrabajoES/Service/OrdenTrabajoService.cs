using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DocumentoAdjuntoUS.Service;
using OrdenTrabajoES.Repository;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;
using ProcesoES.Service;

namespace OrdenTrabajoES.Service
{
    public class OrdenTrabajoService : IOrdenTrabajoService
    {
        private readonly IOrdenTrabajoRepository _ordenTrabajoRepositorio;
        private readonly IProcesoService _procesoService;
        private readonly IDocumentoAdjuntoService _serviceDocumentoAdjunto;
        private PemarsaContext _context;

        public OrdenTrabajoService(
            PemarsaContext context,
            IDocumentoAdjuntoService serviceDocumentoAdjunto,
             IProcesoService procesoService)
        {
            _ordenTrabajoRepositorio = new OrdenTrabajoRepository(context);
            _serviceDocumentoAdjunto = serviceDocumentoAdjunto;
            _procesoService = procesoService;
            _context = context;
        }

        public async Task<bool> ActualizarEstadoSolicitudDeTrabajo(Guid guidSolicitudOrdenTrabajo, string estado)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ActualizarEstadoSolicitudDeTrabajo(guidSolicitudOrdenTrabajo, estado);
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> ActualizarSolcitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer)
        {
            try
            {


                foreach (var anexo in solicitudOrdenTrabajo.Anexos)
                {
                    if (anexo.DocumentoAdjunto != null)
                    {
                        await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(anexo.DocumentoAdjunto, RutaServer);

                    }

                }
                solicitudOrdenTrabajo.EstadoId = 8;

                return await _ordenTrabajoRepositorio.ActualizarSolcitudDeTrabajo(solicitudOrdenTrabajo);
            }
            catch (Exception e) { throw e; }
        }

        public async Task<SolicitudOrdenTrabajo> ConsultarSolicitudDeTrabajoPorGuid(Guid guidSolicitudOrdenTrabajo)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ConsultarSolicitudDeTrabajoPorGuid(guidSolicitudOrdenTrabajo);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajo(Paginacion paginacion)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ConsultarSolicitudesDeTrabajo(paginacion);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajoPorFiltro(ParametrosSolicitudOrdenTrabajoDTO parametrosDTO)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ConsultarSolicitudesDeTrabajoPorFiltro(parametrosDTO);
            }
            catch (Exception) { throw; }
        }

        public async Task<Guid> CrearOrdenDeTrabajoDesdeSolicitudTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer)
        {
            try
            {
                OrdenTrabajo ordenTrabajo = asignarValoresSolicitudAOrdenDeTrabajo(solicitudOrdenTrabajo);
                OrdenTrabajo OrdenTrabajo = await _ordenTrabajoRepositorio.CrearOrdenDeTrabajo(ordenTrabajo);

                if (OrdenTrabajo != null)
                {
                    await _procesoService.CrearProcesoDesdeOrdenDeTrabajo(OrdenTrabajo);
                }

                return OrdenTrabajo.Guid;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        private static OrdenTrabajo asignarValoresSolicitudAOrdenDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo)
        {
            return new OrdenTrabajo
            {
                Cantidad = solicitudOrdenTrabajo.Cantidad,
                CantidadInspeccionar = solicitudOrdenTrabajo.CantidadInspeccionar,
                Cotizacion = solicitudOrdenTrabajo.Cotizacion,
                DetallesSolicitud = solicitudOrdenTrabajo.DetallesSolicitud,
                Estado = solicitudOrdenTrabajo.Estado,
                Responsable = solicitudOrdenTrabajo.Responsable,
                PrioridadId = solicitudOrdenTrabajo.PrioridadId,
                LineaId = solicitudOrdenTrabajo.LineaId,
                ClienteId = solicitudOrdenTrabajo.ClienteId,
            };
        }

        public async Task<Guid> CrearSolicitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer)
        {
            try
            {
                foreach (var anexo in solicitudOrdenTrabajo.Anexos)
                {
                    await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(anexo.DocumentoAdjunto, RutaServer);
                }

                solicitudOrdenTrabajo.ResponsableId = 28;// este codigo cambia dependiendo de la api de seguridad
                solicitudOrdenTrabajo.EstadoId = 8;
                return await _ordenTrabajoRepositorio.CrearSolicitudDeTrabajo(solicitudOrdenTrabajo);
            }
            catch (Exception) { throw; }
        }

        public async Task<OrdenTrabajo> ConsultarOrdenDeTrabajoPorGuid(string guidOrdenDeTrabajo)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ConsultarOrdenDeTrabajoPorGuid(guidOrdenDeTrabajo);

            }
            catch (Exception e)
            {

                throw e;
            }

        }

        public async Task<Tuple<int, IEnumerable<OrdenTrabajo>>> ConsultarOrdenesDeTrabajo(Paginacion paginacion)
        {
            return await _ordenTrabajoRepositorio.ConsultarOrdenesDeTrabajo(paginacion);
        }

        public async Task<Tuple<int, IEnumerable<OrdenTrabajo>>> ConsultarOrdenesDeTrabajoPorFiltro(ParametrosSolicitudOrdenTrabajoDTO parametrosDTO)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ConsultarOrdenesDeTrabajoPorFiltro(parametrosDTO);
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        public async Task<bool> ActualizarEstadoOrdenDeTrabajo(Guid guid, string estado)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ActualizarEstadoOrdenDeTrabajo(guid, estado);
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> ActualizarOrdenDeTrabajo(OrdenTrabajo ordenTrabajo)
        {
            try
            {

                return await _ordenTrabajoRepositorio.ActualizarOrdenDeTrabajo(ordenTrabajo);
            }
            catch (Exception e) { throw e; }
        }
    }
}

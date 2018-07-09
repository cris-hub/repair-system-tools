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

        public async Task<bool> ActualizarEstadoSolicitudDeTrabajo(Guid guidSolicitudOrdenTrabajo, string estado, UsuarioDTO usuario)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ActualizarEstadoSolicitudDeTrabajo(guidSolicitudOrdenTrabajo, estado, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> ActualizarSolcitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer, UsuarioDTO usuario)
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

                return await _ordenTrabajoRepositorio.ActualizarSolcitudDeTrabajo(solicitudOrdenTrabajo, usuario);
            }
            catch (Exception e) { throw e; }
        }

        public async Task<SolicitudOrdenTrabajo> ConsultarSolicitudDeTrabajoPorGuid(Guid guidSolicitudOrdenTrabajo, UsuarioDTO usuario)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ConsultarSolicitudDeTrabajoPorGuid(guidSolicitudOrdenTrabajo, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajo(Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ConsultarSolicitudesDeTrabajo(paginacion, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajoPorFiltro(ParametrosSolicitudOrdenTrabajoDTO parametrosDTO, UsuarioDTO usuario)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ConsultarSolicitudesDeTrabajoPorFiltro(parametrosDTO, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<Guid> CrearOrdenDeTrabajo(OrdenTrabajo ordenTrabajo, string RutaServer, UsuarioDTO usuario)
        {
            try
            {


                if (ordenTrabajo.Id != 0)
                {
                    Proceso proceso = new Proceso();
                    proceso = AsignarValoresOrdenTrabajoAProceso(ordenTrabajo);
                    await _procesoService.CrearProceso(proceso,usuario);
                }
                else
                {

                    OrdenTrabajo OrdenTrabajo = await _ordenTrabajoRepositorio.CrearOrdenDeTrabajo(ordenTrabajo, usuario);

                    if (OrdenTrabajo != null)
                    {

                        if (ordenTrabajo.SolicitudOrdenTrabajoId == 0)
                        {
                            Proceso proceso = new Proceso();
                            proceso = AsignarValoresOrdenTrabajoAProceso(OrdenTrabajo);
                            await _procesoService.CrearProceso(proceso,usuario);
                        }

                    }
                    return OrdenTrabajo.Guid;

                }
                return ordenTrabajo.Guid;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<Guid> CrearSolicitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer, UsuarioDTO usuario)
        {
            try
            {
                foreach (var anexo in solicitudOrdenTrabajo.Anexos)
                {
                    await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(anexo.DocumentoAdjunto, RutaServer);
                }

                solicitudOrdenTrabajo.ResponsableId = 28;// este codigo cambia dependiendo de la api de seguridad
                solicitudOrdenTrabajo.EstadoId = 8;
                return await _ordenTrabajoRepositorio.CrearSolicitudDeTrabajo(solicitudOrdenTrabajo, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<OrdenTrabajo> ConsultarOrdenDeTrabajoPorGuid(string guidOrdenDeTrabajo, UsuarioDTO usuario)
        {
            try
            {


                Guid guid;
                OrdenTrabajo ordenTrabajo;
                ordenTrabajo = await _ordenTrabajoRepositorio.ConsultarOrdenDeTrabajoPorGuid(guidOrdenDeTrabajo, usuario);



                if (ordenTrabajo == null)
                {

                    ordenTrabajo = new OrdenTrabajo();
                    SolicitudOrdenTrabajo solicitud = await _ordenTrabajoRepositorio.ConsultarSolicitudDeTrabajoPorGuid(Guid.Parse(guidOrdenDeTrabajo), usuario);
                    if (solicitud != null)
                    {
                        ordenTrabajo = asignarValoresSolicitudAOrdenDeTrabajo(solicitud);

                    }


                    guid = await CrearOrdenDeTrabajo(ordenTrabajo, "", usuario);
                    ordenTrabajo = await _ordenTrabajoRepositorio.ConsultarOrdenDeTrabajoPorGuid(guid.ToString(), usuario);
                }

                return ordenTrabajo;

            }
            catch (Exception e)
            {

                throw e;
            }

        }

        public async Task<Tuple<int, IEnumerable<OrdenTrabajo>>> ConsultarOrdenesDeTrabajo(Paginacion paginacion, UsuarioDTO usuario)
        {
            return await _ordenTrabajoRepositorio.ConsultarOrdenesDeTrabajo(paginacion, usuario);
        }

        public async Task<Tuple<int, IEnumerable<OrdenTrabajo>>> ConsultarOrdenesDeTrabajoPorFiltro(ParametrosSolicitudOrdenTrabajoDTO parametrosDTO, UsuarioDTO usuario)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ConsultarOrdenesDeTrabajoPorFiltro(parametrosDTO, usuario);
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        public async Task<bool> ActualizarEstadoOrdenDeTrabajo(Guid guid, string estado, UsuarioDTO usuario)
        {
            try
            {
                return await _ordenTrabajoRepositorio.ActualizarEstadoOrdenDeTrabajo(guid, estado, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> ActualizarOrdenDeTrabajo(OrdenTrabajo ordenTrabajo, UsuarioDTO usuario)
        {
            try
            {

                return await _ordenTrabajoRepositorio.ActualizarOrdenDeTrabajo(ordenTrabajo, usuario);
            }
            catch (Exception e) { throw e; }
        }

        private static OrdenTrabajo asignarValoresSolicitudAOrdenDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo)
        {
            return new OrdenTrabajo
            {
                Cantidad = solicitudOrdenTrabajo.Cantidad,
                CantidadInspeccionar = solicitudOrdenTrabajo.CantidadInspeccionar,
                Cotizacion = solicitudOrdenTrabajo.Cotizacion,
                DetallesSolicitud = solicitudOrdenTrabajo.DetallesSolicitud,
                Responsable = solicitudOrdenTrabajo.Responsable,
                PrioridadId = solicitudOrdenTrabajo.PrioridadId,
                LineaId = solicitudOrdenTrabajo.LineaId,
                ClienteId = solicitudOrdenTrabajo.ClienteId,
                SolicitudOrdenTrabajoId = solicitudOrdenTrabajo.Id
            };
        }

        private static Proceso AsignarValoresOrdenTrabajoAProceso(OrdenTrabajo ordenTrabajo)
        {
            Proceso proceso = new Proceso()
            {
                CantidadInspeccion = ordenTrabajo.CantidadInspeccionar,
                EstadoId = 38,
                OrdenTrabajoId = ordenTrabajo.Id
            };
            return proceso;
        }
    }
}

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

        public async Task<bool> ActualizarSolcitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, UsuarioDTO usuario)
        {
            try
            {

                if (solicitudOrdenTrabajo.Remision != null)
                {
                    await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(solicitudOrdenTrabajo.Remision);
                }
                foreach (var anexo in solicitudOrdenTrabajo.Anexos)
                {

                    anexo.SolicitudOrdenTrabajoId = solicitudOrdenTrabajo.Id;
                    if (anexo.DocumentoAdjunto.Id != 0)
                    {
                        await _serviceDocumentoAdjunto.ActualizarDocumentoAdjunto(anexo.DocumentoAdjunto);

                    }

                    if (anexo.DocumentoAdjunto != null && anexo.DocumentoAdjunto.Id == 0)
                    {
                        await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(anexo.DocumentoAdjunto);

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

        public async Task<Guid> CrearOrdenDeTrabajo(OrdenTrabajo ordenTrabajo, UsuarioDTO usuario)
        {
            try
            {


                if (ordenTrabajo.Id != 0)
                {
                    Proceso proceso = new Proceso();
                    proceso = AsignarValoresOrdenTrabajoAProceso(ordenTrabajo);
                    await _procesoService.CrearProceso(proceso, usuario);
                }
                else
                {



                    OrdenTrabajo OrdenTrabajo = await _ordenTrabajoRepositorio.CrearOrdenDeTrabajo(ordenTrabajo, usuario);


                    foreach (var anexo in ordenTrabajo.Anexos)
                    {

                        anexo.OrdenTrabajoId = OrdenTrabajo.Id;

                        if (anexo.DocumentoAdjunto.Id != 0)
                        {
                            await _serviceDocumentoAdjunto.ActualizarDocumentoAdjunto(anexo.DocumentoAdjunto);

                        }
                        else
                        {
                            await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(anexo.DocumentoAdjunto);
                        }
                    }
                    OrdenTrabajo.Anexos = ordenTrabajo.Anexos;

                    if (OrdenTrabajo != null)
                    {

                        Proceso proceso = new Proceso();
                        proceso = AsignarValoresOrdenTrabajoAProceso(OrdenTrabajo);
                        await _procesoService.CrearProceso(proceso, usuario);

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

        public async Task<Guid> CrearSolicitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, UsuarioDTO usuario)
        {
            try
            {

                if (solicitudOrdenTrabajo.Remision != null)
                {
                    await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(solicitudOrdenTrabajo.Remision);
                }

                foreach (var anexo in solicitudOrdenTrabajo.Anexos)
                {
                    await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(anexo.DocumentoAdjunto);
                    anexo.SolicitudOrdenTrabajoId = solicitudOrdenTrabajo.Id;
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


                OrdenTrabajo ordenTrabajo = await _ordenTrabajoRepositorio.ConsultarOrdenDeTrabajoPorGuid(guidOrdenDeTrabajo, usuario);


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

        public async Task<Tuple<int, IEnumerable<OrdenTrabajo>>> ConsultarOrdenesDeTrabajoPorFiltro(ParametroOrdenTrabajoDTO parametrosDTO, UsuarioDTO usuario)
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


                foreach (var anexo in ordenTrabajo.Anexos)
                {

                    anexo.OrdenTrabajoId = ordenTrabajo.Id;

                    if (anexo.DocumentoAdjunto.Id != 0)
                    {
                        await _serviceDocumentoAdjunto.ActualizarDocumentoAdjunto(anexo.DocumentoAdjunto);

                    }
                    else
                    {
                        await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(anexo.DocumentoAdjunto);
                    }
                }




                return await _ordenTrabajoRepositorio.ActualizarOrdenDeTrabajo(ordenTrabajo, usuario);
            }
            catch (Exception e) { throw e; }
        }



        private static Proceso AsignarValoresOrdenTrabajoAProceso(OrdenTrabajo ordenTrabajo)
        {
            Proceso proceso = new Proceso()
            {
                CantidadInspeccion = ordenTrabajo.CantidadInspeccionar,

                OrdenTrabajoId = ordenTrabajo.Id
            };
            return proceso;
        }

        public async Task<bool> CrearHistorialModificacionesOrdenDeTrabajo(List<OrdenTrabajoHistorialModificacion> modificacionesOrdenTrabajo, UsuarioDTO usuario)
        {
            return await _ordenTrabajoRepositorio.CrearHistorialModificacionesOrdenDeTrabajo(modificacionesOrdenTrabajo, usuario);
        }

        public async Task<Tuple<int, IEnumerable<OrdenTrabajoHistorialModificacion>>> ConsultarHistorialModificacionesOrdenDeTrabajo(Guid guidOrdenTrabajo, Paginacion paginacion, UsuarioDTO usuario)
        {
            return await _ordenTrabajoRepositorio.ConsultarHistorialModificacionesOrdenDeTrabajo(guidOrdenTrabajo, paginacion, usuario);
        }

        public async Task<IEnumerable<OrdenTrabajoHistorialProcesoDTO>> ConsultarHistorialProcesosDeOrdenDeTrabajo(Guid guid, UsuarioDTO usuarioDTO)
        {
            try
            {
                IEnumerable < OrdenTrabajoHistorialProcesoDTO > historialProcesos = await _ordenTrabajoRepositorio.ConsultarHistorialProcesosDeOrdenDeTrabajo(guid, usuarioDTO);
                return historialProcesos;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

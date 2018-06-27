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

namespace OrdenTrabajoES.Service
{
    public class OrdenTrabajoService : IOrdenTrabajoService
    {
        private readonly IOrdenTrabajoRepository _repository;
        private readonly IDocumentoAdjuntoService _serviceDocumentoAdjunto;
        private PemarsaContext _context;

        public OrdenTrabajoService(PemarsaContext context, IDocumentoAdjuntoService serviceDocumentoAdjunto)
        {
            _repository = new OrdenTrabajoRepository(context);
            _serviceDocumentoAdjunto = serviceDocumentoAdjunto;
            _context = context;
        }

        public async Task<bool> ActualizarEstadoSolicitudDeTrabajo(Guid guidSolicitudOrdenTrabajo, string estado)
        {
            try
            {
                return await _repository.ActualizarEstadoSolicitudDeTrabajo(guidSolicitudOrdenTrabajo, estado);
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> ActualizarSolcitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer)
        {
            try
            {
                if (solicitudOrdenTrabajo.DocumentoAdjunto != null)
                {
                    List<SolicitudOrdenTrabajoAnexos> anexos = new List<SolicitudOrdenTrabajoAnexos>();
                    foreach (var anexoDocumento in solicitudOrdenTrabajo.DocumentoAdjunto)
                    {
                        //valido si tiene id para actulizar o crear un nuevo documento
                        if (anexoDocumento.Id != 0)
                        {
                            anexoDocumento.GuidUsuarioModifica = solicitudOrdenTrabajo.GuidUsuarioModifica;
                            anexoDocumento.NombreUsuarioModifica = solicitudOrdenTrabajo.NombreUsuarioModifica;
                            anexoDocumento.FechaModifica = DateTime.Now;
                            await _serviceDocumentoAdjunto.ActualizarDocumentoAdjunto(anexoDocumento, RutaServer);

                        }
                        else {
                            SolicitudOrdenTrabajoAnexos anexo = new SolicitudOrdenTrabajoAnexos();
                            anexo.NombreUsuarioCrea = solicitudOrdenTrabajo.NombreUsuarioCrea;
                            anexo.GuidUsuarioCrea = solicitudOrdenTrabajo.GuidUsuarioCrea;
                            anexo.Estado = true;
                            anexoDocumento.NombreUsuarioCrea = solicitudOrdenTrabajo.NombreUsuarioCrea;
                            anexoDocumento.GuidUsuarioCrea = solicitudOrdenTrabajo.GuidUsuarioCrea;
                            anexo.DocumentoAdjuntoId = await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(anexoDocumento, RutaServer);
                            anexo.Guid = Guid.NewGuid();
                            anexo.FechaRegistro = DateTime.Now;
                            anexos.Add(anexo);
                        } 
                    }
                    solicitudOrdenTrabajo.Anexos.AddRange(anexos);
                }
                return await _repository.ActualizarSolcitudDeTrabajo(solicitudOrdenTrabajo);
            }
            catch (Exception) { throw; }
        }

        public async Task<SolicitudOrdenTrabajo> ConsultarSolicitudDeTrabajoPorGuid(Guid guidSolicitudOrdenTrabajo)
        {
            try
            {
                return await _repository.ConsultarSolicitudDeTrabajoPorGuid(guidSolicitudOrdenTrabajo);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajo(Paginacion paginacion)
        {
            try
            {
                return await _repository.ConsultarSolicitudesDeTrabajo(paginacion);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajoPorFiltro(ParametrosSolicitudOrdenTrabajoDTO parametrosDTO)
        {
            try
            {
                return await _repository.ConsultarSolicitudesDeTrabajoPorFiltro(parametrosDTO);
            }
            catch (Exception) { throw; }
        }

        public async Task<Guid> CrearSolicitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, string RutaServer)
        {
            try
            {
                if (solicitudOrdenTrabajo.DocumentoAdjunto != null)
                {
                    List<SolicitudOrdenTrabajoAnexos> anexos = new List<SolicitudOrdenTrabajoAnexos>();
                    foreach (var anexoDocumento in solicitudOrdenTrabajo.DocumentoAdjunto) {
   
                        SolicitudOrdenTrabajoAnexos anexo = new SolicitudOrdenTrabajoAnexos();
                        anexo.NombreUsuarioCrea = solicitudOrdenTrabajo.NombreUsuarioCrea;
                        anexo.GuidUsuarioCrea = solicitudOrdenTrabajo.GuidUsuarioCrea;
                        anexo.Estado = true;
                        anexoDocumento.NombreUsuarioCrea = solicitudOrdenTrabajo.NombreUsuarioCrea;
                        anexoDocumento.GuidUsuarioCrea = solicitudOrdenTrabajo.GuidUsuarioCrea;
                        anexo.DocumentoAdjuntoId = await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(anexoDocumento, RutaServer);
                        anexo.Guid = Guid.NewGuid();
                        anexo.FechaRegistro = DateTime.Now;
                        anexos.Add(anexo);
                    }
                    solicitudOrdenTrabajo.Anexos = anexos;
                }
                solicitudOrdenTrabajo.EstadoId = 8;
                return await _repository.CrearSolicitudDeTrabajo(solicitudOrdenTrabajo);
            }
            catch (Exception) { throw; }
        }
    }
}

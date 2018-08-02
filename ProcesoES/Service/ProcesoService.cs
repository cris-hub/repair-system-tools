using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using DocumentoAdjuntoUS.Service;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;
using ProcesoES.Repository;

namespace ProcesoES.Service
{
    public class ProcesoService : IProcesoService
    {
        private readonly IProcesoRepository _procesoRepository;
        private readonly IDocumentoAdjuntoService _documentoAdjuntoService;
        private PemarsaContext _context;

        public ProcesoService(PemarsaContext context, IDocumentoAdjuntoService documentoAdjuntoService)
        {
            _procesoRepository = new ProcesoRepository(context);
            _documentoAdjuntoService = documentoAdjuntoService;
            _context = context;
        }

        public async Task<Guid> CrearProceso(Proceso proceso, UsuarioDTO usuario)
        {
            try
            {

                if (proceso.EstadoId == (int)ESTADOSPROCESOS.RECHAZADO)
                {

                }

                proceso.TipoProcesoId = (int)TIPOPROCESOS.INSPECCIONENTRADA;
                proceso.EstadoId = (int)ESTADOSPROCESOS.PENDIENTE;

                
                Guid procesoGuid = await _procesoRepository.CrearProceso(proceso, usuario);

                return procesoGuid;


            }
            catch (Exception e)
            {

                throw e;
            }
        }

        private static Proceso AsignarValoresOrdenTrabajoAProceso(OrdenTrabajo ordenTrabajo)
        {
            Proceso proceso = new Proceso()
            {
                CantidadInspeccion = ordenTrabajo.CantidadInspeccionar,
                EstadoId = ordenTrabajo.EstadoId, // cambiar por el canonica adecuado                ,
                TipoProcesoAnteriorId = 1,
                TipoProcesoId = 1,
                TipoProcesoSiguienteId = 1,
                TipoProcesoSiguienteSugeridoId = 1,
                TipoSoldaduraId = 1,
                MaquinaAsignadaId = 1,
                InstructivoId = 1,
                ProcesosRealizarId = 1,
                ProcesoSiguienteId = 1,
                ProcesoAnteriorId = 1,
                OrdenTrabajoId = 1
            };
            return proceso;
        }

        public async Task<Proceso> ConsultarProcesoPorGuid(Guid guidProceso, UsuarioDTO usuarioDTO)
        {
            Proceso proceso = await _procesoRepository.ConsultarProcesoPorGuid(guidProceso, usuarioDTO);
            return proceso;
        }

        public async Task<bool> ActualizarEstadoProceso(Guid guid, string estado, UsuarioDTO usuarioDTO)
        {
            try
            {
                return await _procesoRepository.ActualizarEstadoProceso(guid, estado, usuarioDTO);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Tuple<int, IEnumerable<Proceso>>> ConsultarProcesosPorTipo(int tipoProceso, Paginacion paginacion, UsuarioDTO usuarioDTO)
        {
            try
            {
                return await _procesoRepository.ConsultarProcesosPorTipo(tipoProceso, paginacion, usuarioDTO);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<Tuple<int, IEnumerable<Proceso>>> ConsultarProcesosPorTipoPorFiltro(ParametrosProcesosoDTO parametrosDTO, UsuarioDTO usuarioDTO)
        {
            return await _procesoRepository.ConsultarProcesosPorTipoPorFiltro(parametrosDTO, usuarioDTO);
        }

        public async Task<Proceso> ConsultarProcesoPorId(int idProceso, UsuarioDTO usuarioDTO)
        {
            try
            {
                return await _procesoRepository.ConsultarProcesoPorId(idProceso, usuarioDTO);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<Guid> CrearInspeccion(Guid guidProceso, int tipoInspeccion, int pieza, UsuarioDTO usuarioDTO)
        {
            try
            {
                return await _procesoRepository.CrearInspeccion(guidProceso, tipoInspeccion, pieza, usuarioDTO);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> ActualizarEstadoInspeccion(Guid guid, int estado, UsuarioDTO usuarioDTO)
        {
            return await _procesoRepository.ActualizarEstadoInspeccion(guid, estado);
        }

        public async Task<bool> ActualizarInspección(Inspeccion inspeccion, UsuarioDTO usuarioDTO)
        {

            try
            {
                await PersistirDocumentosAdjuntos(inspeccion);

                return await _procesoRepository.ActualizarInspección(inspeccion, usuarioDTO);
            }
            catch (Exception)
            {

                throw;
            }
        }

        private async Task PersistirDocumentosAdjuntos(Inspeccion inspeccion)
        {
            if (inspeccion.ImagenMfl != null
                || inspeccion.ImagenPantallaUltrasonido != null
                || inspeccion.ImagenUltrasonidoPrevia != null
                || inspeccion.ImagenUltrasonidoDurante != null
                || inspeccion.ImagenUltrasonidoDespues != null
                || inspeccion.ImagenMedicionEspesores != null
                || inspeccion.InspeccionFotos != null
                )
            {

            }
            if (inspeccion.ImagenMfl != null)
            {
                if (inspeccion.ImagenMfl.Id == 0)
                {
                    await _documentoAdjuntoService.CrearDocumentoAdjunto(inspeccion.ImagenMfl);

                }

            }
            if (inspeccion.ImagenPantallaUltrasonido != null)
            {
                if (inspeccion.ImagenPantallaUltrasonido.Id == 0)
                {
                    await _documentoAdjuntoService.CrearDocumentoAdjunto(inspeccion.ImagenPantallaUltrasonido);

                }

            }
            if (inspeccion.ImagenUltrasonidoPrevia != null)
            {
                if (inspeccion.ImagenUltrasonidoPrevia.Id == 0)
                {
                    await _documentoAdjuntoService.CrearDocumentoAdjunto(inspeccion.ImagenUltrasonidoPrevia);

                }

            }
            if (inspeccion.ImagenUltrasonidoDurante != null)
            {
                if (inspeccion.ImagenUltrasonidoDurante.Id == 0)
                {
                    await _documentoAdjuntoService.CrearDocumentoAdjunto(inspeccion.ImagenUltrasonidoDurante);

                }

            }
            if (inspeccion.ImagenUltrasonidoDespues != null)
            {
                if (inspeccion.ImagenUltrasonidoDespues.Id == 0)
                {
                    await _documentoAdjuntoService.CrearDocumentoAdjunto(inspeccion.ImagenUltrasonidoDespues);

                }

            }
            if (inspeccion.ImagenMedicionEspesores != null)
            {
                if (inspeccion.ImagenMedicionEspesores.Id == 0)
                {
                    await _documentoAdjuntoService.CrearDocumentoAdjunto(inspeccion.ImagenMedicionEspesores);

                }

            }
            if (inspeccion.InspeccionFotos != null)
            {
                foreach (var inspeccionFotos in inspeccion.InspeccionFotos)
                {

                    inspeccionFotos.InspeccionId = inspeccion.Id;

                    if (inspeccionFotos.DocumentoAdjunto.Id != 0)
                    {
                        await _documentoAdjuntoService.ActualizarDocumentoAdjunto(inspeccionFotos.DocumentoAdjunto);

                    }
                    else
                    {
                        await _documentoAdjuntoService.CrearDocumentoAdjunto(inspeccionFotos.DocumentoAdjunto);
                    }
                }
            }
        }

        public async Task<bool> ActualizarProcesoSugerir(Guid guidProceso, Guid guidProcesoSegurido, UsuarioDTO usuarioDTO)
        {
            try
            {
                bool accionCorrecta = await _procesoRepository.ActualizarProcesoSugerir(guidProceso, guidProcesoSegurido, usuarioDTO);
                return accionCorrecta;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Inspeccion> ConsultarSiguienteInspeccion(Guid guid,int pieza, UsuarioDTO usuarioDTO)
        {
            try
            {
                Inspeccion inspeccion = await _procesoRepository.ConsultarSiguienteInspeccion(guid, pieza, usuarioDTO);
                return inspeccion;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> ActualizarEstadoInspeccionPieza(Guid guid, int pieza, int estado, UsuarioDTO usuarioDTO)
        {
            try
            {
                bool accionRealizada = await _procesoRepository.ActualizarEstadoInspeccionPieza(guid, pieza, estado, usuarioDTO);
                return accionRealizada;
            }
            catch (Exception)
            {

                throw;
            };
        }
    }



}



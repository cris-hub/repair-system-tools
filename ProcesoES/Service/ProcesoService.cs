using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;
using ProcesoES.Repository;

namespace ProcesoES.Service
{
    public class ProcesoService : IProcesoService
    {
        private readonly IProcesoRepository _procesoRepository;
        private PemarsaContext _context;

        public ProcesoService(PemarsaContext context)
        {
            _procesoRepository = new ProcesoRepository(context);
            _context = context;
        }

        public async Task<Guid> CrearProceso(Proceso proceso, UsuarioDTO usuario)
        {
            try
            {
               

                Guid procesoGuid  = await _procesoRepository.CrearProceso(proceso,usuario);

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
            return await _procesoRepository.ConsultarProcesoPorGuid(guidProceso, usuarioDTO);
        }

        public async Task<bool> ActualizarEstadoProceso(Guid guid, string estado, UsuarioDTO usuarioDTO)
        {
            return await _procesoRepository.ActualizarEstadoProceso(guid,estado,usuarioDTO);
        }

        public async Task<Tuple<int, IEnumerable<Proceso>>> ConsultarProcesosPorTipo(int tipoProceso, Paginacion paginacion, UsuarioDTO usuarioDTO)
        {
            return await _procesoRepository.ConsultarProcesosPorTipo(tipoProceso,paginacion,usuarioDTO); ;
        }

        public async Task<Tuple<int, IEnumerable<Proceso>>> ConsultarProcesosPorTipoPorFiltro(ParametrosProcesosoDTO parametrosDTO, UsuarioDTO usuarioDTO)
        {
            return await _procesoRepository.ConsultarProcesosPorTipoPorFiltro(parametrosDTO, usuarioDTO);
        }
    }
}



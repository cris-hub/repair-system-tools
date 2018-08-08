using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;

namespace ProcesoES.Repository
{
    public class ProcesoRepository : IProcesoRepository
    {
        private readonly PemarsaContext _context;

        public ProcesoRepository(DbContext context)
        {
            _context = (PemarsaContext)context;
        }

        public async Task<bool> ActualizarEstadoInspeccion(Guid guid, int estado)
        {
            try
            {

                ESTADOS_INSPECCION estadoInspeccion = (ESTADOS_INSPECCION)Enum.Parse(typeof(ESTADOS_INSPECCION), estado.ToString());

                Inspeccion inspeccion = await _context.Inspeccion.FirstOrDefaultAsync(c => c.Guid == guid);

                inspeccion.EstadoId = (int)estadoInspeccion;

                _context.Update(inspeccion);

                return await _context.SaveChangesAsync() > 0;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> ActualizarEstadoProceso(Guid guid, string estado, UsuarioDTO usuarioDTO)
        {
            try
            {
                var proceso = await _context.Proceso.FirstOrDefaultAsync(a => a.Guid == guid);
                Int32.TryParse(estado, out int estadoid);
                var estadoProceso = (await _context.Catalogo.FirstOrDefaultAsync(a => (a.Valor == estado || a.Id == estadoid) && a.Grupo == "ESTADOS_PROCESO")) ?? throw new ApplicationException(CanonicalConstants.Excepciones.EstadoSolicitudNoEncontrado);

                if (estadoProceso.Id == (int)ESTADOSPROCESOS.PROCESADO)
                {
                    Proceso nuevo = new Proceso()
                    {
                        TipoProcesoId = (int)TIPOPROCESOS.REASIGNACION,
                        TipoProcesoAnteriorId = proceso.TipoProcesoId,
                        OrdenTrabajoId = proceso.OrdenTrabajoId,
                        TipoProcesoSiguienteSugeridoId = proceso.TipoProcesoSiguienteSugeridoId,
                        ProcesoAnteriorId = proceso.Id,
                        EstadoId = (int)ESTADOSPROCESOS.PENDIENTE,
                        Guid = Guid.NewGuid(),
                        NombreUsuarioCrea = "admin",
                        FechaRegistro = DateTime.Now,

                    };

                    await CrearProceso(nuevo, usuarioDTO);

                }
                proceso.EstadoId = estadoProceso.Id;
                proceso.FechaModifica = DateTime.Now;
                _context.Proceso.Add(proceso);
                _context.Entry(proceso).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception e) { throw e; }
        }

        public async Task<bool> ActualizarInspección(Inspeccion inspeccion, UsuarioDTO usuarioDTO)
        {
            try
            {
                DatosCreaccionObjecto(inspeccion);

                //_context.Entry(inspeccionDB).CurrentValues.SetValues(inspeccion);


                foreach (var t in inspeccion.InspeccionEquipoUtilizado)
                {

                    if (t.EquipoUtilizadoId <= 0 && t.InspeccionId == 0)
                    {
                        _context.Entry(t).State = EntityState.Added;

                        _context.InspeccionEquipoUtilizado.Add(t);
                    }
                    else
                    {
                        _context.Entry(t).State = EntityState.Modified;
                        _context.InspeccionEquipoUtilizado.Update(t);

                    }


                    var catalogo = await _context.Catalogo.SingleOrDefaultAsync(d => d.Id == t.EquipoUtilizadoId);
                    _context.Entry(catalogo).State = EntityState.Unchanged;

                }

                foreach (var t in inspeccion.Insumos)
                {

                    _context.Entry(t).State = t.Id <= 0 ?
                            EntityState.Added :
                            EntityState.Modified;
                    if (t.TipoInsumoId <= 0)
                    {

                        var catalogo = await _context.Catalogo.SingleOrDefaultAsync(d => d.Id == t.TipoInsumoId);
                        _context.Entry(catalogo).State = EntityState.Unchanged;
                    }


                }
                //_context.InspeccionInsumo.UpdateRange(inspeccion.Insumos);


                foreach (var t in inspeccion.Dimensionales)
                {
                    _context.Entry(t).State = t.Id <= 0 ?
                            EntityState.Added :
                            EntityState.Modified;
                }
                //_context.InspeccionDimensionalOtro.UpdateRange(inspeccion.Dimensionales);


                foreach (var t in inspeccion.Conexiones)
                {
                    _context.Entry(t).State = t.Id <= 0 ?
                            EntityState.Added :
                            EntityState.Modified;
                    if (t.EstadoId <= 0)
                    {

                        var catalogo = await _context.Catalogo.SingleOrDefaultAsync(d => d.Id == t.EstadoId);
                        _context.Entry(catalogo).State = EntityState.Unchanged;
                    }



                    _context.Entry(t).State = t.Id <= 0 ?
                                        EntityState.Added :
                                        EntityState.Modified;

                    _context.Entry(t).Property("FechaRegistro").IsModified = false;
                    _context.Entry(t).Property("NombreUsuarioCrea").IsModified = false;
                    _context.Entry(t).Property("GuidUsuarioCrea").IsModified = false;

                    //_context.InspeccionConexion.Add(t);
                }



                //_context.InspeccionEquipoUtilizado.UpdateRange(inspeccion.InspeccionEquipoUtilizado);

                inspeccion.EstadoId = (int)ESTADOS_INSPECCION.COMPLETADA;
                _context.Inspeccion.Update(inspeccion);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private static void DatosCreaccionObjecto(Inspeccion inspeccion)
        {
            if (inspeccion.Conexiones != null)
            {
                foreach (var t in inspeccion.Conexiones)
                {
                    if (t.Id <= 0)
                    {
                        t.NombreUsuarioCrea = "admin";
                        t.FechaRegistro = DateTime.Now;
                        t.InspeccionId = inspeccion.Id;
                    }
                }

            }
            if (inspeccion.Espesores != null)
            {
                foreach (var t in inspeccion.Espesores)
                {
                    if (t.Id <= 0)
                    {
                        t.NombreUsuarioCrea = "admin";
                        t.FechaRegistro = DateTime.Now;
                        t.InspeccionId = inspeccion.Id;
                    }
                }
            }
            if (inspeccion.Insumos != null)
            {
                foreach (var t in inspeccion.Insumos)
                {
                    if (t.Id <= 0)
                    {
                        t.NombreUsuarioCrea = "admin";
                        t.FechaRegistro = DateTime.Now;
                        t.InspeccionId = inspeccion.Id;
                    }
                }
            }
            if (inspeccion.Dimensionales != null)
            {
                foreach (var t in inspeccion.Dimensionales)
                {
                    if (t.Id <= 0)
                    {
                        t.NombreUsuarioCrea = "admin";
                        t.FechaRegistro = DateTime.Now;
                        t.InspeccionId = inspeccion.Id;
                    }
                }
            }
        }

        public async Task<Proceso> ConsultarProcesoPorGuid(Guid guidProceso, UsuarioDTO usuarioDTO)
        {
            try
            {
                var proceso = _context.Proceso.AsNoTracking()
                            .Include(c => c.InspeccionEntrada).ThenInclude(d => d.Inspeccion).ThenInclude(e => e.InspeccionEquipoUtilizado).ThenInclude(e => e.EquipoUtilizado)
                            .Include(c => c.InspeccionEntrada).ThenInclude(d => d.Inspeccion).ThenInclude(c => c.InspeccionFotos).ThenInclude(d => d.DocumentoAdjunto)
                            .Include(d => d.InspeccionEntrada).ThenInclude(c => c.Inspeccion.ImagenMedicionEspesores)
                            .Include(d => d.InspeccionEntrada).ThenInclude(c => c.Inspeccion.Dimensionales)
                            .Include(d => d.InspeccionEntrada).ThenInclude(c => c.Inspeccion.ImagenMfl)
                            .Include(d => d.InspeccionEntrada).ThenInclude(c => c.Inspeccion.Conexiones).ThenInclude(d => d.Conexion)
                            .Include(d => d.InspeccionEntrada).ThenInclude(c => c.Inspeccion.Insumos)
                            .Include(c => c.ProcesoInspeccionSalida).ThenInclude(d => d.Inspeccion)
                            .Include(c => c.OrdenTrabajo.Herramienta)
                            .Include(c => c.OrdenTrabajo.TamanoHerramienta)
                            .Include(c => c.OrdenTrabajo.Material).ThenInclude(m => m.Material)
                            .Include(c => c.OrdenTrabajo.Cliente)
                            .Include(c => c.OrdenTrabajo.Linea)
                            .Include(c => c.OrdenTrabajo.Responsable)
                            .Include(c => c.OrdenTrabajo.Anexos)
                            .Include(c => c.TipoProcesoSiguienteSugerido)
                            .Include(c => c.TipoProcesoAnterior);



                //var result = proceso.Select(d => new Proceso
                //{
                //    Id = d.Id,
                //    Guid = d.Guid,
                //    InspeccionEntrada = d.InspeccionEntrada.SelectMany(e =>
                //    new List<ProcesoInspeccionEntrada>()
                //    {
                //        new ProcesoInspeccionEntrada
                //        {
                //            Inspeccion = new Inspeccion
                //            {
                //                InspeccionFotos = e.Inspeccion.InspeccionFotos.SelectMany( fotos => new List<InspeccionFotos>
                //                {
                //                    new InspeccionFotos
                //                    {
                //                        DocumentoAdjunto = fotos.DocumentoAdjunto
                //                    }
                //                }
                //                )
                //            }
                //        }
                //    }),
                //    OrdenTrabajo = d.OrdenTrabajo,
                //    TipoProceso = d.TipoProceso,
                //    CantidadInspeccion = d.CantidadInspeccion,
                //    EquipoMedicionUtilizado = d.EquipoMedicionUtilizado,
                //    NombreUsuarioCrea = d.NombreUsuarioCrea,

                //});
                return await proceso.FirstOrDefaultAsync(c => c.Guid == guidProceso);

            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<Proceso> ConsultarProcesoPorId(int idProceso, UsuarioDTO usuarioDTO)
        {
            try
            {
                var query = _context.Proceso
                    .Include(p => p.TipoProceso);







                var result = await query.Where(c => c.Id == idProceso).FirstOrDefaultAsync();


                return result;
            }
            catch (Exception e) { throw e; }
        }

        public async Task<Tuple<int, IEnumerable<Proceso>>> ConsultarProcesosPorTipo(int tipoProceso, Paginacion paginacion, UsuarioDTO usuarioDTO)
        {

            try
            {
                var query = _context.Proceso
                    .Include(proceso => proceso.OrdenTrabajo.Herramienta)
                    .Include(proceso => proceso.OrdenTrabajo.Cliente)
                    .Include(proceso => proceso.Estado)
                    .Include(proceso => proceso.TipoProcesoAnterior)
                    .Include(proceso => proceso.OrdenTrabajo.Prioridad);




                var result = query.Where(c => c.TipoProcesoId == tipoProceso)
                    .Skip(paginacion.RegistrosOmitir())
                                    .Take(paginacion.CantidadRegistros);

                await result.ForEachAsync(async c => c.ProcesoAnterior = await ConsultarProcesoPorId(c.Id, usuarioDTO));



                var cantidad = await _context.Proceso.CountAsync();
                return new Tuple<int, IEnumerable<Proceso>>(cantidad, result);
            }
            catch (Exception e) { throw e; }
        }

        public async Task<Tuple<int, IEnumerable<Proceso>>> ConsultarProcesosPorTipoPorFiltro(ParametrosProcesosoDTO parametrosDTO, UsuarioDTO usuarioDTO)
        {
            var query = _context.Proceso
                .Where(c => c.TipoProceso.Id == parametrosDTO.TipoProceso || parametrosDTO.TipoProceso == 0)
                .Where(c => c.OrdenTrabajo.Prioridad.Id == parametrosDTO.OrdenTrabajoPrioridad || parametrosDTO.OrdenTrabajoPrioridad == 0)
                .Where(c => c.EstadoId == parametrosDTO.Estado || parametrosDTO.Estado == 0)
                .Where(c => c.OrdenTrabajoId.ToString().Contains(parametrosDTO.NumeroOIT) || String.IsNullOrEmpty(parametrosDTO.NumeroOIT))
                .Where(c => c.FechaRegistro.ToString().Contains(parametrosDTO.Fecha) || String.IsNullOrEmpty(parametrosDTO.Fecha))
                .Where(c => c.OrdenTrabajo.SerialHerramienta.ToString().Contains(parametrosDTO.SerialHerramienta) || String.IsNullOrEmpty(parametrosDTO.SerialHerramienta))
                .Where(c => c.OrdenTrabajo.Herramienta.Nombre.Contains(parametrosDTO.HerraminetaNombre) || String.IsNullOrEmpty(parametrosDTO.HerraminetaNombre))
                .Where(c => c.OrdenTrabajo.Cliente.NickName.Contains(parametrosDTO.ClienteNickname) || String.IsNullOrEmpty(parametrosDTO.ClienteNickname));


            var result = await query.Skip(parametrosDTO.RegistrosOmitir())
                .Take(parametrosDTO.CantidadRegistros)
                .ToListAsync();

            var cantidad = await _context.Proceso.CountAsync();
            return new Tuple<int, IEnumerable<Proceso>>(cantidad, result);
        }

        public async Task<Guid> CrearInspeccion(Guid guidProceso, int tipoInspeccion, int pieza, UsuarioDTO usuarioDTO)
        {

            try
            {
                var proceso = await _context.Proceso
                    .Include(c => c.InspeccionEntrada)
                    .Include(c => c.ProcesoInspeccionSalida)
                    .FirstOrDefaultAsync(a => a.Guid == guidProceso);


                Inspeccion inspeccion = new Inspeccion()
                {
                    TipoInspeccionId = tipoInspeccion,
                    Guid = Guid.NewGuid(),
                    NombreUsuarioCrea = "admin",
                    FechaRegistro = DateTime.Now,
                    EstadoId = (int)ESTADOS_INSPECCION.PENDIENTE,
                    Pieza = pieza
                };

                await _context.Inspeccion.AddAsync(inspeccion);
                await _context.SaveChangesAsync();
                inspeccion = await _context.Inspeccion.FirstOrDefaultAsync(c => c.Guid == inspeccion.Guid);



                if (proceso.TipoProcesoId == (int)TIPOPROCESOS.INSPECCIONENTRADAINICIAL || proceso.TipoProcesoId == (int)TIPOPROCESOS.INSPECCIONENTRADA)
                {

                    ProcesoInspeccionEntrada inspeccionEntrada = new ProcesoInspeccionEntrada()
                    {
                        ProcesoId = proceso.Id,
                        InspeccionId = inspeccion.Id
                    };

                    _context.ProcesoInspeccionEntrada.Add(inspeccionEntrada);

                }
                else if (proceso.TipoProcesoId == (int)TIPOPROCESOS.INSPECCIONSALIDA)
                {

                    ProcesoInspeccionSalida procesoInspeccionSalida = new ProcesoInspeccionSalida()
                    {
                        ProcesoId = proceso.Id,
                        InspeccionId = inspeccion.Id
                    };
                    _context.ProcesoInspeccionSalida.Add(procesoInspeccionSalida);


                }


                await _context.SaveChangesAsync();

                return inspeccion.Guid;
            }
            catch (Exception)
            {

                throw;
            }


        }

        public async Task<Guid> CrearProceso(Proceso proceso, UsuarioDTO usuario)
        {
            try
            {

                if (proceso.Id != 0)
                {

                    Proceso procesoBD = _context.Proceso.FirstOrDefault(pro => pro.Id == proceso.Id);

                    _context.Entry(procesoBD).CurrentValues.SetValues(proceso);
                    _context.Entry(proceso).State = EntityState.Detached;
                    _context.Entry(procesoBD).State = EntityState.Detached;
                    Proceso nuevoProceso = AsignarValoresProcesoReasignacion(procesoBD);
                    _context.Proceso.Add(nuevoProceso);


                    proceso.EstadoId = (int)ESTADOSPROCESOS.ASIGNADO;
                    _context.Entry(proceso).Property(d => d.Reasignado).IsModified = true;
                    _context.Update(proceso);

                    await _context.SaveChangesAsync();

                    return nuevoProceso.Guid;
                }



                await _context.Proceso.AddAsync(proceso);

                await _context.SaveChangesAsync();


                if (proceso.InspeccionEntrada.Count() < 1)
                {
                    for (int i = 1; i < proceso.CantidadInspeccion; i++)
                    {
                        await CrearInspeccion(proceso.Guid, 65, i, usuario);
                    }

                }

                return proceso.Guid;
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        private static Proceso AsignarValoresProcesoReasignacion(Proceso proceso)
        {
            Proceso procesoReasignacion = new Proceso()
            {
                TipoProcesoAnteriorId = proceso.TipoProcesoAnteriorId,
                TipoProcesoId = proceso.Reasignado ? proceso.TipoProcesoSiguienteId : proceso.TipoProcesoId,
                Reasignado = proceso.Reasignado,
                Guid = Guid.NewGuid(),
                EstadoId = (int)ESTADOSPROCESOS.PENDIENTE,
                OrdenTrabajoId = proceso.OrdenTrabajoId,
                FechaRegistro = DateTime.Now,
                NombreUsuarioCrea = "admin"
            };
            return procesoReasignacion;
        }

        public async Task<bool> ActualizarProcesoSugerir(Guid guidProceso, Guid guidProcesoSegurido, UsuarioDTO usuarioDTO)
        {
            try
            {

                Catalogo procesoSugerido = await _context.Catalogo.AsNoTracking().FirstOrDefaultAsync(d => d.Guid == guidProcesoSegurido);
                Proceso procesoBD = await _context.Proceso.FirstOrDefaultAsync(d => d.Guid == guidProceso);
                procesoBD.TipoProcesoSiguienteSugeridoId = procesoSugerido.Id;

                _context.Entry(procesoBD).Property(e => e.TipoProcesoSiguienteSugeridoId).IsModified = true;
                bool accionCorrecta = await _context.SaveChangesAsync() > 0;
                return accionCorrecta;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Inspeccion> ConsultarSiguienteInspeccion(Guid guid, int pieza, UsuarioDTO usuarioDTO)
        {
            try
            {

                var query = _context.Proceso.Include(proceso => proceso.InspeccionEntrada).ThenInclude(inspecionEntrada => inspecionEntrada.Inspeccion);
                query.Where(d => d.Guid == guid);
                var queryInspeccionesEntradas = query.SelectMany(t => t.InspeccionEntrada);
                var queryInspecciones = queryInspeccionesEntradas.Select(insEntra => insEntra.Inspeccion).Where(d => d.Pieza == pieza).OrderBy(t => t.FechaRegistro);

                Inspeccion inspecion = await queryInspecciones.Where(e => e.EstadoId == (int)ESTADOS_INSPECCION.ENPROCESO).FirstOrDefaultAsync();

                return inspecion;

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

                var query = _context.Inspeccion.Include(d => d.ProcesoInspeccionEntrada).ThenInclude(t => t.Proceso);
                var procesoInspeccionEntradas = query.SelectMany(p => p.ProcesoInspeccionEntrada.Where(i => i.Proceso.Guid == guid));
                var inpeccion = procesoInspeccionEntradas.Select(t => t.Inspeccion).Where(t => t.Pieza == pieza && (t.EstadoId != (int)ESTADOS_INSPECCION.ANULADA && t.EstadoId != (int)ESTADOS_INSPECCION.COMPLETADA));
                if (inpeccion.Count() > 0)
                {
                    foreach (var item in inpeccion)
                    {
                        item.EstadoId = estado;
                    }

                }



                _context.Inspeccion.UpdateRange(inpeccion);




                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

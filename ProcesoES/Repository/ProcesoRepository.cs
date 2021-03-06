﻿using System;
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
                var proceso = await _context.Proceso.Include(p => p.TipoProceso).FirstOrDefaultAsync(a => a.Guid == guid);
                Int32.TryParse(estado, out int estadoid);
                var estadoProceso = (await _context.Catalogo.FirstOrDefaultAsync(a => (a.Valor == estado || a.Id == estadoid) && a.Grupo == "ESTADOS_PROCESO")) ?? throw new ApplicationException(CanonicalConstants.Excepciones.EstadoSolicitudNoEncontrado);


                if (proceso.TipoProceso.Valor == "Reasignacion" && estadoProceso.Id == (int)ESTADOSPROCESOS.PROCESADO)
                {
                    proceso.Reasignado = true;
                }
                else
                {
                    await CrearProcesoCoodinador(usuarioDTO, proceso, estadoProceso);
                }

                proceso.EstadoId = estadoProceso.Id;
                proceso.FechaModifica = DateTime.Now;
                _context.Entry(proceso).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception e) { throw e; }
        }

        private async Task CrearProcesoCoodinador(UsuarioDTO usuarioDTO, Proceso proceso, Catalogo estadoProceso)
        {
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
                    if (t.EstadoId == 0)
                    {


                        _context.Entry(t).Property(d => d.EstadoId).CurrentValue = null;


                    }

                    if (t.TipoConexionId == 0)
                    {


                        _context.Entry(t).Property(d => d.TipoConexionId).CurrentValue = null;


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
                            .Include(c => c.ProcesoInspeccion).ThenInclude(d => d.Inspeccion).ThenInclude(e => e.InspeccionEquipoUtilizado).ThenInclude(e => e.EquipoUtilizado)
                            .Include(c => c.ProcesoInspeccion).ThenInclude(d => d.Inspeccion).ThenInclude(c => c.InspeccionFotos).ThenInclude(d => d.DocumentoAdjunto)
                            .Include(d => d.ProcesoInspeccion).ThenInclude(c => c.Inspeccion.ImagenMedicionEspesores)
                            .Include(d => d.ProcesoInspeccion).ThenInclude(c => c.Inspeccion.Dimensionales)
                            .Include(d => d.ProcesoInspeccion).ThenInclude(c => c.Inspeccion.ImagenMfl)
                            .Include(d => d.ProcesoInspeccion).ThenInclude(c => c.Inspeccion).ThenInclude(d => d.Conexiones).ThenInclude(c => c.InspeccionConexionFormato).ThenInclude(d => d.InspeccionConexionFormatoParametros).ThenInclude(t => t.FormatoParametro)
                            .Include(d => d.ProcesoInspeccion).ThenInclude(c => c.Inspeccion).ThenInclude(d => d.Conexiones).ThenInclude(c => c.InspeccionConexionFormato).ThenInclude(d => d.InspeccionConexionFormatoAdendum).ThenInclude(t => t.FormatoAdendum)

                            .Include(d => d.ProcesoInspeccion).ThenInclude(c => c.Inspeccion.Insumos)
                            .Include(c => c.OrdenTrabajo.Herramienta)
                            .Include(c => c.OrdenTrabajo.TamanoHerramienta)
                            .Include(c => c.OrdenTrabajo.Material).ThenInclude(m => m.Material)
                            .Include(c => c.OrdenTrabajo.Cliente)
                            .Include(c => c.OrdenTrabajo.Linea)
                            .Include(c => c.InspeccionConexionFormato).ThenInclude(t => t.FormatoAdjunto)
                            .Include(c => c.OrdenTrabajo.Responsable)
                            .Include(c => c.OrdenTrabajo.Anexos)
                            .Include(c => c.TipoProcesoSiguienteSugerido)
                            .Include(c => c.ProcesoRealizar).ThenInclude(c => c.TipoProceso)
                            .Include(c => c.ProcesoEquipoMedicion)
                            .Include(c => c.TipoProcesoAnterior)
                            .Include(c => c.DetalleSoldadura);



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

                List<Proceso> procesos = new List<Proceso>();

                if (tipoProceso == (int)TIPOPROCESOS.REASIGNACION)
                {
                    var result = query.Where(c => c.TipoProcesoId == tipoProceso && c.EstadoId != (int)ESTADOSPROCESOS.ASIGNADO).OrderBy(d => d.TipoProcesoId == tipoProceso).OrderByDescending(c => c.FechaRegistro)
                        .Skip(paginacion.RegistrosOmitir())
                                        .Take(paginacion.CantidadRegistros);


                    await result.ForEachAsync(async c => c.ProcesoAnterior = await ConsultarProcesoPorId(c.Id, usuarioDTO));
                    procesos = result.ToList();
                }
                else
                {
                    var result = query.Where(c => c.TipoProcesoId == tipoProceso).OrderBy(d => d.TipoProcesoId == tipoProceso).OrderByDescending(c => c.FechaRegistro)
                    .Skip(paginacion.RegistrosOmitir())
                                    .Take(paginacion.CantidadRegistros);
                    await result.ForEachAsync(async c => c.ProcesoAnterior = await ConsultarProcesoPorId(c.Id, usuarioDTO));
                    procesos = result.ToList();
                }






                var cantidad = await _context.Proceso.CountAsync();
                return new Tuple<int, IEnumerable<Proceso>>(cantidad, procesos);
            }
            catch (Exception e) { throw e; }
        }

        public async Task<Tuple<int, IEnumerable<Proceso>>> ConsultarProcesosPorTipoPorFiltro(ParametrosProcesosoDTO parametrosDTO, UsuarioDTO usuarioDTO)
        {
            try
            {
                var query = _context.Proceso
                        .Include(proceso => proceso.TipoProceso)
                        .Include(proceso => proceso.OrdenTrabajo.Herramienta)
                        .Include(proceso => proceso.OrdenTrabajo.Cliente)
                        .Include(proceso => proceso.Estado)
                        .Include(proceso => proceso.TipoProcesoAnterior)
                        .Include(proceso => proceso.OrdenTrabajo.Prioridad)
                        .Where(c =>
                                    (string.IsNullOrEmpty(parametrosDTO.TipoProceso) || c.TipoProceso.Valor == parametrosDTO.TipoProceso) &&
                                    (string.IsNullOrEmpty(parametrosDTO.HerraminetaNombre) || c.OrdenTrabajo.Herramienta.Nombre.ToLower().Contains(parametrosDTO.HerraminetaNombre.ToLower())) &&
                                    (string.IsNullOrEmpty(parametrosDTO.OrdenTrabajoPrioridad) || c.OrdenTrabajo.Prioridad.Valor == parametrosDTO.OrdenTrabajoPrioridad) &&
                                    (string.IsNullOrEmpty(parametrosDTO.Estado) || c.Estado.Valor.ToLower().Contains(parametrosDTO.Estado.ToLower())) &&
                                    (string.IsNullOrEmpty(parametrosDTO.NumeroOIT) || c.OrdenTrabajoId.ToString().Contains(parametrosDTO.NumeroOIT)) &&
                                    (string.IsNullOrEmpty(parametrosDTO.Fecha) || c.FechaRegistro.ToString().Contains(parametrosDTO.Fecha)) &&
                                    (string.IsNullOrEmpty(parametrosDTO.SerialHerramienta) || c.OrdenTrabajo.SerialHerramienta.ToString().Contains(parametrosDTO.SerialHerramienta)) &&
                                    (string.IsNullOrEmpty(parametrosDTO.ClienteNickname) || c.OrdenTrabajo.Cliente.NickName.ToLower().Contains(parametrosDTO.ClienteNickname.ToLower())));




                var result = query.Skip(parametrosDTO.RegistrosOmitir())
                    .Take(parametrosDTO.CantidadRegistros);

                await result.ForEachAsync(async c => c.ProcesoAnterior = await ConsultarProcesoPorId(c.Id, usuarioDTO));
                var cantidad = await _context.Proceso.CountAsync();
                return new Tuple<int, IEnumerable<Proceso>>(cantidad, result);
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
                var proceso = await _context.Proceso
                    .Include(c => c.ProcesoInspeccion)
                    .Include(c => c.ProcesoInspeccion)
                    .Include(c => c.OrdenTrabajo)
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

                    ProcesoInspeccion inspeccionEntrada = new ProcesoInspeccion()
                    {
                        ProcesoId = proceso.Id,
                        InspeccionId = inspeccion.Id
                    };

                    _context.ProcesoInspeccion.Add(inspeccionEntrada);

                }
                else if (proceso.TipoProcesoId == (int)TIPOPROCESOS.INSPECCIONSALIDA)
                {


                    ProcesoInspeccion ProcesoInspeccion = new ProcesoInspeccion()
                    {
                        ProcesoId = proceso.Id,
                        InspeccionId = inspeccion.Id
                    };
                    _context.ProcesoInspeccion.Add(ProcesoInspeccion);


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
                    var procesoAnterior = _context.Proceso.FirstOrDefault(d => d.Id == proceso.ProcesoAnteriorId);

                    Proceso nuevoProceso = AsignarValoresProcesoReasignacion(procesoBD);
                    nuevoProceso.CantidadInspeccion = procesoAnterior.CantidadInspeccion;
                    await CrearProceso(nuevoProceso, usuario);


                    proceso.EstadoId = (int)ESTADOSPROCESOS.ASIGNADO;
                    proceso.FechaFinalizacion = DateTime.Now;
                    _context.Entry(proceso).Property(d => d.Reasignado).IsModified = true;
                    _context.Update(proceso);

                    await _context.SaveChangesAsync();


        


                    return nuevoProceso.Guid;
                }


                proceso.TipoProcesoId = proceso.TipoProcesoId;

                await _context.Proceso.AddAsync(proceso);
                await _context.SaveChangesAsync();

                await CrearInspeccionInicial(proceso, usuario);


                await AsignarValoresProcesosRelacionados(proceso, usuario);
                proceso.EstadoId = proceso.EstadoId ?? (int)ESTADOSPROCESOS.PENDIENTE;

                proceso.Guid = Guid.NewGuid();
                proceso.NombreUsuarioCrea = usuario.Nombre;
                proceso.FechaRegistro = DateTime.Now;

                return proceso.Guid;
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        private async Task AsignarValoresProcesosRelacionados(Proceso proceso, UsuarioDTO usuario)
        {
            bool persistir = false;
            var ordentrabajo = _context.OrdenTrabajo.FirstOrDefault(t => t.Id == proceso.OrdenTrabajoId);
            var lista = new List<ProcesoInspeccion>();
            var listaConexiones = new List<InspeccionConexion>();
            if ((proceso.ProcesoInspeccion == null || proceso.ProcesoInspeccion.Count() == 0) && proceso.TipoProcesoId == (int)TIPOPROCESOS.INSPECCIONSALIDA)
            {
                proceso.ProcesoInspeccion = new List<ProcesoInspeccion>();
                var procesoMecanizado = await ConsultarProcesoPorTipoYOrdenTrabajo((int)TIPOPROCESOS.MECANIZADOTORNO, ordentrabajo.Guid, usuario);
                if (procesoMecanizado != null)
                {
                    foreach (var inspeccion in procesoMecanizado.ProcesoInspeccion)
                    {
                        _context.Entry(inspeccion).State = EntityState.Detached;

                        var procesoInspeccion = new ProcesoInspeccion
                        {
                            Inspeccion = inspeccion.Inspeccion,
                            ProcesoId = proceso.Id
                        };

                        lista.Add(procesoInspeccion);
                        persistir = true;
                    }


                }


                var ProcesoInspeccionEntrada = await ConsultarProcesoPorTipoYOrdenTrabajo((int)TIPOPROCESOS.INSPECCIONENTRADA, proceso.OrdenTrabajo.Guid, usuario);
                if (ProcesoInspeccionEntrada != null)
                {

                    foreach (var inspeccion in ProcesoInspeccionEntrada.ProcesoInspeccion)
                    {
                        _context.Entry(inspeccion).State = EntityState.Detached;

                        var procesoInspeccion = new ProcesoInspeccion
                        {
                            Inspeccion = inspeccion.Inspeccion,
                            ProcesoId = proceso.Id
                        };

                        lista.Add(procesoInspeccion);
                        persistir = true;
                    }


                }

            }
            if ((proceso.ProcesoInspeccion == null || proceso.ProcesoInspeccion.Count() == 0) && proceso.TipoProcesoId == (int)TIPOPROCESOS.MECANIZADOTORNO)
            {

                proceso.ProcesoInspeccion = new List<ProcesoInspeccion>();

                var ProcesoInspeccionEntrada = await ConsultarProcesoPorTipoYOrdenTrabajo((int)TIPOPROCESOS.INSPECCIONENTRADA, ordentrabajo.Guid, usuario);
                if (ProcesoInspeccionEntrada != null)
                {
                    foreach (var inspeccion in ProcesoInspeccionEntrada.ProcesoInspeccion)
                    {
                        _context.Entry(inspeccion).State = EntityState.Detached;
                        _context.Entry(inspeccion.Inspeccion).State = EntityState.Detached;
                        listaConexiones = inspeccion.Inspeccion.Conexiones.ToList();
                        var procesoInspeccion = new ProcesoInspeccion
                        {
                            Inspeccion = inspeccion.Inspeccion,
                            ProcesoId = proceso.Id,

                        };

                        lista.Add(procesoInspeccion);
                        persistir = true;
                    }


                }
            }
            if (persistir)
            {

                if (proceso.ProcesoInspeccion != null)
                {
                    foreach (var inspeccion in lista)
                    {
                        _context.Entry(inspeccion.Inspeccion).State = EntityState.Detached;
                        //_context.Entry(inspeccion.Inspeccion).Property(t => t.Id).IsModified = false;
                        inspeccion.Inspeccion.Id = 0;
                        _context.Entry(inspeccion.Inspeccion).State = EntityState.Added;

                        if (inspeccion != null)
                        {
                            if (inspeccion.Inspeccion.Conexiones != null)

                            {
                                foreach (var conexion in inspeccion.Inspeccion.Conexiones)
                                {


                                    _context.Entry(conexion).State = EntityState.Detached;
                                    //_context.Entry(conexion).Property(t => t.Id).IsModified = false;
                                    conexion.Id = 0;
                                    conexion.InspeccionId = inspeccion.InspeccionId;


                                    _context.Entry(conexion).State = EntityState.Added;

                                }
                            }
                            if (inspeccion.Inspeccion.Dimensionales != null)
                            {
                                foreach (var dimensional in inspeccion.Inspeccion.Dimensionales)
                                {

                                    _context.Entry(dimensional).State = EntityState.Detached;
                                    //_context.Entry(dimensional).Property(t => t.Id).IsModified = false;
                                    dimensional.InspeccionId = inspeccion.InspeccionId;
                                    dimensional.Id = 0;
                                    _context.Entry(dimensional).State = EntityState.Added;


                                }
                            }

                        }

                        _context.Entry(inspeccion).State = EntityState.Added;
                        _context.SaveChanges();

                    }



                }
            }
            var cantidadCambios = _context.SaveChanges();
        }
        //TODO: verificar la inspeccion de entrada cuando se va a crear
        private async Task CrearInspeccionInicial(Proceso proceso, UsuarioDTO usuario)
        {
            if (proceso.ProcesoInspeccion == null && proceso.TipoProcesoId == (int)TIPOPROCESOS.INSPECCIONENTRADA)
            {
                proceso.ProcesoInspeccion = new List<ProcesoInspeccion>();
                for (int i = 1; i <= proceso.CantidadInspeccion; i++)
                {
                    await CrearInspeccion(proceso.Guid, (int)TIPOS_INSPECCIONES.VISUALDIMENSIONAL, i, usuario);
                }

            }
        }

        private static Proceso AsignarValoresProcesoReasignacion(Proceso proceso)
        {

            if (proceso.Reasignado == false)
            {
                Proceso procesoReasignacionRehazado = new Proceso()
                {
                    TipoProcesoAnteriorId = proceso.TipoProcesoId,
                    TipoProcesoId = proceso.TipoProcesoAnteriorId,
                    Reasignado = proceso.Reasignado,
                    CantidadInspeccion = proceso.CantidadInspeccion,
                    Guid = Guid.NewGuid(),
                    EstadoId = (int)ESTADOSPROCESOS.PENDIENTE,
                    OrdenTrabajoId = proceso.OrdenTrabajoId,
                    FechaRegistro = DateTime.Now,
                    NombreUsuarioCrea = "admin"
                };
                return procesoReasignacionRehazado;

            }

            Proceso procesoReasignacion = new Proceso()
            {
                TipoProcesoAnteriorId = proceso.TipoProcesoAnteriorId,
                TipoProcesoId = proceso.TipoProcesoSiguienteId,

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
                Inspeccion inspecion = null;
                var query = _context.Proceso.Include(proceso => proceso.ProcesoInspeccion).ThenInclude(inspecionEntrada => inspecionEntrada.Inspeccion)
                    .Include(proceso => proceso.ProcesoInspeccion).ThenInclude(procesoInspeccionSalida => procesoInspeccionSalida.Inspeccion);
                var procesoBD = query.FirstOrDefault(d => d.Guid == guid);
                if (procesoBD.TipoProcesoId == (int)TIPOPROCESOS.INSPECCIONENTRADA)
                {
                    var queryInspeccionesEntradas = query.SelectMany(t => t.ProcesoInspeccion).Where(d => d.Proceso.Guid == guid);
                    var queryInspecciones = queryInspeccionesEntradas.Select(insEntra => insEntra.Inspeccion).Where(d => d.Pieza == pieza).OrderBy(t => t.FechaRegistro);
                    inspecion = await queryInspecciones.Where(e => e.EstadoId == (int)ESTADOS_INSPECCION.ENPROCESO).FirstOrDefaultAsync();

                }
                else if (procesoBD.TipoProcesoId == (int)TIPOPROCESOS.INSPECCIONSALIDA)
                {
                    var queryProcesoInspeccionSalida = query.SelectMany(t => t.ProcesoInspeccion).Where(d => d.Proceso.Guid == guid);
                    var queryInspecciones = queryProcesoInspeccionSalida.Select(insEntra => insEntra.Inspeccion).Where(d => d.Pieza == pieza).OrderBy(t => t.FechaRegistro);
                    inspecion = await queryInspecciones.Where(e => e.EstadoId == (int)ESTADOS_INSPECCION.ENPROCESO).FirstOrDefaultAsync();
                }


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


                var query = _context.Inspeccion.Include(d => d.ProcesoInspeccion).ThenInclude(t => t.Proceso);
                var proceso = _context.Proceso.FirstOrDefault(d => d.Guid == guid);
                if (proceso.TipoProcesoId == (int)TIPOPROCESOS.INSPECCIONENTRADA)
                {
                    var procesoInspeccionEntradas = query.SelectMany(p => p.ProcesoInspeccion.Where(i => i.Proceso.Guid == guid));
                    var inpeccion = procesoInspeccionEntradas.Select(t => t.Inspeccion).Where(t => t.Pieza == pieza && (t.EstadoId != (int)ESTADOS_INSPECCION.ANULADA && t.EstadoId != (int)ESTADOS_INSPECCION.COMPLETADA));
                    if (inpeccion.Count() > 0)
                    {
                        foreach (var item in inpeccion)
                        {
                            item.EstadoId = estado;
                        }

                    }
                    _context.Inspeccion.UpdateRange(inpeccion);

                }
                else if (proceso.TipoProcesoId == (int)TIPOPROCESOS.INSPECCIONSALIDA)
                {

                    var procesoInspeccionSalida = query.SelectMany(p => p.ProcesoInspeccion.Where(i => i.Proceso.Guid == guid));
                    var inpeccion = procesoInspeccionSalida.Select(t => t.Inspeccion).Where(t => t.Pieza == pieza && (t.EstadoId != (int)ESTADOS_INSPECCION.ANULADA && t.EstadoId != (int)ESTADOS_INSPECCION.COMPLETADA));
                    if (inpeccion.Count() > 0)
                    {
                        foreach (var item in inpeccion)
                        {
                            item.EstadoId = estado;
                        }

                    }
                    _context.Inspeccion.UpdateRange(inpeccion);

                }









                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Proceso> ConsultarProcesoPorTipoYOrdenTrabajo(int tipoProceso, Guid guidOrdenTrabajo, UsuarioDTO usuarioDTO)
        {
            try
            {
                IQueryable query = _context.Proceso;
                string nombreProceso = "";
                switch (tipoProceso)
                {
                    case (int)TIPOPROCESOS.INSPECCIONENTRADA:
                        nombreProceso = "Inspeccion entrada";
                        query = _context.Proceso
                        .Include(proceso => proceso.OrdenTrabajo)
                        .Include(proceso => proceso.ProcesoInspeccion).ThenInclude(d => d.Inspeccion).ThenInclude(d => d.Dimensionales)
                        .Include(proceso => proceso.ProcesoInspeccion).ThenInclude(d => d.Inspeccion).ThenInclude(d => d.Conexiones).ThenInclude(d => d.InspeccionConexionFormato).ThenInclude(t => t.ConexionEquipoMedicionUsado).ThenInclude(f => f.EquipoMedicion)
                        .Include(proceso => proceso.ProcesoInspeccion).ThenInclude(d => d.Inspeccion).ThenInclude(d => d.Conexiones).ThenInclude(d => d.InspeccionConexionFormato).ThenInclude(t => t.InspeccionConexionFormatoAdendum).ThenInclude(f => f.FormatoAdendum)
                        .Include(proceso => proceso.ProcesoInspeccion).ThenInclude(d => d.Inspeccion).ThenInclude(d => d.Conexiones).ThenInclude(d => d.InspeccionConexionFormato).ThenInclude(t => t.InspeccionConexionFormatoParametros).ThenInclude(f => f.FormatoParametro);

                        break;
                    case (int)TIPOPROCESOS.MECANIZADOTORNO:
                        nombreProceso = "Mecanizado torno";
                        query = _context.Proceso
                           .Include(proceso => proceso.OrdenTrabajo)
                           .Include(proceso => proceso.InspeccionConexionFormato)
                           .Include(proceso => proceso.ProcesoInspeccion).ThenInclude(d => d.Inspeccion).ThenInclude(d => d.Conexiones).ThenInclude(d => d.InspeccionConexionFormato).ThenInclude(t => t.ConexionEquipoMedicionUsado).ThenInclude(f => f.EquipoMedicion)
                           .Include(proceso => proceso.ProcesoInspeccion).ThenInclude(d => d.Inspeccion).ThenInclude(d => d.Conexiones).ThenInclude(d => d.InspeccionConexionFormato).ThenInclude(t => t.InspeccionConexionFormatoAdendum).ThenInclude(f => f.FormatoAdendum)
                           .Include(proceso => proceso.ProcesoInspeccion).ThenInclude(d => d.Inspeccion).ThenInclude(d => d.Conexiones).ThenInclude(d => d.InspeccionConexionFormato).ThenInclude(t => t.InspeccionConexionFormatoParametros).ThenInclude(f => f.FormatoParametro);
                        break;
                    default:
                        break;
                }

                var procesos = query.Cast<Proceso>().Where(proceso => proceso.OrdenTrabajo.Guid == guidOrdenTrabajo && proceso.TipoProcesoId == tipoProceso);

                var ordenadosPorultimaCreacion = procesos.OrderBy(t => t.FechaRegistro);

                Proceso procesoResult = await ordenadosPorultimaCreacion.FirstOrDefaultAsync();
                if (procesoResult == null)
                {
                    throw new Exception("No se ha realizado el proceso " + nombreProceso);
                }

                return procesoResult;

                throw new NotImplementedException();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> RechazarProceso(Guid guid, string observacion, UsuarioDTO usuarioDTO)
        {
            try
            {
                Proceso procesoAsignacionBd = await _context.Proceso.Where(d => d.Guid == guid).FirstOrDefaultAsync();
                _context.Entry(procesoAsignacionBd).Property(d => d.EstadoId).CurrentValue = (int)ESTADOSPROCESOS.PROCESADO;
                _context.Entry(procesoAsignacionBd).Property(d => d.ObservacionRechazo).CurrentValue = observacion;
                _context.Entry(procesoAsignacionBd).Property(d => d.Reasignado).CurrentValue = true;


                Proceso procesoAnteriorBd = await _context.Proceso.Where(d => d.Id == procesoAsignacionBd.ProcesoAnteriorId).FirstOrDefaultAsync();
                _context.Entry(procesoAnteriorBd).Property(d => d.ObservacionRechazo).CurrentValue = observacion;
                _context.Entry(procesoAnteriorBd).Property(d => d.EstadoId).CurrentValue = (int)ESTADOSPROCESOS.RECHAZADO;
                _context.Entry(procesoAnteriorBd).Property(d => d.FechaFinalizacion).CurrentValue = DateTime.Now;
                _context.Entry(procesoAnteriorBd).Property(d => d.Reasignado).CurrentValue = false;

                Proceso nuevoProceso = new Proceso
                {
                    TipoProcesoId = procesoAnteriorBd.TipoProcesoId,
                    TipoProcesoAnteriorId = procesoAnteriorBd.TipoProcesoId,
                    ObservacionRechazo = observacion,
                    CantidadInspeccion = procesoAnteriorBd.CantidadInspeccion,
                    OrdenTrabajoId = procesoAnteriorBd.OrdenTrabajoId,
                    EstadoId = (int)ESTADOSPROCESOS.RECHAZADO,
                    ProcesoAnteriorId = procesoAnteriorBd.Id
                };


                Guid guidProceso = await CrearProceso(nuevoProceso, usuarioDTO);
                return guidProceso != null;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<IEnumerable<Guid>> CrearInspeccionConexiones(IEnumerable<InspeccionConexion> inspeccionesConexiones, UsuarioDTO usuarioDTO)
        {
            try
            {
                await _context.InspeccionConexion.AddRangeAsync(inspeccionesConexiones);
                List<Guid> guidsResult = inspeccionesConexiones.Select(d => d.Guid).ToList();
                return guidsResult;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> ActualizarInspeccionConexiones(IEnumerable<InspeccionConexion> inspeccionesConexiones, UsuarioDTO usuarioDTO)
        {
            try
            {
                foreach (var insConexion in inspeccionesConexiones)
                {
                    if (insConexion.Id > 0)
                    {
                        _context.Entry(insConexion).State = EntityState.Modified;
                        if (insConexion.InspeccionConexionFormato != null)
                        {
                            if (insConexion.InspeccionConexionFormato.Id > 0)
                            {
                                _context.Entry(insConexion.InspeccionConexionFormato)
                                    .State = EntityState.Modified;
                                foreach (var adendum in insConexion.InspeccionConexionFormato.InspeccionConexionFormatoAdendum)
                                {

                                    _context.Entry(adendum.FormatoAdendum).State = EntityState.Modified;
                                    _context.Entry(adendum).State = EntityState.Modified;


                                }

                                foreach (var parame in insConexion.InspeccionConexionFormato.InspeccionConexionFormatoParametros)
                                {

                                    _context.Entry(parame.FormatoParametro).State = EntityState.Modified;
                                    _context.Entry(parame).State = EntityState.Modified;
                                }

                                foreach (var ConexionEquipoMedicionUsado in insConexion.InspeccionConexionFormato.ConexionEquipoMedicionUsado)
                                {
                                    if (ConexionEquipoMedicionUsado.InspeccionConexionFormatoId > 0 || ConexionEquipoMedicionUsado.InspeccionConexionFormatoId != null)
                                    {
                                        _context.Entry(ConexionEquipoMedicionUsado).State = EntityState.Modified;
                                    }
                                    else
                                    {

                                        ConexionEquipoMedicionUsado.InspeccionConexionFormatoId = insConexion.InspeccionConexionFormato.Id;
                                        _context.Entry(ConexionEquipoMedicionUsado).State = EntityState.Added;
                                    }
                                }


                            }
                            else
                            {
                                _context.Entry(insConexion.InspeccionConexionFormato)
                                .State = EntityState.Added;
                                foreach (var adendum in insConexion.InspeccionConexionFormato.InspeccionConexionFormatoAdendum)
                                {
                                    adendum.FormatoAdendum.Id = 0;
                                    _context.Entry(adendum.FormatoAdendum).State = EntityState.Added;
                                    _context.Entry(adendum).State = EntityState.Added;


                                }

                                foreach (var parame in insConexion.InspeccionConexionFormato.InspeccionConexionFormatoParametros)
                                {
                                    parame.FormatoParametro.Id = 0;
                                    _context.Entry(parame.FormatoParametro).State = EntityState.Added;
                                    _context.Entry(parame).State = EntityState.Added;
                                }
                                if (insConexion.InspeccionConexionFormato.ConexionEquipoMedicionUsado != null)
                                {
                                    foreach (var ConexionEquipoMedicionUsado in insConexion.InspeccionConexionFormato.ConexionEquipoMedicionUsado)
                                    {
                                        if (ConexionEquipoMedicionUsado.EquipoMedicionId != null)
                                        {
                                            _context.Entry(ConexionEquipoMedicionUsado).State = EntityState.Added;
                                            _context.Entry(ConexionEquipoMedicionUsado).State = EntityState.Added;

                                        }
                                    }
                                }


                            }

                        }

                    }
                    else
                    {
                        insConexion.NombreUsuarioCrea = "admin";
                        insConexion.FechaRegistro = DateTime.Now;
                        insConexion.Guid = Guid.NewGuid();
                        insConexion.GuidOrganizacion = Guid.NewGuid();

                        _context.Entry(insConexion).Property(t => t.TipoConexionId).IsModified = false;
                        _context.Entry(insConexion).Property(t => t.ConexionId).IsModified = false;
                        _context.Entry(insConexion).Property(t => t.EstadoId).IsModified = false;

                        _context.Entry(insConexion).State = EntityState.Added;
                    }
                }
                //_context.InspeccionConexion.UpdateRange(inspeccionesConexiones);

                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> ActualizarProceso(Proceso proceso, UsuarioDTO usuarioDTO)
        {
            try
            {


                if (proceso.InspeccionConexionFormato != null)
                {

                    _context.Entry(proceso.InspeccionConexionFormato).State = proceso.InspeccionConexionFormato.Id > 0 ? EntityState.Modified : EntityState.Added;
                    await _context.SaveChangesAsync();

                }


                if (proceso.ProcesoInspeccion != null)
                {
                    foreach (var ProcesoInspeccion in proceso.ProcesoInspeccion)
                    {
                        if (ProcesoInspeccion.InspeccionId > 0 && ProcesoInspeccion.ProcesoId > 0)
                        {
                            _context.Entry(ProcesoInspeccion).State = EntityState.Modified;
                        }
                        else
                        {
                            foreach (var conexion in ProcesoInspeccion.Inspeccion.Conexiones)
                            {
                                conexion.Id = 0;
                                if (conexion.InspeccionConexionFormato != null)
                                {
                                    _context.Entry(conexion.InspeccionConexionFormato).State = EntityState.Added;

                                }
                                _context.Entry(conexion).State = EntityState.Added;
                            }
                            ProcesoInspeccion.Inspeccion.NombreUsuarioCrea = usuarioDTO.Nombre;
                            ProcesoInspeccion.Inspeccion.GuidOrganizacion = usuarioDTO.GuidOrganizacion;



                            _context.Entry(ProcesoInspeccion.Inspeccion).State = EntityState.Added;

                            _context.Entry(ProcesoInspeccion).State = EntityState.Added;

                        }
                    }


                    await _context.SaveChangesAsync();
                }

                if (proceso.ProcesoRealizar != null)
                {
                    if (proceso.ProcesoRealizar.Any())
                    {
                        foreach (var item in proceso.ProcesoRealizar)
                        {
                            var actualizarProceso = _context.ProcesoRealizar.Where(p => p.ProcesoId == item.ProcesoId && p.TipoProcesoId == item.TipoProcesoId).Count();

                            if (actualizarProceso > 0)
                            {
                                _context.Entry(item).State = EntityState.Modified;
                                await _context.SaveChangesAsync();
                            }
                            else
                            {
                                await _context.ProcesoRealizar.AddAsync(item);
                                await _context.SaveChangesAsync();
                            }

                        }
                    }
                }

                if (proceso.ProcesoRealizar != null)
                {

                    if (proceso.ProcesoEquipoMedicion.Any() || proceso.EquipoMedicionUtilizado != null)
                    {
                        foreach (var item in proceso.ProcesoEquipoMedicion)
                        {

                            var actualizarProcesoInsp = _context.ProcesoEquipoMedicion.Where(p => p.ProcesoId == item.ProcesoId && p.IdEquipoMedicion == item.IdEquipoMedicion).Count();

                            if (actualizarProcesoInsp > 0)
                            {
                                _context.Entry(item).State = EntityState.Modified;
                                await _context.SaveChangesAsync();
                            }
                            else
                            {
                                await _context.ProcesoEquipoMedicion.AddAsync(item);
                                await _context.SaveChangesAsync();
                            }
                        }
                    }
                }
                _context.Entry(proceso).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Guid> CrearDetalleSoldadura(DetalleSoldadura detalleSoldadura, UsuarioDTO usuario)
        {
            try
            {
                detalleSoldadura.Guid = Guid.NewGuid();
                detalleSoldadura.FechaRegistro = DateTime.Now;
                detalleSoldadura.NombreUsuarioCrea = "admin";

                _context.DetalleSoldadura.Add(detalleSoldadura);
                await _context.SaveChangesAsync();
                return detalleSoldadura.Guid;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<DetalleSoldadura> ConsultarDetalleSoldaduraPorGuid(Guid guidDetalleSoldadura, UsuarioDTO usuarioDTO)
        {
            try
            {
                var result = await _context.DetalleSoldadura.Where(ds => ds.Guid == guidDetalleSoldadura).FirstOrDefaultAsync();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }


    }
}

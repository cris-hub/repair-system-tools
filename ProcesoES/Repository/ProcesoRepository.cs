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

                var estadoId = (await _context.Catalogo.FirstOrDefaultAsync(a => a.Valor == estado && a.Grupo == "ESTADOS_PROCESO"))?.Id;

                proceso.EstadoId = estadoId
                    ?? throw new ApplicationException(CanonicalConstants.Excepciones.EstadoSolicitudNoEncontrado);
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

                foreach (var t in inspeccion.InspeccionEquipoUtilizado)
                {
                    var catalogo = await _context.Catalogo.SingleOrDefaultAsync(d => d.Id == t.EquipoUtilizadoId);
                    _context.Entry(catalogo).State = EntityState.Unchanged;
                }

                foreach (var t in inspeccion.Insumos)
                {
                    _context.Entry(t).State = t.Id == 0 ?
                            EntityState.Added :
                            EntityState.Modified;
                    var catalogo = await _context.Catalogo.SingleOrDefaultAsync(d => d.Id == t.TipoInsumoId);
                    _context.Entry(catalogo).State = EntityState.Unchanged;
                }
                //_context.InspeccionInsumo.UpdateRange(inspeccion.Insumos);


                foreach (var t in inspeccion.Dimensionales)
                {
                    _context.Entry(t).State = t.Id == 0 ?
                            EntityState.Added :
                            EntityState.Modified;
                }
                //_context.InspeccionDimensionalOtro.UpdateRange(inspeccion.Dimensionales);


                foreach (var t in inspeccion.Conexiones)
                {
                    if (t.EstadoId != 0)
                    {

                        var catalogo = await _context.Catalogo.SingleOrDefaultAsync(d => d.Id == t.EstadoId);
                        _context.Entry(catalogo).State = EntityState.Unchanged;
                    }
                    _context.Entry(t).State = t.Id == 0 ?
                                        EntityState.Added :
                                        EntityState.Modified;

                }
                //_context.InspeccionConexion.UpdateRange(inspeccion.Conexiones);



                //_context.InspeccionEquipoUtilizado.UpdateRange(inspeccion.InspeccionEquipoUtilizado);


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
                    if (t.Id == 0)
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
                    if (t.Id == 0)
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
                    if (t.Id == 0)
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
                    if (t.Id == 0)
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
                var proceso = _context.Proceso
                            .Include(c => c.InspeccionEntrada)
                            .ThenInclude(d => d.Inspeccion)
                            .ThenInclude(e => e.InspeccionEquipoUtilizado)
                            .ThenInclude(e => e.EquipoUtilizado)
                            .Include(c => c.InspeccionEntrada)
                            .ThenInclude(d => d.Inspeccion)
                            .ThenInclude(c => c.InspeccionFotos)
                            .ThenInclude(d => d.DocumentoAdjunto)
                            .Include(d => d.InspeccionEntrada).ThenInclude(c => c.Inspeccion.ImagenMedicionEspesores)
                            .Include(d => d.InspeccionEntrada).ThenInclude(c => c.Inspeccion.Dimensionales)
                            .Include(d => d.InspeccionEntrada).ThenInclude(c => c.Inspeccion.ImagenMfl)
                            .Include(d => d.InspeccionEntrada).ThenInclude(c => c.Inspeccion.Conexiones)
                            .Include(d => d.InspeccionEntrada).ThenInclude(c => c.Inspeccion.Insumos)
                            .Include(c => c.ProcesoInspeccionSalida).ThenInclude(d => d.Inspeccion)
                            .Include(c => c.OrdenTrabajo.Herramienta)
                            .Include(c => c.OrdenTrabajo.Cliente)
                            .Include(c => c.OrdenTrabajo.Anexos);




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
                    FechaRegistro = new DateTime(),
                    EstadoId = (int)ESTADOS_INSPECCION.ENPROCESO,
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
                proceso.Guid = Guid.NewGuid();
                proceso.NombreUsuarioCrea = "admin";
                proceso.FechaRegistro = new DateTime();
                await _context.Proceso.AddAsync(proceso);
                await _context.SaveChangesAsync();

                return proceso.Guid;
            }
            catch (Exception e)
            {

                throw e;
            }

        }
    }
}

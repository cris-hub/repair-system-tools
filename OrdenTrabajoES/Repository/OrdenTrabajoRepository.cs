using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;


namespace OrdenTrabajoES.Repository
{
    public class OrdenTrabajoRepository : IOrdenTrabajoRepository
    {
        private readonly PemarsaContext _context;

        public OrdenTrabajoRepository(DbContext context)
        {
            _context = (PemarsaContext)context;
        }

        public async Task<bool> ActualizarEstadoOrdenDeTrabajo(Guid guid, string estado, UsuarioDTO usuario)
        {
            try
            {
                var oit = await _context.OrdenTrabajo.FirstOrDefaultAsync(a => a.Guid == guid);

                var estadoId = (await _context.Catalogo
                                .FirstOrDefaultAsync(a => a.Valor == estado && a.Grupo == "ESTADOS_ORDENTRABAJO"))?.Id;

                oit.EstadoId = estadoId
                    ?? throw new ApplicationException(CanonicalConstants.Excepciones.EstadoSolicitudNoEncontrado);
                oit.FechaModifica = DateTime.Now;
                _context.OrdenTrabajo.Add(oit);
                _context.Entry(oit).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> ActualizarEstadoSolicitudDeTrabajo(Guid guidSolicitudOrdenTrabajo, string estado, UsuarioDTO usuario)
        {
            try
            {
                var oit = await _context.SolicitudOrdenTrabajo.FirstOrDefaultAsync(a => a.Guid == guidSolicitudOrdenTrabajo);

                var estadoId = (await _context.Catalogo
                                .FirstOrDefaultAsync(a => a.Valor == estado && a.Grupo == "ESTADOS_SOLICITUD"))?.Id;

                oit.EstadoId = estadoId
                    ?? throw new ApplicationException(CanonicalConstants.Excepciones.EstadoSolicitudNoEncontrado);
                oit.FechaModifica = DateTime.Now;
                _context.SolicitudOrdenTrabajo.Add(oit);
                _context.Entry(oit).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> ActualizarOrdenDeTrabajo(OrdenTrabajo ordenTrabajo, UsuarioDTO usuario)
        {
            try
            {

                List<OrdenTrabajoHistorialModificacion> ModificacionOrdenTrabajo = new List<OrdenTrabajoHistorialModificacion>();

                OrdenTrabajo ordenTrabajoBD = await _context.OrdenTrabajo

                    .Include(c => c.Cliente)
                    .Include(c => c.Anexos)
                    .Include(c => c.Linea)
                    .Include(c => c.Herramienta)
                    .Include(c => c.TamanoHerramienta)
                    .Include(c => c.Material)
                    .Include(c => c.Material.Material)
                    .Include(c => c.Herramienta.TamanosHerramienta)
                    .Include(c => c.TipoServicio)
                    .Include(c => c.Estado)
                    .Include(c => c.Responsable).AsNoTracking().FirstOrDefaultAsync(c => c.Id == ordenTrabajo.Id);
                _context.Entry(ordenTrabajoBD).CurrentValues.SetValues(ordenTrabajo);



                ordenTrabajoBD.MaterialId = ordenTrabajo.Material.Id;
                ordenTrabajoBD.Anexos = ordenTrabajo.Anexos;

                ordenTrabajoBD.HerramientaId = ordenTrabajo.Herramienta.Id;
                ordenTrabajoBD.TamanoHerramientaId = ordenTrabajo.TamanoHerramienta.Id;
                ordenTrabajoBD.NombreUsuarioCrea = "admin";


                _context.OrdenTrabajo.Update(ordenTrabajoBD);

                foreach (var entry in _context.Entry(ordenTrabajoBD).Properties)
                {
                    if (entry.IsModified)
                    {

                        ModificacionOrdenTrabajo.Add(new OrdenTrabajoHistorialModificacion()
                        {
                            UsuarioModifica = "admin",
                            OrdenTrabajoId = ordenTrabajoBD.Id,
                            Campo = entry.Metadata.Name,
                            ValorAnterior = entry.OriginalValue == null ? "desconocidos" : entry.OriginalValue.ToString(),
                            FechaModificacion = DateTime.Now,
                            Guid = Guid.NewGuid(),
                            GuidUsuarioModifica = Guid.NewGuid()
                        });
                    }

                    Console.WriteLine(
                        $"Property '{entry.Metadata.Name}'" +
                        $" is {(entry.IsModified ? "modified" : "not modified")} " +
                        $"Current value: '{entry.CurrentValue}' " +
                        $"Original value: '{entry.OriginalValue}'");
                }





                var changes = await CrearHistorialModificacionesOrdenDeTrabajo(ModificacionOrdenTrabajo, usuario);



                return changes;
            }
            catch (Exception e) { throw e; }
        }

        public async Task<bool> ActualizarSolcitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, UsuarioDTO usuario)
        {
            try
            {



                _context.SolicitudOrdenTrabajo.Update(solicitudOrdenTrabajo);

                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception e) { throw e; }
        }

        public async Task<Tuple<int, IEnumerable<OrdenTrabajoHistorialModificacion>>> ConsultarHistorialModificacionesOrdenDeTrabajo(Guid guidOrdenTrabajo, Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                var result = await _context.OrdenTrabajoHistorialModificacion.Where(c => c.OrdenTrabajo.Guid == guidOrdenTrabajo)
                    .Skip(paginacion.RegistrosOmitir())
                    .Take(paginacion.CantidadRegistros)
                    .ToListAsync();

                var cantidad = await _context.SolicitudOrdenTrabajo.CountAsync();
                return new Tuple<int, IEnumerable<OrdenTrabajoHistorialModificacion>>(cantidad, result);
            }
            catch (Exception) { throw; }
        }

        public async Task<OrdenTrabajo> ConsultarOrdenDeTrabajoPorGuid(string guidOrdenDeTrabajo, UsuarioDTO usuario)
        {

            try
            {
                OrdenTrabajo ordenTrabajo = await _context.OrdenTrabajo
                         .Include(c => c.Anexos)
                         .Include(c => c.Cliente)
                         .Include(c => c.Linea)
                         .Include(c => c.Herramienta)
                         .Include(c => c.TamanoHerramienta)
                         .Include(c => c.Material)
                         .Include(c => c.Prioridad)
                         .Include(c => c.Material.Material)
                         .Include(c => c.Herramienta.TamanosHerramienta)
                         .Include(c => c.TipoServicio)
                         .Include(c => c.Estado)
                         .Include(c => c.Responsable)
                         .FirstOrDefaultAsync(c => c.Guid.ToString() == guidOrdenDeTrabajo);

                ordenTrabajo.Anexos = await _context.OrdenTrabajoAnexos
                  .Include(c => c.DocumentoAdjunto)
                  .Include(c => c.OrdenTrabajo)
                  .Where(c => c.OrdenTrabajo.Guid.ToString() == guidOrdenDeTrabajo).ToListAsync();

                return ordenTrabajo;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Tuple<int, IEnumerable<OrdenTrabajo>>> ConsultarOrdenesDeTrabajo(Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                var result = await _context.OrdenTrabajo
                    .Include(c => c.Cliente)
                    .Include(c => c.Herramienta)
                    .Include(c => c.TipoServicio)
                    .Include(c => c.Estado)
                    .Include(c => c.Responsable).OrderByDescending(c => c.FechaRegistro)
                    .Skip(paginacion.RegistrosOmitir())
                    .Take(paginacion.CantidadRegistros)
                    .ToListAsync();

                var cantidad = await _context.OrdenTrabajo.CountAsync();
                return new Tuple<int, IEnumerable<OrdenTrabajo>>(cantidad, result);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<OrdenTrabajo>>> ConsultarOrdenesDeTrabajoPorFiltro(ParametroOrdenTrabajoDTO parametrosDTO, UsuarioDTO usuario)
        {
            try
            {
                var query = _context.OrdenTrabajo.Include(c => c.Cliente)
                    .Include(c => c.Herramienta)
                    .Include(c => c.TipoServicio)
                    .Include(c => c.Estado)
                    .Include(c => c.Responsable)
                    .Where(ordern =>
                    (string.IsNullOrEmpty(parametrosDTO.NumeroOIT) || ordern.Id == Int32.Parse(parametrosDTO.NumeroOIT)) &&
                    (string.IsNullOrEmpty(parametrosDTO.Remision) || ordern.RemisionCliente.ToString().Contains(parametrosDTO.NumeroOIT)) &&
                    (string.IsNullOrEmpty(parametrosDTO.FechaCreacion) || ordern.FechaRegistro.ToString().Contains(parametrosDTO.FechaCreacion)) && ///agregar fecha de finalizacion cuando se trabajo    en remisiones
                    (parametrosDTO.Estado == 0 || ordern.EstadoId == parametrosDTO.Estado) &&
                   (parametrosDTO.Responsable == 0 || ordern.ResponsableId == parametrosDTO.Responsable) &&
                    (parametrosDTO.TipoServio == 0 || ordern.TipoServicioId == parametrosDTO.TipoServio));

                var queryPagination = await query
                    .Skip(parametrosDTO.RegistrosOmitir())
                    .Take(parametrosDTO.CantidadRegistros)
                    .ToListAsync();

                var cantidad = query.Count();
                return new Tuple<int, IEnumerable<OrdenTrabajo>>(cantidad, queryPagination);
            }
            catch (Exception) { throw; }
        }

        public async Task<SolicitudOrdenTrabajo> ConsultarSolicitudDeTrabajoPorGuid(Guid guidSolicitudOrdenTrabajo, UsuarioDTO usuario)
        {
            try
            {
                SolicitudOrdenTrabajo Solicitud = await _context.SolicitudOrdenTrabajo
                   .Include(c => c.Anexos)
                   .Include(c => c.Cliente)
                   .Include(c => c.ClienteLinea)
                   .Include(c => c.Estado)
                   .Include(c => c.OrigenSolicitud)
                   .Include(c => c.Prioridad)
                   .Include(c => c.Responsable)
                   .FirstOrDefaultAsync(c => c.Guid == guidSolicitudOrdenTrabajo);

                Solicitud.Anexos = await _context.SolicitudOrdenTrabajoAnexos
                    .Include(c => c.DocumentoAdjunto)
                    .Include(c => c.SolicitudOrdenTrabajo)
                    .Where(c => c.SolicitudOrdenTrabajo.Guid == guidSolicitudOrdenTrabajo).ToListAsync();

                return Solicitud;
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajo(Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                var result = await _context.SolicitudOrdenTrabajo
                                    .Include(c => c.Anexos)
                                    .Include(c => c.Cliente)
                                    .Include(c => c.ClienteLinea)
                                    .Include(c => c.Estado)
                                    .Include(c => c.OrigenSolicitud)
                                    .Include(c => c.Prioridad)
                                    .Include(c => c.Responsable)
                                    .Skip(paginacion.RegistrosOmitir())
                                    .Take(paginacion.CantidadRegistros)
                                    .ToListAsync();

                var cantidad = await _context.SolicitudOrdenTrabajo.CountAsync();
                return new Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>(cantidad, result);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajoPorFiltro(ParametrosSolicitudOrdenTrabajoDTO parametrosDTO, UsuarioDTO usuario)
        {
            try
            {
                var query = _context.SolicitudOrdenTrabajo
                                    .Include(c => c.Anexos)
                                    .Include(c => c.Cliente)
                                    .Include(c => c.ClienteLinea)
                                    .Include(c => c.Estado)
                                    .Include(c => c.OrigenSolicitud)
                                    .Include(c => c.Prioridad)
                                    .Include(c => c.Responsable)
                                    .Where(e => (string.IsNullOrEmpty(parametrosDTO.Responsable) || e.Responsable.Valor.Contains(parametrosDTO.Responsable))
                                            && (string.IsNullOrEmpty(parametrosDTO.Cliente) || e.Cliente.NickName.Contains(parametrosDTO.Cliente))
                                            && (string.IsNullOrEmpty(parametrosDTO.ClienteLinea) || e.ClienteLinea.Nombre.Contains(parametrosDTO.ClienteLinea))
                                            && (string.IsNullOrEmpty(parametrosDTO.Prioridad) || e.Prioridad.Valor.Contains(parametrosDTO.Prioridad))
                                            && (string.IsNullOrEmpty(parametrosDTO.DetallesSolicitud) || e.DetallesSolicitud.Contains(parametrosDTO.DetallesSolicitud))
                                            && (string.IsNullOrEmpty(parametrosDTO.Estado) || e.Estado.Valor.Equals(parametrosDTO.Estado))
                                            );

                var queryPagination = await query
                    .Skip(parametrosDTO.RegistrosOmitir())
                    .Take(parametrosDTO.CantidadRegistros)
                    .ToListAsync();

                var cantidad = query.Count();
                return new Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>(cantidad, queryPagination);
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> CrearHistorialModificacionesOrdenDeTrabajo(List<OrdenTrabajoHistorialModificacion> modificacionesOrdenTrabajo, UsuarioDTO usuario)
        {
            try
            {
                _context.OrdenTrabajoHistorialModificacion.AddRange(modificacionesOrdenTrabajo);
                return await _context.SaveChangesAsync() > 1;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<OrdenTrabajo> CrearOrdenDeTrabajo(OrdenTrabajo ordenTrabajo, UsuarioDTO usuario)
        {
            try
            {
                ordenTrabajo.Guid = Guid.NewGuid();
                ordenTrabajo.EstadoId = (int)ESTADOSORDENTRABAJO.PENDIENTE;
                ordenTrabajo.FechaRegistro = DateTime.Now;
                ordenTrabajo.TipoServicioId = (int)TIPOSERVICIOS.REPARACIÓN;
                ordenTrabajo.ResponsableId = (int)RESPONSABLES.JUAN_MARQUEZ;
                OrdenTrabajo ordenTrabajoBD = new OrdenTrabajo();
                _context.Entry(ordenTrabajoBD).CurrentValues.SetValues(ordenTrabajo);
                ordenTrabajoBD.NombreUsuarioCrea = USUARIO_CREA.ADMIN.ToString();
                ordenTrabajo.CantidadInspeccionar = CalcularCantidadInpseccionar(ordenTrabajo.Cantidad);
                _context.OrdenTrabajo.Add(ordenTrabajoBD);
                await _context.SaveChangesAsync();
                OrdenTrabajo oit = await _context.OrdenTrabajo.FirstOrDefaultAsync(c => c.Guid == ordenTrabajo.Guid);
                return oit;

            }
            catch (Exception e)
            {

                throw e;
            }
        }

        private int CalcularCantidadInpseccionar(int cantidad)
        {

            if (cantidad >= 2 && cantidad <= 8)
            {
                return 2;
            }
            else if (cantidad >= 9 && cantidad <= 15)
            {
                return 2;
            }
            else if (cantidad >= 16 && cantidad <= 25)
            {
                return 6;

            }
            else if (cantidad >= 26 && cantidad <= 50)
            {
                return 8;
            }
            else if (cantidad >= 51 && cantidad <= 90)
            {
                return 13;
            }
            else if (cantidad >= 91 && cantidad <= 150)
            {
                return 20;
            }
            else if (cantidad >= 151 && cantidad <= 280)
            {
                return 32;
            }
            else if (cantidad >= 281 && cantidad <= 500)
            {
                return 60;
            }
            else if (cantidad >= 501 && cantidad <= 1200)
            {
                return 80;
            }
            else if (cantidad >= 1201 && cantidad <= 3200)
            {
                return 125;
            }
            else if (cantidad >= 3201 && cantidad <= 10000)
            {
                return 200;

            }
            else if (cantidad >= 10001 && cantidad <= 35000)
            {
                return 315;

            }
            return 1;
        }

        public async Task<Guid> CrearSolicitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo, UsuarioDTO usuario)
        {
            try
            {
                solicitudOrdenTrabajo.Guid = Guid.NewGuid();
                solicitudOrdenTrabajo.FechaRegistro = DateTime.Now;

                _context.SolicitudOrdenTrabajo.Add(solicitudOrdenTrabajo);

                await _context.SaveChangesAsync();
                return solicitudOrdenTrabajo.Guid;

            }
            catch (Exception e) { throw e; }
        }
    }
}

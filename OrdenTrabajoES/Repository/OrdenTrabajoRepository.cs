﻿using System;
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
                Int32.TryParse(estado, out int estadoid);
                var estadoId = (await _context.Catalogo
                                .FirstOrDefaultAsync(a => a.Valor == estado || a.Id == estadoid && a.Grupo == "ESTADOS_ORDENTRABAJO"))?.Id;

                oit.EstadoId = estadoId
                    ?? throw new ApplicationException(CanonicalConstants.Excepciones.EstadoSolicitudNoEncontrado);
                oit.FechaModifica = DateTime.Now;
                _context.OrdenTrabajo.Add(oit);
                _context.Entry(oit).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception e) { throw e; }
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


                foreach (var entry in _context.Entry(ordenTrabajoBD).Properties)
                {


                    var value = GetPropValue(ordenTrabajo, entry.Metadata.Name);

                    if (value != null && entry.CurrentValue != null)
                    {
                        if (!entry.CurrentValue.Equals(value))
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
                    }

                    Console.WriteLine(
                        $"Property '{entry.Metadata.Name}'" +
                        $" is {(entry.IsModified ? "modified" : "not modified")} " +
                        $"Current value: '{entry.CurrentValue}' " +
                        $"Original value: '{entry.OriginalValue}'");
                }


                _context.Entry(ordenTrabajoBD).CurrentValues.SetValues(ordenTrabajo);


                if (ordenTrabajo.Material.Id != 0)
                {
                    ordenTrabajoBD.MaterialId = ordenTrabajo.Material.Id;

                }
                ordenTrabajoBD.Anexos = ordenTrabajo.Anexos;

                ordenTrabajoBD.HerramientaId = ordenTrabajo.HerramientaId;
                ordenTrabajoBD.ClienteId = ordenTrabajo.ClienteId;
                ordenTrabajoBD.LineaId = ordenTrabajo.LineaId;
                ordenTrabajoBD.TamanoHerramientaId = ordenTrabajo.TamanoHerramientaId == 0 ? null : ordenTrabajo.TamanoHerramientaId;
                ordenTrabajoBD.NombreUsuarioCrea = "admin";


                //_context.OrdenTrabajo.Update(ordenTrabajoBD);
                _context.Entry(ordenTrabajoBD).State = EntityState.Modified;
                var actualizo = _context.SaveChanges() > 0;

                var changes = await CrearHistorialModificacionesOrdenDeTrabajo(ModificacionOrdenTrabajo, usuario);



                return actualizo;
            }
            catch (Exception e) { throw e; }
        }

        public static object GetPropValue(object src, string propName)
        {
            return src.GetType().GetProperty(propName).GetValue(src, null);
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

                var cantidad = await _context.OrdenTrabajoHistorialModificacion.Where(c => c.OrdenTrabajo.Guid == guidOrdenTrabajo).CountAsync();
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
                    .Include(c => c.Responsable).OrderByDescending(c => c.FechaRegistro)
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
                if (ordenTrabajo.TamanoHerramientaId == 0)
                {
                    ordenTrabajo.TamanoHerramientaId = null;
                }
                ordenTrabajo.CantidadInspeccionar = CalcularCantidadInpseccionar(ordenTrabajo.Cantidad);
                OrdenTrabajo ordenTrabajoBD = new OrdenTrabajo();
                _context.Entry(ordenTrabajoBD).CurrentValues.SetValues(ordenTrabajo);
                if (ordenTrabajoBD.TamanoHerramienta != null)
                {

                    _context.Entry(ordenTrabajoBD.TamanoHerramienta).State = EntityState.Unchanged;
                }


                ordenTrabajoBD.NombreUsuarioCrea = USUARIO_CREA.ADMIN.ToString();
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

        public async Task<IEnumerable<OrdenTrabajoHistorialProcesoDTO>> ConsultarHistorialProcesosDeOrdenDeTrabajo(Guid guid, UsuarioDTO usuarioDTO)
        {
            try
            {
                var procesosOrdenTrabajoQuery = _context.OrdenTrabajo.Include(d => d.Procesos);

                var procesosOrdenTrabajo = procesosOrdenTrabajoQuery.Where(d => d.Guid == guid).SelectMany(d => d.Procesos.Select(t => new OrdenTrabajoHistorialProcesoDTO
                {
                    EstadoProceso = t.EstadoId,
                    FechaFinalizacion = t.FechaFinalizacion,
                    TipoProcesoId = t.TipoProcesoId,
                    OperarioId = t.GuidOperario,
                    NombreOperario = t.NombreOperario,
                    Observaciones = t.ObservacionRechazo ?? t.TrabajoRealizado,
                    LiberaProcesoAnteriorGuid = t.GuidPersonaLibera,
                    NombreLiberaProcesoAnterior = t.NombrePersonaLibera,
                    TipoProcesoAnteriorId = t.TipoProcesoAnteriorId
                }));


                return await procesosOrdenTrabajo.ToListAsync();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Tuple<int, IEnumerable<OrdenTrabajoRemisionDTO>>> ConsultarOrdenDeTrabajoParaRemision(Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                //CanonicalConstants.Estados.OrdenTrabajo.Remision

                var query = _context.OrdenTrabajo.Where(ot => ot.Estado.Valor == CanonicalConstants.Estados.OrdenTrabajo.Remision && ot.RemisionId == null);

                var result = query.Select(ot => new OrdenTrabajoRemisionDTO
                {
                    Id = ot.Id,
                    Guid = ot.Guid,
                    Cliente = ot.Cliente.NickName,
                    Linea = ot.Linea.Nombre,
                    Herramienta = ot.Herramienta.Nombre,
                    Fecha = ot.FechaRegistro,
                    ObservacionRemision = ot.ObservacionRemision

                }).OrderByDescending(c => c.Fecha)
                  .Skip(paginacion.RegistrosOmitir())
                  .Take(paginacion.CantidadRegistros)
                  .ToList();

                var cantidad = await query.CountAsync();
                return new Tuple<int, IEnumerable<OrdenTrabajoRemisionDTO>>(cantidad, result);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Tuple<int, IEnumerable<OrdenTrabajoRemisionDTO>>> ConsultarOrdenDeTrabajoParaRemisionPorFiltro(OrdenTrabajoRemisionFiltroDTO ordenTrabajoRemision, UsuarioDTO usuario)
        {
            try
            {
                var query = _context.OrdenTrabajo.Where(ot => ot.Estado.Valor == CanonicalConstants.Estados.OrdenTrabajo.Remision && ot.RemisionId == null
                                                 && (string.IsNullOrEmpty(ordenTrabajoRemision.Id) || ot.Id.ToString().Contains(ordenTrabajoRemision.Id))
                                                 && (string.IsNullOrEmpty(ordenTrabajoRemision.Cliente) || ot.Cliente.NickName.Contains(ordenTrabajoRemision.Cliente))
                                                 && (string.IsNullOrEmpty(ordenTrabajoRemision.Linea) || ot.Linea.Nombre.Contains(ordenTrabajoRemision.Linea))
                                                 && (string.IsNullOrEmpty(ordenTrabajoRemision.Herramienta) || ot.Herramienta.Nombre.Contains(ordenTrabajoRemision.Herramienta))
                                                 && (string.IsNullOrEmpty(ordenTrabajoRemision.Fecha) || ot.FechaRegistro.ToString().Contains(ordenTrabajoRemision.Fecha)));

                var result = query.Select(ot => new OrdenTrabajoRemisionDTO
                {
                    Id = ot.Id,
                    Guid = ot.Guid,
                    Cliente = ot.Cliente.NickName,
                    Linea = ot.Linea.Nombre,
                    Herramienta = ot.Herramienta.Nombre,
                    Fecha = ot.FechaRegistro,
                    ObservacionRemision = ot.ObservacionRemision

                }).OrderByDescending(c => c.Fecha)
                 .Skip(ordenTrabajoRemision.RegistrosOmitir())
                 .Take(ordenTrabajoRemision.CantidadRegistros)
                 .ToList();

                var cantidad = await query.CountAsync();
                return new Tuple<int, IEnumerable<OrdenTrabajoRemisionDTO>>(cantidad, result);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> ActualizarObservacionRemision(string Observacion, Guid guidOrdenTrabajo, UsuarioDTO usuario)
        {
            try
            {
                var OrdenTrabajo = await _context.OrdenTrabajo.FirstOrDefaultAsync(ot => ot.Guid == guidOrdenTrabajo);

                OrdenTrabajo.ObservacionRemision = Observacion;
                OrdenTrabajo.FechaModifica = DateTime.Now;

                _context.Entry(OrdenTrabajo).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;


            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> ConsultarOrdenTrabajoEstadoRemision(List<Guid> guidsOrdenTrabajo, UsuarioDTO usuario)
        {
            try
            {
                var query = await _context.OrdenTrabajo.Where(ot => guidsOrdenTrabajo.Contains(ot.Guid) && ot.Estado.Valor != "Remisión").ToListAsync();
                return !(query.Count() > 0);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> ActualizarEstadoOrdenesDeTrabajo(List<Guid> guidsOrdenesDeTrabajo, string estado, UsuarioDTO usuario)
        {
            try
            {
                var oit = await _context.OrdenTrabajo.Where(a => guidsOrdenesDeTrabajo.Contains(a.Guid)).ToListAsync(); ;
                Int32.TryParse(estado, out int estadoid);

                var estadoId = (await _context.Catalogo
                                .FirstOrDefaultAsync(a => a.Valor == estado || a.Id == estadoid && a.Grupo == "ESTADOS_ORDENTRABAJO")).Id;

                foreach (var item in oit)
                {
                    item.EstadoId = estadoId;
                    item.FechaModifica = DateTime.Now;
                    _context.OrdenTrabajo.Add(item);
                    _context.Entry(item).State = EntityState.Modified;

                }

                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

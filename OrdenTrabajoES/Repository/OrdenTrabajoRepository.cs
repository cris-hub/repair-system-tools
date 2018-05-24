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

        public async Task<bool> ActualizarEstadoSolicitudDeTrabajo(Guid guidSolicitudOrdenTrabajo, string estado)
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

        public async Task<SolicitudOrdenTrabajo> ConsultarSolicitudDeTrabajoPorGuid(Guid guidSolicitudOrdenTrabajo)
        {
            try
            {
                return await _context.SolicitudOrdenTrabajo
                    .Include(c => c.Anexos)
                    .Include(c => c.DocumentoAdjunto)
                    .Include(c => c.Cliente)
                    .Include(c => c.ClienteLinea)
                    .Include(c => c.Estado)
                    .Include(c => c.OrigenSolicitud)
                    .Include(c => c.Prioridad)
                    .Include(c => c.Responsable)
                    .FirstOrDefaultAsync(c => c.Guid == guidSolicitudOrdenTrabajo);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajo(Paginacion paginacion)
        {
            try
            {
                var result = await _context.SolicitudOrdenTrabajo
                                    .Include(c => c.Anexos)
                                    .Include(c => c.DocumentoAdjunto)
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

        public async Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajoPorFiltro(ParametrosSolicitudOrdenTrabajoDTO parametrosDTO)
        {
            try
            {
                var query = _context.SolicitudOrdenTrabajo
                                    .Include(c => c.Anexos)
                                    .Include(c => c.DocumentoAdjunto)
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

        public async Task<Guid> CrearSolicitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo)
        {
            try
            {
                solicitudOrdenTrabajo.Guid = Guid.NewGuid();
                solicitudOrdenTrabajo.FechaRegistro = DateTime.Now;

                _context.SolicitudOrdenTrabajo.Add(solicitudOrdenTrabajo);

                await _context.SaveChangesAsync();
                return solicitudOrdenTrabajo.Guid;

            }
            catch (Exception) { throw; }
        }
    }
}

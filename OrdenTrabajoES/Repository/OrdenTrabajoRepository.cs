using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

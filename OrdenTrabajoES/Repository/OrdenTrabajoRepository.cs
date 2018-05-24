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

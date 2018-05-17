using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pemarsa.Data;
using Pemarsa.Domain;
using System.Linq;

namespace HerramientaES.Repository
{
    internal class HerramientaRepository : IHerramientaRepository
    {
        private readonly PemarsaContext _context;

        public HerramientaRepository(DbContext context)
        {
            _context = (PemarsaContext)context;
        }

        public async Task<IEnumerable<Herramienta>> ConsultarHerramientasPorGuidCliente(Guid guidCliente)
        {
            try {
                    return await (from h in _context.Herramienta
                              join ht in _context.HerramientaTamano on h.Id equals ht.HerramientaId
                              join htm in _context.HerramientaTamanoMotor on h.Id equals htm.HerramientaId
                              join hef in _context.HerramientaEstudioFactibilidad on h.Id equals hef.HerramientaId
                              join c in _context.Cliente on h.ClienteId equals c.Id
                              where c.Guid == guidCliente
                              select h)
                              .Include(c => c.TamanosHerramienta)
                              .Include(c => c.TamanosMotor)
                              .Include(c => c.HerramientaEstudioFactibilidad)
                              .Include(c => c.Estado)
                              .Include(c => c.Cliente)
                              .ToListAsync();
            }
            catch (Exception) { throw; }  
        }

        public async Task<Guid> CrearHerramienta(Herramienta herramienta)
        {
            try
            {
                herramienta.Guid = Guid.NewGuid();
                herramienta.FechaRegistro = DateTime.Now;
                if (herramienta.TamanosHerramienta != null) {
                    foreach (HerramientaTamano HTamano in herramienta.TamanosHerramienta)
                    {
                        HTamano.Guid = Guid.NewGuid();
                        HTamano.FechaRegistro = DateTime.Now;
                    }
                }
                if (herramienta.TamanosMotor != null)
                {
                    foreach (HerramientaTamanoMotor HTamanom in herramienta.TamanosMotor)
                    {
                        HTamanom.Guid = Guid.NewGuid();
                        HTamanom.FechaRegistro = DateTime.Now;
                    }
                }
                _context.Herramienta.Add(herramienta);
                await _context.SaveChangesAsync();
                return herramienta.Guid;
            }
            catch (Exception) { throw; }
        }
    }
}

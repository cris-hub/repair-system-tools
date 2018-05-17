using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pemarsa.Data;
using Pemarsa.Domain;

namespace HerramientaES.Repository
{
    internal class HerramientaRepository : IHerramientaRepository
    {
        private readonly PemarsaContext _context;

        public HerramientaRepository(DbContext context)
        {
            _context = (PemarsaContext)context;
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

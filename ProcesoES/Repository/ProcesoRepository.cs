using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public async Task<Guid> CrearProceso(Proceso proceso)
        {
            try
            {
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

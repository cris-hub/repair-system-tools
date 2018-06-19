using Microsoft.EntityFrameworkCore;
using Pemarsa.Data;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FormatoES.Repository
{
    internal class FormatoRepository : IFormatoRepository
    {
        private readonly PemarsaContext _context;

        public FormatoRepository(DbContext context)
        {
            _context = (PemarsaContext)context;
        }

        public async Task<Guid> CrearFormato(Formato formato)
        {
            try
            {
                formato.Guid = Guid.NewGuid();
                formato.GuidUsuarioCrea = Guid.NewGuid();
                formato.NombreUsuarioCrea = "USUARIO CREA";
                formato.FechaRegistro = new DateTime();

                _context.Formato.Add(formato);
                await _context.SaveChangesAsync();
                return formato.Guid;
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}

using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;
//using Microsoft.EntityFrameworkCore;

namespace RemisionES.Repository
{
    public class RemisionRepository : IRemisionRepository
    {

        private readonly PemarsaContext _context;
        public RemisionRepository(DbContext context)
        {
            _context = (PemarsaContext)context;
        }

        public async Task<Guid> CrearRemision(Remision remision, UsuarioDTO usuario)
        {
            try
            {
                remision.Guid = Guid.NewGuid();
                remision.GuidUsuarioCrea = Guid.NewGuid();
                remision.NombreUsuarioCrea = "Nombre usuario crea";
                remision.FechaRegistro = DateTime.Now;

                _context.Remision.Add(remision);

                await _context.SaveChangesAsync();

                return remision.Guid;

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

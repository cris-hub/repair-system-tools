using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pemarsa.Data;
using Pemarsa.Domain;

namespace ClienteES.Repository
{
    internal class ClienteRepository : IClienteRepository
    {
        private readonly PemarsaContext _context;

        public ClienteRepository(DbContext context)
        {
            _context = (PemarsaContext)context;
        }

        public async Task<IEnumerable<Cliente>> ConsultarClientes()
        {
            try
            {
                return await _context.Cliente.ToListAsync();
            }
            catch (Exception) { throw; }
        }

        public async Task<Guid> CrearCliente(Cliente cliente)
        {
            try
            {
                cliente.Guid = Guid.NewGuid();
                await _context.Cliente.AddAsync(cliente);
                return cliente.Guid;
            }
            catch (Exception) { throw; }
        }
    }
}

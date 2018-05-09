using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pemarsa.CanonicalModels;
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

        public async Task<Tuple<int, IEnumerable<Cliente>>> ConsultarClientes(Paginacion paginacion)
        {
            try
            {
                var result = await _context.Cliente.ToListAsync();
                var cantidad = await _context.Cliente.CountAsync();
                return new Tuple<int, IEnumerable<Cliente>>(cantidad, result);
            }
            catch (Exception) { throw; }
        }

        public async Task<Guid> CrearCliente(Cliente cliente)
        {
            try
            {
                cliente.Guid = Guid.NewGuid();
                cliente.FechaRegistro = DateTime.Now;
                _context.Cliente.Add(cliente);
                await _context.SaveChangesAsync();
                return cliente.Guid;
            }
            catch (Exception) { throw; }
        }

        public async Task<Cliente> ConsultarClientePorGuid (Guid guidCliente)
        {
            try
            {
                return await _context.Cliente
                    .Include(c => c.Estado)
                    .Include(c => c.Lineas)
                    .Include(c => c.Rut)
                    .FirstOrDefaultAsync(c => c.Guid ==guidCliente);



                //return await _context.Cliente.Where(c => c.Guid == guidCliente).FirstOrDefaultAsync();
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> ActualizarCliente(Cliente cliente)
        {
            try
            {
                _context.Entry(cliente).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;   
            }
            catch (Exception) { throw; }
        }

        public async Task<IEnumerable<ClienteLinea>> ConsultarLineasPorGuidCliente(Guid guidCliente)
        {
            try
            {
                return await (from cl in _context.ClienteLinea
                              join c in _context.Cliente on cl.ClienteId equals c.Id 
                              where c.Guid == guidCliente
                              select cl).ToListAsync();
            }
            catch (Exception) { throw; }
        }
    }
}

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
                var result = await _context.Cliente
                                    .Include(c => c.Estado)
                                    .Include(c => c.Lineas)
                                    .Include(c => c.Rut)
                                    .Skip(paginacion.RegistrosOmitir())
                                    .Take(paginacion.CantidadRegistros)
                                    .ToListAsync();
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

        public async Task<Tuple<int, IEnumerable<Cliente>>> ConsultarClientesPorFiltro(ParametrosDTO parametrosDTO)
        {
            try
            {
                var query = _context.Cliente
                                    .Include(c => c.Estado)
                                    .Include(c => c.Lineas)
                                    .Include(c => c.Rut)
                                    .Where(e => (string.IsNullOrEmpty(parametrosDTO.RazonSocial) || e.RazonSocial.Contains(parametrosDTO.RazonSocial))
                                            && (string.IsNullOrEmpty(parametrosDTO.Nit) || e.Nit.Contains(parametrosDTO.Nit))
                                            && (string.IsNullOrEmpty(parametrosDTO.Telefono) || e.Telefono.Contains(parametrosDTO.Telefono))
                                            && (string.IsNullOrEmpty(parametrosDTO.Direccion) || e.Direccion.Contains(parametrosDTO.Direccion))
                                            && (string.IsNullOrEmpty(parametrosDTO.Estado) || e.Estado.Valor.Contains(parametrosDTO.Estado))
                                            );

                var queryPagination = await query
                    .OrderBy(e => e.RazonSocial)
                    .Skip(parametrosDTO.RegistrosOmitir())
                    .Take(parametrosDTO.CantidadRegistros)
                    .ToListAsync();
                                   
                var cantidad = query.Count();
                return new Tuple<int, IEnumerable<Cliente>>(cantidad, queryPagination);
            }
            catch (Exception) { throw; }
        }
    }
}

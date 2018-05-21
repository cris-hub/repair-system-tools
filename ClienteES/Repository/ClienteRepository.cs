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
                if (cliente.Lineas != null)
                {
                    foreach (ClienteLinea linea in cliente.Lineas)
                    {
                        linea.Guid = Guid.NewGuid();
                        linea.FechaRegistro = DateTime.Now;
                    }
                } 
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
                var clienteBD = await _context.Cliente
                                    .Include(c => c.Estado)
                                    .Include(c => c.Lineas)
                                    .Include(c => c.Rut)
                                    .SingleOrDefaultAsync(c => c.Id == cliente.Id);

                _context.Entry(clienteBD).CurrentValues.SetValues(cliente);

                #region Actualizar LineaCliente
                cliente.Lineas = cliente.Lineas ?? new List<ClienteLinea>();
                clienteBD.Lineas = clienteBD.Lineas ?? new List<ClienteLinea>();
                //se obtinen las lineas que fueron eliminadas en el objeto cliente que se recibe del cliente.
                var lineasEliminar = (from hbd in clienteBD.Lineas
                                       where !cliente.Lineas.Any(x => x.Id == hbd.Id && x.Guid == hbd.Guid)
                                       select hbd).ToList();

                //se obtinen los tamaños que fueron agregados en el objeto herramienta que se recibe del cliente.
                var lineasInsertar = (from hbd in cliente.Lineas
                                       where !clienteBD.Lineas.Any(x => x.Id == hbd.Id && x.Guid == hbd.Guid)
                                       select hbd).ToList();

                clienteBD.Lineas.ToList().ForEach(e => {

                    ClienteLinea cbd = (clienteBD.Lineas.FirstOrDefault(a => a.Id == e.Id));
                    ClienteLinea c = (cliente.Lineas.FirstOrDefault(a => a.Id == e.Id));
                    //campos a actualizar
                    e.ContactoCorreo = (c != null) ? c.ContactoCorreo : cbd.ContactoCorreo;
                    e.ContactoNombre = (c != null) ? c.ContactoNombre : cbd.ContactoNombre;
                    e.ContactoTelefono = (c != null) ? c.ContactoTelefono : cbd.ContactoTelefono;
                    e.Direccion = (c != null) ? c.Direccion : cbd.Direccion;
                    e.Nombre = (c != null) ? c.Nombre : cbd.Nombre;

                    lineasEliminar.ForEach(ef => {
                        if (e.Id == ef.Id) { /*e.Estado = false;*/  }
                    });
                });

                lineasInsertar.ForEach(e => { e.Guid = Guid.NewGuid(); e.FechaRegistro = DateTime.Now; e.ClienteId = clienteBD.Id; });

                _context.ClienteLinea.UpdateRange(clienteBD.Lineas);
                _context.ClienteLinea.AddRange(lineasInsertar);
                #endregion

                cliente.FechaModifica = DateTime.Now;
                _context.Entry(clienteBD).Property("FechaRegistro").IsModified = false;
                _context.Entry(clienteBD).Property("NombreUsuarioCrea").IsModified = false;
                _context.Entry(clienteBD).Property("GuidUsuarioCrea").IsModified = false;
                //_context.Cliente.Update(cliente);
                _context.Entry(clienteBD).State = EntityState.Modified;
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
                                            && (string.IsNullOrEmpty(parametrosDTO.Estado) || e.Estado.Valor.Equals(parametrosDTO.Estado))
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

        public async Task<bool> ActualizarEstadoCliente(Guid guidCliente, string estado)
        {
            try
            {
                var cliente = await _context.Cliente.FirstOrDefaultAsync(a => a.Guid == guidCliente);

                var estadoId = (await _context.Catalogo
                                .FirstOrDefaultAsync(a => a.Valor == estado))?.Id;

                cliente.EstadoId = estadoId
                    ?? throw new ApplicationException(CanonicalConstants.Excepciones.EstadoNoEncontrado);
                cliente.FechaModifica = DateTime.Now;
                _context.Cliente.Add(cliente);
                _context.Entry(cliente).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception) { throw; }
        }
    }
}

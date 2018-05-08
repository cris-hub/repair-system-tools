using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ClienteES.Repository;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;

namespace ClienteES.Service
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _repository;
        private PemarsaContext _context;

        public ClienteService(PemarsaContext context)
        {
            _repository = new ClienteRepository(context);
            _context = context;
        }

        public async Task<Tuple<int, IEnumerable<Cliente>>> ConsultarClientes(Paginacion paginacion)
        {
            try
            {
                return await _repository.ConsultarClientes(paginacion);
            }
            catch (Exception) { throw; }
        }

        public async Task<Guid> CrearCliente(Cliente cliente)
        {
            try
            {
                return await _repository.CrearCliente(cliente);
            }
            catch (Exception) { throw; }
        }
        
        public async Task<Cliente> ConsultarClientePorGuid(Guid guidCliente)
        {
            try
            {
                return await _repository.ConsultarClientePorGuid(guidCliente);
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> ActualizarCliente(Cliente cliente)
        {
            try
            {
                return await _repository.ActualizarCliente(cliente);
            }
            catch (Exception) { throw; }
        }

        public async Task<IEnumerable<ClienteLinea>> ConsultarLineasPorGuidCliente(Guid guidCliente)
        {
            try
            {
                return await _repository.ConsultarLineasPorGuidCliente(guidCliente);
            }
            catch (Exception) { throw; }
        }
    }
}

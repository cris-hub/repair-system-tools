using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ClienteES.Repository;
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

        public async Task<IEnumerable<Cliente>> ConsultarClientes()
        {
            try
            {
                return await _repository.ConsultarClientes();
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
    }
}

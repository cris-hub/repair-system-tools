using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ClienteES.Repository
{
    public interface IClienteRepository
    {
        Task<Guid> CrearCliente(Cliente cliente);
        Task<IEnumerable<Cliente>> ConsultarClientes();
    }
}

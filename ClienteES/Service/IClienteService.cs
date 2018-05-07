using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ClienteES.Service
{
    public interface IClienteService
    {
        Task<Guid> CrearCliente(Cliente cliente);
        Task<IEnumerable<Cliente>> ConsultarClientes();
    }
}

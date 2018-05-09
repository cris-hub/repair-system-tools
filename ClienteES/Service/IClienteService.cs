using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ClienteES.Service
{
    public interface IClienteService
    {
        Task<Guid> CrearCliente(Cliente cliente, string RutaServer);
        Task<Tuple<int, IEnumerable<Cliente>>> ConsultarClientes(Paginacion paginacion);
        Task<Cliente>ConsultarClientePorGuid(Guid guidCliente);
        Task<IEnumerable<ClienteLinea>> ConsultarLineasPorGuidCliente(Guid guidCliente);
        Task<bool> ActualizarCliente(Cliente cliente);
    }
}

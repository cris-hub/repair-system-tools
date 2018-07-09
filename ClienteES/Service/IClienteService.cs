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
        Task<Guid> CrearCliente(Cliente cliente, string RutaServer,UsuarioDTO usuario);
        Task<Tuple<int, IEnumerable<Cliente>>> ConsultarClientes(Paginacion paginacion, UsuarioDTO usuario);
        Task<Cliente>ConsultarClientePorGuid(Guid guidCliente, UsuarioDTO usuario);
        Task<IEnumerable<ClienteLinea>> ConsultarLineasPorGuidCliente(Guid guidCliente, UsuarioDTO usuario);
        Task<Tuple<int, IEnumerable<Cliente>>> ConsultarClientesPorFiltro(ParametrosDTO parametrosDTO, UsuarioDTO usuario);
        Task<bool> ActualizarEstadoCliente(Guid guidCliente, string estado,UsuarioDTO usuario);
        Task<bool> ActualizarCliente(Cliente cliente, string RutaServer, UsuarioDTO usuario);
    }
}

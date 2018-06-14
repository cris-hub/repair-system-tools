using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ClienteES.Repository;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;
using DocumentoAdjuntoUS.Service;

namespace ClienteES.Service
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _repository;
        private readonly IDocumentoAdjuntoService _serviceDocumentoAdjunto;
        private PemarsaContext _context;
        

        public ClienteService(PemarsaContext context, IDocumentoAdjuntoService serviceDocumentoAdjunto)
        {
            _repository = new ClienteRepository(context);
            _serviceDocumentoAdjunto = serviceDocumentoAdjunto;
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

        public async Task<Guid> CrearCliente(Cliente cliente, string RutaServer)
        {
            try
            {
                if (cliente.Rut != null)
                {
                    cliente.Rut.NombreUsuarioCrea = cliente.NombreUsuarioCrea;
                    cliente.Rut.GuidUsuarioCrea = cliente.GuidUsuarioCrea;
                    cliente.DocumentoAdjuntoId = await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(cliente.Rut, RutaServer);
                }
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

        public async Task<bool> ActualizarCliente(Cliente cliente, string RutaServer)
        {
            try
            {

                if (cliente.Rut != null && cliente.DocumentoAdjuntoId == null)
                {
                    int idDocumentoAdjuntoCreado = await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(cliente.Rut, RutaServer);
                    cliente.DocumentoAdjuntoId = idDocumentoAdjuntoCreado;
                    cliente.Rut.GuidUsuarioModifica = cliente.GuidUsuarioCrea;
                    cliente.Rut.NombreUsuarioModifica = cliente.NombreUsuarioCrea;
                    cliente.Rut.FechaModifica = DateTime.Now;
                    

                }

                if (cliente.Rut != null && cliente.DocumentoAdjuntoId != null)
                {
                    
                    cliente.Rut.GuidUsuarioModifica = cliente.GuidUsuarioModifica;
                    cliente.Rut.NombreUsuarioModifica = cliente.NombreUsuarioModifica;
                    cliente.Rut.FechaModifica = DateTime.Now;
                    cliente.Rut.Id = cliente.DocumentoAdjuntoId.Value;

                    await _serviceDocumentoAdjunto.ActualizarDocumentoAdjunto(cliente.Rut, RutaServer);
                }
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

        public async Task<Tuple<int, IEnumerable<Cliente>>> ConsultarClientesPorFiltro(ParametrosDTO parametrosDTO)
        {
            try
            {
                return await _repository.ConsultarClientesPorFiltro(parametrosDTO);
            }
            catch (Exception) { throw; }
        }

        public async Task<bool> ActualizarEstadoCliente(Guid guidCliente, string estado)
        {
            try
            {
                return await _repository.ActualizarEstadoCliente(guidCliente, estado);
            }
            catch (Exception) { throw; }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using HerramientaES.Repository;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;

namespace HerramientaES.Service
{
    public class HerramientaService : IHerramientaService
    {
        private readonly IHerramientaRepository _repository;
        private PemarsaContext _context;

        public HerramientaService(PemarsaContext context)
        {
            _repository = new HerramientaRepository(context);
            _context = context;
        }

        public async Task<bool> ActualizarHerramienta(Herramienta herramienta, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ActualizarHerramienta(herramienta, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<Herramienta> ConsultarHerramientaPorGuid(Guid guidHerramienta, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarHerramientaPorGuid(guidHerramienta, usuario);
            }
            catch (Exception) { throw; }   
        }
        public async Task<Herramienta> ConsultarHerramientaPorId(int id, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarHerramientaPorId(id, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientas(Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarHerramientas(paginacion, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientasPorFiltro(ParametrosHerramientasDTO parametrosHerramientasDTO, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarHerramientasPorFiltro(parametrosHerramientasDTO, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<IEnumerable<Herramienta>> ConsultarHerramientasPorGuidCliente(Guid guidCliente, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarHerramientasPorGuidCliente(guidCliente, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<Guid> CrearHerramienta(Herramienta herramienta, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.CrearHerramienta(herramienta, usuario);
            }
            catch (Exception) { throw; }
        }
    }
}

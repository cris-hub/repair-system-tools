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

        public async Task<bool> ActualizarHerramienta(Herramienta herramienta)
        {
            try
            {
                return await _repository.ActualizarHerramienta(herramienta);
            }
            catch (Exception) { throw; }
        }

        public async Task<Herramienta> ConsultarHerramientaPorGuid(Guid guidHerramienta)
        {
            try
            {
                return await _repository.ConsultarHerramientaPorGuid(guidHerramienta);
            }
            catch (Exception) { throw; }   
        }
        public async Task<Herramienta> ConsultarHerramientaPorId(int id)
        {
            try
            {
                return await _repository.ConsultarHerramientaPorId(id);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientas(Paginacion paginacion)
        {
            try
            {
                return await _repository.ConsultarHerramientas(paginacion);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientasPorFiltro(ParametrosHerramientasDTO parametrosHerramientasDTO)
        {
            try
            {
                return await _repository.ConsultarHerramientasPorFiltro(parametrosHerramientasDTO);
            }
            catch (Exception) { throw; }
        }

        public async Task<IEnumerable<Herramienta>> ConsultarHerramientasPorGuidCliente(Guid guidCliente)
        {
            try
            {
                return await _repository.ConsultarHerramientasPorGuidCliente(guidCliente);
            }
            catch (Exception) { throw; }
        }

        public async Task<Guid> CrearHerramienta(Herramienta herramienta)
        {
            try
            {
                return await _repository.CrearHerramienta(herramienta);
            }
            catch (Exception) { throw; }
        }
    }
}

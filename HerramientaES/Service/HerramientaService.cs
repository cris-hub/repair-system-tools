using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using HerramientaES.Repository;
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

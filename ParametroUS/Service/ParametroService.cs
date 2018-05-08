using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ParametroUS.DTO;
using ParametroUS.Repository;
using Pemarsa.Data;

namespace ParametroUS.Service
{
    public class ParametroService : IParametroService
    {
        private readonly IParametroRepository _repository;
        public ParametroService(PemarsaContext context)
        {
            _repository = new ParametroRepository(context);
        }

        public async Task<ParametrosDTO> ConsultarParametrosPorEntidad(string entidad)
        {
            try
            {
                return await _repository.ConsultarParametrosPorEntidad(entidad);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

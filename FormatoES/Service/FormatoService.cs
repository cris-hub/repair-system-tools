using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using FormatoES.Repository;
using Pemarsa.Data;
using Pemarsa.Domain;

namespace FormatoES.Service
{
    public class FormatoService : IFormatoService
    {
        private readonly IFormatoRepository _repository;
        private PemarsaContext _context;

        public FormatoService(PemarsaContext context)
        {
            _repository = new FormatoRepository(context);
            _context = context;
        }

        public async Task<Guid> CrearFormato(Formato formato)
        {
            try
            {
                return await _repository.CrearFormato(formato);
            }
            catch (Exception)
            {

                throw;
            }
            
        }
    }
}

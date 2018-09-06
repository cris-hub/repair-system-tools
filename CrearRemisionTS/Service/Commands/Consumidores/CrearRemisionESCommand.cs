using CrearRemisionTS.Service.Helpers;
using CrearRemisionTS.Service.Interface;
using RemisionES.Service;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CrearRemisionTS.Service.Commands.Consumidores
{
    class CrearRemisionESCommand : ICommand<Guid>
    {
        private readonly IRemisionService _service;
        public CrearRemisionESCommand(IRemisionService service)
        {
            _service = service;
        }
        public async Task<Guid> Execute(IParams param)
        {
            try
            {
                Parametros parametros = (Parametros)param;
                return await _service.CrearRemision(parametros.remision,parametros.usuario);
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}

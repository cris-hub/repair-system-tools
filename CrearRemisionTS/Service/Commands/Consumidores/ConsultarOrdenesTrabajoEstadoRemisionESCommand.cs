using CrearRemisionTS.Service.Helpers;
using CrearRemisionTS.Service.Interface;
using OrdenTrabajoES.Service;
using System;
using System.Threading.Tasks;

namespace CrearRemisionTS.Service.Commands.Consumidores
{
    class ConsultarOrdenesTrabajoEstadoRemisionESCommand : ICommand<bool>
    {
        private readonly IOrdenTrabajoService _service;

        public ConsultarOrdenesTrabajoEstadoRemisionESCommand(IOrdenTrabajoService service)
        {
            _service = service;
        }

        public async Task<bool> Execute(IParams param)
        {
            try
            {
                Parametros parametros = (Parametros)param;
                return await _service.ConsultarOrdenTrabajoEstadoRemision(parametros.guidsOrdenTrabajo, parametros.usuario);
            }
            catch (Exception)
            {

                throw;
            }


        }
    }
}

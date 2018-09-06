using CrearRemisionTS.Service.Helpers;
using CrearRemisionTS.Service.Interface;
using OrdenTrabajoES.Service;
using System;
using System.Threading.Tasks;

namespace CrearRemisionTS.Service.Commands.Consumidores
{
    class ActualizarEstadoOrdenesDeTrabajoESCommand : ICommand<bool>
    {
        private readonly IOrdenTrabajoService _service;
        public ActualizarEstadoOrdenesDeTrabajoESCommand(IOrdenTrabajoService service)
        {
            _service = service;
        }
        public async Task<bool> Execute(IParams param)
        {
            Parametros parametros = (Parametros)param;
            return await _service.ActualizarEstadoOrdenesDeTrabajo(parametros.guidsOrdenTrabajo, parametros.estadoOIT, parametros.usuario);
        }
    }
}

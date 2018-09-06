using CrearRemisionTS.Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using Pemarsa.Domain;
using System.Threading.Tasks;
using OrdenTrabajoES.Service;
using CrearRemisionTS.Service.Helpers;

namespace CrearRemisionTS.Service.Commands.Consumidores
{
    class ConsultarOrdenTrabajoPorGuidESCommand : ICommand<OrdenTrabajo>
    {
        private readonly IOrdenTrabajoService _service;
        public ConsultarOrdenTrabajoPorGuidESCommand(IOrdenTrabajoService service)
        {
            _service = service;
        }

        public async Task<OrdenTrabajo> Execute(IParams param)
        {
            Parametros parametros = (Parametros)param;
            return await _service.ConsultarOrdenDeTrabajoPorGuid(parametros.guidOrdenTrabajo,parametros.usuario);
        }
    }
}

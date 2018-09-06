using CrearRemisionTS.Service.Interface;
using System;
using System.Threading.Tasks;
using Pemarsa.Domain;
using CrearRemisionTS.Service.Commands.Consumidores;
using OrdenTrabajoES.Service;
using CrearRemisionTS.Service.Helpers;
using System.Collections.Generic;
using System.Linq;

namespace CrearRemisionTS.Service.Commands.Negocio
{
    class ValidarClienteYLineasCommand : ICommand<bool>
    {

        ICommand<OrdenTrabajo> _consultarOrdenTrabajoPorGuid;

        public ValidarClienteYLineasCommand(IOrdenTrabajoService serviceOrdenTrabajo)
        {
            _consultarOrdenTrabajoPorGuid = new ConsultarOrdenTrabajoPorGuidESCommand(serviceOrdenTrabajo);
        }

        public async Task<bool> Execute(IParams param)
        {
            try
            {
                Parametros parametros = (Parametros)param;

                List<OrdenTrabajo> ListordenTrabajo = new List<OrdenTrabajo>();

                foreach (var item in parametros.guidsOrdenTrabajo)
                {
                    parametros.guidOrdenTrabajo = item.ToString();

                    OrdenTrabajo ordenTrabajo = new OrdenTrabajo();

                    ordenTrabajo = await _consultarOrdenTrabajoPorGuid.Execute(parametros);

                    ListordenTrabajo.Add(ordenTrabajo);

                }

                var ordencliente = ListordenTrabajo.GroupBy(c => new { c.ClienteId , c.LineaId}).Count();


                if (ordencliente > 1)
                {
                    return false;
                }

                parametros.OrdenTrabajo = ListordenTrabajo;

                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

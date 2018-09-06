using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CrearRemisionTS.Service.Helpers;
using CrearRemisionTS.Service.Interface;
using Pemarsa.Domain;

namespace CrearRemisionTS.Service.Commands.Negocio
{
    class CrearRemisionDetalleCommand : ICommand<Remision>
    {
        public CrearRemisionDetalleCommand()
        {

        }
        public async Task<Remision> Execute(IParams param)
        {
            try
            {
                Parametros parametros = (Parametros)param;
                List<RemisionDetalle> ListRemisionDetalle = new List<RemisionDetalle>();

                Remision remision = new Remision();
                remision.EstadoId = 140;

                foreach (var orden in parametros.OrdenTrabajo)
                {
                    RemisionDetalle remisionD = new RemisionDetalle();
                    remisionD.OrdenTrabajoId = orden.Id;

                    ListRemisionDetalle.Add(remisionD);
                }

                remision.RemisionDetalle = ListRemisionDetalle;

                return await Task.FromResult<Remision>(remision);

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

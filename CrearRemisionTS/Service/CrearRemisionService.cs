using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CrearRemisionTS.DTO;
using CrearRemisionTS.Service.Commands.Consumidores;
using CrearRemisionTS.Service.Commands.Negocio;
using CrearRemisionTS.Service.Helpers;
using CrearRemisionTS.Service.Interface;
using OrdenTrabajoES.Service;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;
using RemisionES.Service;

namespace CrearRemisionTS.Service
{

    public class CrearRemisionService : ICrearRemisionService
    {

        ICommand<bool> _consultarOrdenTrabajo;
        ICommand<bool> _validarClienteYLineas;
        ICommand<Remision> _crearRemisionDetalle;
        ICommand<Guid> _crearRemision;
        ICommand<bool> _actualizarEstadosOrdenesDeTrabajo;

        Parametros _parametros;

        public CrearRemisionService(PemarsaContext context, IOrdenTrabajoService serviceOrdenTrabajo, IRemisionService serviceRemision)
        {

            _consultarOrdenTrabajo = new ConsultarOrdenesTrabajoEstadoRemisionESCommand(serviceOrdenTrabajo);
            _validarClienteYLineas = new ValidarClienteYLineasCommand(serviceOrdenTrabajo);
            _crearRemisionDetalle = new CrearRemisionDetalleCommand();
            _crearRemision = new CrearRemisionESCommand(serviceRemision);
            _actualizarEstadosOrdenesDeTrabajo = new ActualizarEstadoOrdenesDeTrabajoESCommand(serviceOrdenTrabajo);
            _parametros = new Parametros();
        }

        public async Task<Guid> CrearRemision(RemisionDTO remision, UsuarioDTO usuario)
        {
            try
            {
                _parametros.guidsOrdenTrabajo = remision.guidOrdenTrabajo;
                _parametros.usuario = usuario;
                _parametros.estadoOIT = CanonicalConstants.Estados.OrdenTrabajo.RemisionPendiente;

                //valida si las ordenes de trabajo tiene el estado en Remisión
                if (await _consultarOrdenTrabajo.Execute(_parametros))
                {
                    // Valida que las ordenes de trabajo tengas el mismo cliente y linea
                    if (await _validarClienteYLineas.Execute(_parametros))
                    {
                        //crear el modelo de remision con la remision detalle
                        _parametros.remision = await _crearRemisionDetalle.Execute(_parametros);
                        //crear la remisión
                        _parametros.guidRemision = await _crearRemision.Execute(_parametros);

                        if(Guid.Empty != _parametros.guidRemision || _parametros.guidRemision != null)
                        {
                            var actualizo = await _actualizarEstadosOrdenesDeTrabajo.Execute(_parametros);
                        }

                    }
                    else
                    {
                        throw new ApplicationException("Todas las oit deben pertecer al mismo cliente y linea");
                    }

                }
                else
                {
                    throw new ApplicationException("Alguna OIT no se encuentra en estado remisión");
                }


                return _parametros.guidRemision;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

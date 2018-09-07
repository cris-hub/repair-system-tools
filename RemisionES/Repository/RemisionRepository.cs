using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;
//using Microsoft.EntityFrameworkCore;

namespace RemisionES.Repository
{
    public class RemisionRepository : IRemisionRepository
    {

        private readonly PemarsaContext _context;
        public RemisionRepository(DbContext context)
        {
            _context = (PemarsaContext)context;
        }

        public async Task<bool> ActualizarEstadoRemision(string estado, Guid guidRemision, UsuarioDTO usuario)
        {
            try
            {
                var remision = await _context.Remision.FirstOrDefaultAsync(r => r.Guid == guidRemision);
                Int32.TryParse(estado, out int estadoid);
                var estadoId = (await _context.Catalogo
                            .FirstOrDefaultAsync(a => a.Valor == estado || a.Id == estadoid && a.Grupo == CanonicalConstants.Grupos.EstadosRemision)).Id;

                switch (estadoId)
                {
                    case (int)ESTADOSREMISION.ANULAR:
                        remision.UsuarioAnula = "usuario anula";
                        remision.FechaAnulacion = DateTime.Now;
                        break;
                    case (int)ESTADOSREMISION.CERRAR:
                        if (remision.ImagenRemisionId == null)
                        {
                            throw new ApplicationException("Debe tener una remisión escaneada.");
                        }
                        break;
                    default:
                        break;
                }

                remision.EstadoId = estadoId;
                remision.FechaModifica = DateTime.Now;
                
                _context.Entry(remision).State = EntityState.Modified;

                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<bool> ActualizarObservacion(string observacion, Guid guidRemision, UsuarioDTO usuario)
        {
            try
            {
                var remision = await _context.Remision
                    .Where(r => r.Guid == guidRemision)
                    .FirstOrDefaultAsync();

                remision.Observacion = observacion;
                remision.FechaModifica = DateTime.Now;

                _context.Entry(remision).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<Tuple<int, IEnumerable<RemisionPendienteDTO>>> ConsultarRemisionesPendientes(Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                var query = await (from r in _context.Remision
                                   join rd in _context.RemisionDetalle on r.Id equals rd.RemisionId
                                   where r.Estado.Valor == CanonicalConstants.Estados.Remision.Pendiente
                                   select new RemisionPendienteDTO
                                   {
                                       RemisionId = r.Id,
                                       GuidRemision = r.Guid,
                                       OrdenTrabajoId = rd.OrdenTrabajo.Id,
                                       Cliente = rd.OrdenTrabajo.Cliente.NickName,
                                       Linea = rd.OrdenTrabajo.Linea.Nombre,
                                       Herramienta = rd.OrdenTrabajo.Herramienta.Nombre,
                                       Serial = rd.OrdenTrabajo.SerialHerramienta,
                                       DetalleSolicitud = rd.OrdenTrabajo.DetallesSolicitud,
                                       Estado = r.Estado.Valor,
                                       Fecha = r.FechaRegistro
                                   }).ToListAsync();


                var result = query.OrderByDescending(r => r.Fecha)
                                    .Skip(paginacion.RegistrosOmitir())
                                    .Take(paginacion.CantidadRegistros)
                                    .ToList();


                var cantidad = query.Count();


                return new Tuple<int, IEnumerable<RemisionPendienteDTO>>(cantidad, result);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Tuple<int, IEnumerable<RemisionPendienteDTO>>> ConsultarRemisionesPendientesPorFiltro(RemisionPendienteFiltroDTO remisionFiltro, UsuarioDTO usuario)
        {
            try
            {
                var query = await (from r in _context.Remision
                                   join rd in _context.RemisionDetalle on r.Id equals rd.RemisionId
                                   where r.Estado.Valor == CanonicalConstants.Estados.Remision.Pendiente
                                   && (string.IsNullOrEmpty(remisionFiltro.RemisionId) || r.Id.ToString().Contains(remisionFiltro.RemisionId.Trim()))
                                   && (string.IsNullOrEmpty(remisionFiltro.OrdenTrabajoId) || rd.OrdenTrabajo.Id.ToString().Contains(remisionFiltro.OrdenTrabajoId.Trim()))
                                   && (string.IsNullOrEmpty(remisionFiltro.Cliente) || rd.OrdenTrabajo.Cliente.NickName.Contains(remisionFiltro.Cliente.Trim()))
                                   && (string.IsNullOrEmpty(remisionFiltro.Herramienta) || rd.OrdenTrabajo.Herramienta.Nombre.Contains(remisionFiltro.Herramienta.Trim()))
                                   && (string.IsNullOrEmpty(remisionFiltro.Linea) || rd.OrdenTrabajo.Linea.Nombre.Contains(remisionFiltro.Linea.Trim()))
                                   && (string.IsNullOrEmpty(remisionFiltro.Serial) || rd.OrdenTrabajo.SerialHerramienta.Contains(remisionFiltro.Serial.Trim()))
                                   && (string.IsNullOrEmpty(remisionFiltro.DetalleSolicitud) || rd.OrdenTrabajo.DetallesSolicitud.Contains(remisionFiltro.DetalleSolicitud.Trim()))
                                   select new RemisionPendienteDTO
                                   {
                                       RemisionId = r.Id,
                                       GuidRemision = r.Guid,
                                       OrdenTrabajoId = rd.OrdenTrabajo.Id,
                                       Cliente = rd.OrdenTrabajo.Cliente.NickName,
                                       Linea = rd.OrdenTrabajo.Linea.Nombre,
                                       Herramienta = rd.OrdenTrabajo.Herramienta.Nombre,
                                       Serial = rd.OrdenTrabajo.SerialHerramienta,
                                       DetalleSolicitud = rd.OrdenTrabajo.DetallesSolicitud,
                                       Estado = r.Estado.Valor,
                                       Fecha = r.FechaRegistro
                                   }).ToListAsync();

                var result = query.OrderByDescending(r => r.Fecha)
                                    .Skip(remisionFiltro.RegistrosOmitir())
                                    .Take(remisionFiltro.CantidadRegistros)
                                    .ToList();


                var cantidad = query.Count();


                return new Tuple<int, IEnumerable<RemisionPendienteDTO>>(cantidad, result);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Guid> CrearRemision(Remision remision, UsuarioDTO usuario)
        {
            try
            {
                remision.Guid = Guid.NewGuid();
                remision.GuidUsuarioCrea = Guid.NewGuid();
                remision.NombreUsuarioCrea = "Nombre usuario crea";
                remision.FechaRegistro = DateTime.Now;

                _context.Remision.Add(remision);

                await _context.SaveChangesAsync();

                return remision.Guid;

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

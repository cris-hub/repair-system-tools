using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pemarsa.Data;
using Pemarsa.Domain;
using System.Linq;
using Pemarsa.CanonicalModels;

namespace HerramientaES.Repository
{
    internal class HerramientaRepository : IHerramientaRepository
    {
        private readonly PemarsaContext _context;

        public HerramientaRepository(DbContext context)
        {
            _context = (PemarsaContext)context;
        }

        public async Task<bool> ActualizarHerramienta(Herramienta herramienta, UsuarioDTO usuario)
        {
            try
            {
                var herramientaBD = await _context.Herramienta.AsNoTracking()
                                    .Include(c => c.Materiales).ThenInclude(d => d.Material)
                                    .Include(c => c.TamanosHerramienta)
                                    .Include(c => c.TamanosMotor)
                                    .Include(c => c.HerramientaEstudioFactibilidad)
                                    .SingleOrDefaultAsync(c => c.Id == herramienta.Id);

                _context.Entry(herramientaBD).CurrentValues.SetValues(herramienta);

                #region Actualizar Materiales


                //se obtinen los tamaños que fueron eliminados en el objeto herramienta que se recibe del cliente.
                var materiales = herramienta.Materiales.Select(d => new HerramientaMaterial()
                {
                    MaterialId = d.MaterialId,
                    HerramientaId = herramientaBD.Id,
                    Guid = Guid.NewGuid(),
                    GuidOrganizacion = Guid.NewGuid(),
                    Estado = true,
                    GuidUsuarioCrea = Guid.NewGuid(),
                    NombreUsuarioCrea = "admin"
                }).Where(d => !herramientaBD.Materiales.Any(e=>e.Guid ==d.Guid) ).ToList();



                _context.HerramientaMaterial.AddRange(materiales);

                #endregion

                #region Actualizar TamanosHerramienta
                herramientaBD.TamanosHerramienta = herramienta.TamanosHerramienta;
                var tamanosHerramienta = herramientaBD.TamanosHerramienta;


                herramienta.TamanosHerramienta = herramienta.TamanosHerramienta ?? new List<HerramientaTamano>();
                herramientaBD.TamanosHerramienta = herramientaBD.TamanosHerramienta ?? new List<HerramientaTamano>();
                //se obtinen los tamaños que fueron eliminados en el objeto herramienta que se recibe del cliente.
                var TamanosHerramientaEliminar = (from hbd in herramientaBD.TamanosHerramienta
                                                  where !herramienta.TamanosHerramienta.Any(x => x.Id == hbd.Id && x.Guid == hbd.Guid && hbd.Estado.Equals(true))
                                                  select hbd).ToList();

                //se obtinen los tamaños que fueron agregados en el objeto herramienta que se recibe del cliente.
                var TamanosHerramientaInsertar = (from hbd in herramienta.TamanosHerramienta
                                                  where !herramientaBD.TamanosHerramienta.Any(x => x.Id == hbd.Id && x.Guid == hbd.Guid && hbd.Estado.Equals(true))
                                                  select hbd).ToList();

                herramientaBD.TamanosHerramienta.ToList().ForEach(e =>
                {

                    TamanosHerramientaEliminar.ForEach(ef =>
                    {
                        if (e.Id == ef.Id) { e.Estado = false; }
                    });
                    HerramientaTamanoMotor hbd = (herramientaBD.TamanosMotor.FirstOrDefault(a => a.Id == e.Id));
                    HerramientaTamanoMotor h = (herramienta.TamanosMotor.FirstOrDefault(a => a.Id == e.Id));
                    //campos a actulizar
                    e.Tamano = (h != null) ? h.Tamano : hbd.Tamano;
                });

                TamanosHerramientaInsertar.ForEach(e => { e.Guid = Guid.NewGuid(); e.FechaRegistro = DateTime.Now; e.HerramientaId = herramientaBD.Id; });


                _context.HerramientaTamano.AddRange(TamanosHerramientaInsertar);

                #endregion

                #region Actualizar TamanosMotor
                herramienta.TamanosMotor = herramienta.TamanosMotor ?? new List<HerramientaTamanoMotor>();
                herramientaBD.TamanosMotor = herramientaBD.TamanosMotor ?? new List<HerramientaTamanoMotor>();
                //se obtinen los tamaños que fueron eliminados en el objeto herramienta que se recibe del cliente.
                var tamanosMotoEliminar = (from hbd in herramientaBD.TamanosMotor
                                           where !herramienta.TamanosMotor.Any(x => x.Id == hbd.Id && x.Guid == hbd.Guid && hbd.Estado.Equals(true))
                                           select hbd).ToList();

                //se obtinen los tamaños que fueron agregados en el objeto herramienta que se recibe del cliente.
                var tamanosMotorInsertar = (from hbd in herramienta.TamanosMotor
                                            where !herramientaBD.TamanosMotor.Any(x => x.Id == hbd.Id && x.Guid == hbd.Guid && hbd.Estado.Equals(true))
                                            select hbd).ToList();

                herramientaBD.TamanosMotor.ToList().ForEach(e =>
                {

                    tamanosMotoEliminar.ForEach(ef =>
                    {
                        if (e.Id == ef.Id) { e.Estado = false; }
                    });
                    HerramientaTamanoMotor hbd = (herramientaBD.TamanosMotor.FirstOrDefault(a => a.Id == e.Id));
                    HerramientaTamanoMotor h = (herramienta.TamanosMotor.FirstOrDefault(a => a.Id == e.Id));
                    //campos a actulizar
                    e.Tamano = (h != null) ? h.Tamano : hbd.Tamano;
                });

                tamanosMotorInsertar.ForEach(e => { e.Guid = Guid.NewGuid(); e.FechaRegistro = DateTime.Now; e.HerramientaId = herramientaBD.Id; });

                _context.HerramientaTamanoMotor.UpdateRange(herramientaBD.TamanosMotor);
                _context.HerramientaTamanoMotor.AddRange(tamanosMotorInsertar);
                #endregion

                herramientaBD.HerramientaEstudioFactibilidad.Admin = herramienta.HerramientaEstudioFactibilidad.Admin;
                herramientaBD.HerramientaEstudioFactibilidad.ManoObra = herramienta.HerramientaEstudioFactibilidad.ManoObra;
                herramientaBD.HerramientaEstudioFactibilidad.Mantenimiento = herramienta.HerramientaEstudioFactibilidad.Mantenimiento;
                herramientaBD.HerramientaEstudioFactibilidad.Maquina = herramienta.HerramientaEstudioFactibilidad.Maquina;
                herramientaBD.HerramientaEstudioFactibilidad.Material = herramienta.HerramientaEstudioFactibilidad.Material;
                herramientaBD.HerramientaEstudioFactibilidad.Metodo = herramienta.HerramientaEstudioFactibilidad.Metodo;
                herramientaBD.HerramientaEstudioFactibilidad.FechaModifica = DateTime.Now; ;

                _context.HerramientaEstudioFactibilidad.Update(herramientaBD.HerramientaEstudioFactibilidad);
                herramientaBD.FechaModifica = DateTime.Now;
                _context.Entry(herramientaBD).Property("FechaRegistro").IsModified = false;
                _context.Entry(herramientaBD).Property("NombreUsuarioCrea").IsModified = false;
                _context.Entry(herramientaBD).Property("GuidUsuarioCrea").IsModified = false;

                _context.Entry(herramientaBD).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;


            }
            catch (Exception e) { throw e; }
        }

        public async Task<Herramienta> ConsultarHerramientaPorGuid(Guid guidHerramienta, UsuarioDTO usuario)
        {
            try
            {
                return await _context.Herramienta
                            .Include(c => c.Materiales).ThenInclude(d => d.Material)
                            .Include(c => c.TamanosHerramienta)
                            .Include(c => c.TamanosMotor)
                            .Include(c => c.HerramientaEstudioFactibilidad)
                            .Include(c => c.Estado)
                            .Include(c => c.Cliente)
                            .Include(c => c.Linea)
                            .FirstOrDefaultAsync(c => c.Guid == guidHerramienta);
            }
            catch (Exception) { throw; }
        }

        public async Task<Herramienta> ConsultarHerramientaPorId(int id, UsuarioDTO usuario)
        {
            try
            {
                return await _context.Herramienta
                            .Include(c => c.Materiales)
                            .Include(c => c.TamanosHerramienta)
                            .Include(c => c.TamanosMotor)
                            .Include(c => c.HerramientaEstudioFactibilidad)
                            .Include(c => c.Estado)
                            .Include(c => c.Cliente)
                            .Include(c => c.Linea)
                            .FirstOrDefaultAsync(c => c.Id == id);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientas(Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                var result = await _context.Herramienta
                                    .Include(c => c.Materiales).ThenInclude(c => c.Material)
                                    .Include(c => c.TamanosHerramienta)
                                    .Include(c => c.TamanosMotor)
                                    .Include(c => c.HerramientaEstudioFactibilidad)
                                    .Include(c => c.Estado)
                                    .Include(c => c.Cliente)
                                    .Include(c => c.Linea)
                                    .Skip(paginacion.RegistrosOmitir())
                                    .Take(paginacion.CantidadRegistros)
                                    .ToListAsync();
                var cantidad = await _context.Herramienta.CountAsync();
                return new Tuple<int, IEnumerable<Herramienta>>(cantidad, result);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientasPorFiltro(ParametrosHerramientasDTO parametrosHerramientasDTO, UsuarioDTO usuario)
        {
            try
            {
                var query = _context.Herramienta
                                    .Include(c => c.Materiales)
                                    .Include(c => c.TamanosHerramienta)
                                    .Include(c => c.TamanosMotor)
                                    .Include(c => c.HerramientaEstudioFactibilidad)
                                    .Include(c => c.Estado)
                                    .Include(c => c.Cliente)
                                    .Include(c => c.Linea)
                                    .Where(e => (string.IsNullOrEmpty(parametrosHerramientasDTO.Nombre) || e.Nombre.Contains(parametrosHerramientasDTO.Nombre))
                                            );

                var queryPagination = await query
                    .OrderBy(e => e.Id)
                    .Skip(parametrosHerramientasDTO.RegistrosOmitir())
                    .Take(parametrosHerramientasDTO.CantidadRegistros)
                    .ToListAsync();

                var cantidad = query.Count();
                return new Tuple<int, IEnumerable<Herramienta>>(cantidad, queryPagination);
            }
            catch (Exception) { throw; }
        }

        public async Task<IEnumerable<Herramienta>> ConsultarHerramientasPorGuidCliente(Guid guidCliente, UsuarioDTO usuario)
        {
            try
            {
                return await (from h in _context.Herramienta
                              join c in _context.Cliente on h.ClienteId equals c.Id
                              where c.Guid == guidCliente
                              select h)
                          .Include(c => c.Materiales)
                          .Include(c => c.TamanosHerramienta)
                          .Include(c => c.TamanosMotor)
                          .Include(c => c.HerramientaEstudioFactibilidad)
                          .Include(c => c.Estado)
                          .Include(c => c.Cliente)
                          .Include(c => c.Linea)
                          .ToListAsync();
            }
            catch (Exception) { throw; }
        }

        public async Task<Guid> CrearHerramienta(Herramienta herramienta, UsuarioDTO usuario)
        {
            try
            {
                herramienta.Guid = Guid.NewGuid();
                herramienta.FechaRegistro = DateTime.Now;

                herramienta.HerramientaEstudioFactibilidad.Guid = Guid.NewGuid();
                herramienta.HerramientaEstudioFactibilidad.FechaRegistro = DateTime.Now;
                herramienta.HerramientaEstudioFactibilidad.NombreUsuarioCrea = "admin";
                if (herramienta.Materiales != null)
                {
                    foreach (HerramientaMaterial HMaterial in herramienta.Materiales)
                    {
                        Catalogo Material = await _context.Catalogo.FirstOrDefaultAsync(c => c.Id == HMaterial.Id);

                        HMaterial.Material = Material;
                        HMaterial.Guid = Guid.NewGuid();
                        HMaterial.FechaRegistro = DateTime.Now;
                    }
                }
                if (herramienta.TamanosHerramienta != null)
                {
                    foreach (HerramientaTamano HTamano in herramienta.TamanosHerramienta)
                    {
                        HTamano.Guid = Guid.NewGuid();
                        HTamano.FechaRegistro = DateTime.Now;
                    }
                }
                if (herramienta.TamanosMotor != null)
                {
                    foreach (HerramientaTamanoMotor HTamanom in herramienta.TamanosMotor)
                    {
                        HTamanom.Guid = Guid.NewGuid();
                        HTamanom.FechaRegistro = DateTime.Now;
                    }
                }
                _context.Herramienta.Add(herramienta);
                await _context.SaveChangesAsync();
                return herramienta.Guid;
            }
            catch (Exception e) { throw e; }
        }
    }
}

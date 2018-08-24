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
                /*actualiza el estado los materiales de la base de datos*/
                foreach (var MaterialesDB in herramientaBD.Materiales)
                {

                    if (!herramienta.Materiales.Any(dNew => dNew.Id == MaterialesDB.Id && dNew.Estado.Equals(true)))
                    {
                        MaterialesDB.Estado = false;
                        MaterialesDB.FechaModifica = DateTime.Now;
                        _context.HerramientaMaterial.Update(MaterialesDB);
                    }
                }

                /*Agrega Materiales*/
                foreach (var materiales in herramienta.Materiales)
                {
                    if (herramientaBD.Materiales.Where(m => m.MaterialId == materiales.MaterialId && m.Estado.Equals(false)).Any())
                    {
                        var actualizarMaterial = herramientaBD.Materiales.Where(m => m.MaterialId == materiales.MaterialId && m.Estado.Equals(false)).FirstOrDefault();
                        actualizarMaterial.FechaModifica = DateTime.Now;
                        actualizarMaterial.Estado = true;
                        _context.HerramientaMaterial.Update(actualizarMaterial);
                    }
                    else if (!herramientaBD.Materiales.Any(ddb => ddb.Id == materiales.Id))
                    {
                        materiales.Herramienta = null;
                        materiales.HerramientaId = herramientaBD.Id;
                        materiales.Guid = Guid.NewGuid();
                        materiales.FechaRegistro = DateTime.Now;
                        materiales.Material = null;
                        _context.HerramientaMaterial.Add(materiales);
                    }
                }

                #endregion

                if (herramienta.EsHerramientaMotor == false)
                {
                    //foreach (var tamanosHerrmienta in herramientaBD.TamanosHerramienta)
                    //{
                    //    tamanosHerrmienta.Estado = false;
                    //    tamanosHerrmienta.FechaModifica = DateTime.Now;
                    //    _context.HerramientaTamano.Update(tamanosHerrmienta);
                    //}
                    foreach (var tamanosMotor in herramientaBD.TamanosMotor)
                    {
                        tamanosMotor.Estado = false;
                        tamanosMotor.FechaModifica = DateTime.Now;
                        _context.HerramientaTamanoMotor.Update(tamanosMotor);
                    }
                }
                else
                {

                    #region Actualizar TamanosMotor

                    /*Acualiza el estado a false los tamaños de motor de la base de datos*/
                    foreach (var tamanosMotor in herramientaBD.TamanosMotor)
                    {

                        if (!herramienta.TamanosMotor.Any(dNew => dNew.Id == tamanosMotor.Id))
                        {
                            tamanosMotor.Estado = false;
                            tamanosMotor.FechaModifica = DateTime.Now;
                            _context.HerramientaTamanoMotor.Update(tamanosMotor);
                        }
                    }

                    /*Agrega tamaños de motor, si ya existe solo le cambia el estado a true y si no existe crea un nuevo tamaño de motor */
                    foreach (var tamanosMotorAdd in herramienta.TamanosMotor)
                    {

                        if (herramientaBD.TamanosMotor.Where(th => th.Tamano.ToLower() == tamanosMotorAdd.Tamano.ToLower() && th.Estado.Equals(false)).Any())
                        {
                            var actualizarTamanoMotor = herramientaBD.TamanosMotor.Where(th => th.Tamano.ToLower() == tamanosMotorAdd.Tamano.ToLower() && th.Estado.Equals(false)).FirstOrDefault();
                            actualizarTamanoMotor.FechaModifica = DateTime.Now;
                            actualizarTamanoMotor.Estado = true;
                            _context.HerramientaTamanoMotor.Update(actualizarTamanoMotor);
                        }
                        else if (!herramientaBD.TamanosMotor.Any(ddb => ddb.Id == tamanosMotorAdd.Id))
                        {
                            tamanosMotorAdd.Herramienta = null;
                            tamanosMotorAdd.HerramientaId = herramientaBD.Id;
                            tamanosMotorAdd.Guid = Guid.NewGuid();
                            tamanosMotorAdd.FechaRegistro = DateTime.Now;
                            _context.HerramientaTamanoMotor.Add(tamanosMotorAdd);
                        }
                    }
                    #endregion

                }

                #region Actualizar TamanosHerramienta


                /*actaliza el estado los tamaños de herramienta de la base de datos*/
                foreach (var tamanosHerrmienta in herramientaBD.TamanosHerramienta)
                {

                    if (!herramienta.TamanosHerramienta.Any(dNew => dNew.Id == tamanosHerrmienta.Id))
                    {
                        tamanosHerrmienta.Estado = false;
                        tamanosHerrmienta.FechaModifica = DateTime.Now;
                        _context.HerramientaTamano.Update(tamanosHerrmienta);
                    }
                }

                /*Agrega tamaños de herramienta*/
                foreach (var tamanosHerrmientaAdd in herramienta.TamanosHerramienta)
                {
                    if (herramientaBD.TamanosHerramienta.Where(th => th.Tamano.ToLower() == tamanosHerrmientaAdd.Tamano.ToLower() && th.Estado.Equals(false)).Any())
                    {
                        var actualizarTamanoHerramienta = herramientaBD.TamanosHerramienta.Where(th => th.Tamano.ToLower() == tamanosHerrmientaAdd.Tamano.ToLower() && th.Estado.Equals(false)).FirstOrDefault();
                        actualizarTamanoHerramienta.FechaModifica = DateTime.Now;
                        actualizarTamanoHerramienta.Estado = true;
                        _context.HerramientaTamano.Update(actualizarTamanoHerramienta);
                    }
                    else if (!herramientaBD.TamanosHerramienta.Any(ddb => ddb.Id == tamanosHerrmientaAdd.Id))
                    {
                        tamanosHerrmientaAdd.Herramienta = null;
                        tamanosHerrmientaAdd.HerramientaId = herramientaBD.Id;
                        tamanosHerrmientaAdd.Guid = Guid.NewGuid();
                        tamanosHerrmientaAdd.FechaRegistro = DateTime.Now;
                        _context.HerramientaTamano.Add(tamanosHerrmientaAdd);
                    }
                }

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

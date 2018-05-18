﻿using System;
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

        public async Task<bool> ActualizarHerramienta(Herramienta herramienta)
        {
            try
            {
                var herramientaBD = await _context.Herramienta
                                    .Include(c => c.TamanosHerramienta)
                                    .Include(c => c.TamanosMotor)
                                    .Include(c => c.HerramientaEstudioFactibilidad)
                                    .SingleOrDefaultAsync(c => c.Id == herramienta.Id);

                _context.Entry(herramientaBD).CurrentValues.SetValues(herramienta);
                #region Actualizar TamanosHerramienta
                herramienta.TamanosHerramienta = herramienta.TamanosHerramienta ?? new List<HerramientaTamano>();
                herramientaBD.TamanosHerramienta = herramientaBD.TamanosHerramienta ?? new List<HerramientaTamano>();
                //se obtinen los tamaños que fueron eliminados en el objeto herramienta que se recibe del cliente.
                var tamanosEliminar = (from hbd in herramientaBD.TamanosHerramienta
                                     where !herramienta.TamanosHerramienta.Any(x => x.Id == hbd.Id && x.Guid == hbd.Guid && hbd.Estado.Equals(true))
                                     select hbd).ToList();

                //se obtinen los tamaños que fueron agregados en el objeto herramienta que se recibe del cliente.
                var tamanosInsertar = (from hbd in herramienta.TamanosHerramienta
                                       where !herramientaBD.TamanosHerramienta.Any(x => x.Id == hbd.Id && x.Guid == hbd.Guid && hbd.Estado.Equals(true))
                                       select hbd).ToList();

                herramientaBD.TamanosHerramienta.ToList().ForEach(e => {
                    
                    tamanosEliminar.ForEach(ef => {
                        if (e.Id == ef.Id) { e.Estado = false; }
                    });
                    HerramientaTamano hbd = (herramientaBD.TamanosHerramienta.FirstOrDefault(a => a.Id == e.Id));
                    HerramientaTamano h = (herramienta.TamanosHerramienta.FirstOrDefault(a => a.Id == e.Id));
                    //campos a actulizar
                    e.Tamano = (h != null) ? h.Tamano : hbd.Tamano;
                });

                tamanosInsertar.ForEach(e => { e.Guid = Guid.NewGuid(); e.FechaRegistro = DateTime.Now; e.HerramientaId = herramientaBD.Id; });
             
                _context.HerramientaTamano.UpdateRange(herramientaBD.TamanosHerramienta);
                _context.HerramientaTamano.AddRange(tamanosInsertar);
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

                herramientaBD.TamanosMotor.ToList().ForEach(e => {

                    tamanosMotoEliminar.ForEach(ef => {
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

                herramientaBD.FechaModifica = DateTime.Now;
                
                _context.Entry(herramientaBD).State = EntityState.Modified;
                return await _context.SaveChangesAsync() > 0;


            }
            catch (Exception) { throw; }
        }

        public async Task<Herramienta> ConsultarHerramientaPorGuid(Guid guidHerramienta)
        {
            try
            {
                return await _context.Herramienta
                            .Include(c => c.TamanosHerramienta)
                            .Include(c => c.TamanosMotor)
                            .Include(c => c.HerramientaEstudioFactibilidad)
                            .Include(c => c.Estado)
                            .Include(c => c.Cliente)
                            .FirstOrDefaultAsync(c => c.Guid == guidHerramienta);
            }
            catch (Exception) { throw; } 
        }

        public async Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientas(Paginacion paginacion)
        {
            try
            {
                var result = await _context.Herramienta
                                    .Include(c => c.TamanosHerramienta)
                                    .Include(c => c.TamanosMotor)
                                    .Include(c => c.HerramientaEstudioFactibilidad)
                                    .Include(c => c.Estado)
                                    .Include(c => c.Cliente)
                                    .Skip(paginacion.RegistrosOmitir())
                                    .Take(paginacion.CantidadRegistros)
                                    .ToListAsync();
                var cantidad = await _context.Herramienta.CountAsync();
                return new Tuple<int, IEnumerable<Herramienta>>(cantidad, result);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientasPorFiltro(ParametrosHerramientasDTO parametrosHerramientasDTO)
        {
            try
            {
                var query = _context.Herramienta
                                    .Include(c => c.TamanosHerramienta)
                                    .Include(c => c.TamanosMotor)
                                    .Include(c => c.HerramientaEstudioFactibilidad)
                                    .Include(c => c.Estado)
                                    .Include(c => c.Cliente)
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

        public async Task<IEnumerable<Herramienta>> ConsultarHerramientasPorGuidCliente(Guid guidCliente)
        {
            try {
                    return await (from h in _context.Herramienta
                              join c in _context.Cliente on h.ClienteId equals c.Id
                              where c.Guid == guidCliente
                              select h)
                              .Include(c => c.TamanosHerramienta)
                              .Include(c => c.TamanosMotor)
                              .Include(c => c.HerramientaEstudioFactibilidad)
                              .Include(c => c.Estado)
                              .Include(c => c.Cliente)
                              .ToListAsync();
            }
            catch (Exception) { throw; }  
        }

        public async Task<Guid> CrearHerramienta(Herramienta herramienta)
        {
            try
            {
                herramienta.Guid = Guid.NewGuid();
                herramienta.FechaRegistro = DateTime.Now;
                if (herramienta.TamanosHerramienta != null) {
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
            catch (Exception) { throw; }
        }
    }
}

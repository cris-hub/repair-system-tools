using Microsoft.EntityFrameworkCore;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FormatoES.Repository
{
    internal class FormatoRepository : IFormatoRepository
    {
        private readonly PemarsaContext _context;

        public FormatoRepository(DbContext context)
        {
            _context = (PemarsaContext)context;
        }

        public async Task<Guid> CrearFormato(Formato formato)
        {
            try
            {
                formato.Guid = Guid.NewGuid();
                formato.GuidUsuarioCrea = Guid.NewGuid();
                formato.NombreUsuarioCrea = "USUARIO CREA";
                formato.FechaRegistro = new DateTime();

                
                _context.Formato.Add(formato);




                await _context.SaveChangesAsync();
                return formato.Guid;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        public async Task<bool> ActualizarFormato(Formato formato)
        {
            try
            {
                _context.Formato.Update(formato);
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception) { throw; }
        }
        public async Task<Formato> ConsultarFormatoPorGuid(Guid guidformato)
        {
            try
            {
                return await _context.Formato
                    .Include(f => f.Adendum)
                    .Include(f => f.Herramienta)
                    .Include(f => f.Parametros)
                    .FirstOrDefaultAsync(f => f.Guid == guidformato);
            }
            catch (Exception) { throw; }
        }
        public async Task<Tuple<int, ICollection<Formato>>> ConsultarFormatos(Paginacion paginacion)
        {
            try
            {
                var result = await _context.Formato
                                    .Include(c => c.Adendum)
                                    .Include(c => c.Parametros)
                                    .Include(c => c.Planos)
                                    .Include(c => c.Herramienta)
                                    .Skip(paginacion.RegistrosOmitir())
                                    .Take(paginacion.CantidadRegistros).ToListAsync();
                var cantidad = await _context.Cliente.CountAsync();
                return new Tuple<int, ICollection<Formato>>(cantidad, result);
            }
            catch (Exception e) { throw e; }
        }

        public async Task<Tuple<int, ICollection<Formato>>> ConsultarFormatosPorFiltro(ParametrosDTO parametrosDTO)
        {
            var query =  _context.Formato
                .Include(f => f.Herramienta)
                .Include(f => f.Planos)
                .Include(f => f.TipoFormato)
                .Include(f => f.Conexion)
                .Include(f => f.TipoFormato)
                .Include(f => f.Adendum)
                .Include(f => f.Parametros)
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.HerramientaId) ||f.Herramienta.Id == Int32.Parse(parametrosDTO.HerramientaId)))
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.HerramientaId) || f.Herramienta.Nombre.ToLower().Contains(parametrosDTO.HerramientaId.ToLower())))
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.Conexion) ||f.Conexion.Valor.ToLower().Contains(parametrosDTO.Conexion.ToLower())))
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.HerramientaGuid) || f.Conexion.Guid.ToString().Contains(parametrosDTO.HerramientaGuid)))
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.TipoConexion) || f.TipoFormatoId.ToString().Contains(parametrosDTO.TipoConexion)))
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.TipoConexion) || f.TipoFormato.Valor.ToLower().Contains(parametrosDTO.TipoConexion.ToLower())));


            ;
            var paginacion = await query.OrderBy(f => f.FechaRegistro).ToListAsync();
            var cantidad = await query.CountAsync();
            return new Tuple<int, ICollection<Formato>>(cantidad, paginacion);
        }

        public async Task<Formato> ConsultarFormatoPorGuidHerramienta(Guid guidHerramienta)
        {
            try
            {
                return await _context.Formato
                    .Include(f => f.Adendum)
                    .Include(f => f.Herramienta)
                    .FirstOrDefaultAsync(f => f.Herramienta.Guid == guidHerramienta);
            }
            catch (Exception) { throw; }
        }

        public async Task<ICollection<Formato>> ConsultarFormatoPorTipoConexion(int tipoConexion)
        {
            try
            {
                return await _context.Formato
                    .Include(f => f.Adendum)
                    .Include(f => f.Herramienta)
                    .Where(f => f.TiposConexionesId == tipoConexion)
                    .ToListAsync();
                    
            }
            catch (Exception) { throw; }
        }
    }
}

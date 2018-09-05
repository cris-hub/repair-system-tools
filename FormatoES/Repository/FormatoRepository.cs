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

        public async Task<Guid> CrearFormato(Formato formato, UsuarioDTO usuario)
        {
            try
            {

                if (formato.FormatoTiposConexion != null)
                {
                    foreach (var tipo in formato.FormatoTiposConexion)
                    {

                        _context.Entry(tipo.TipoConexion).State = EntityState.Detached;
                        _context.Entry(tipo).State = tipo.Id <= 0 ? EntityState.Added : EntityState.Modified;

                    }
                }

                if (formato.Codigo != null)
                {

                    var exitesCodigo = await _context.Formato.AnyAsync(d => d.Codigo == formato.Codigo);
                    if (exitesCodigo)
                    {
                        throw new Exception("El codigo de para este formato ya existe, por favor intente otro");
                    }
                }
                formato.Guid = Guid.NewGuid();
                formato.GuidUsuarioCrea = Guid.NewGuid();
                formato.NombreUsuarioCrea = "USUARIO CREA";
                formato.FechaRegistro = DateTime.Now;


                _context.Formato.Add(formato);




                await _context.SaveChangesAsync();
                return formato.Guid;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<bool> ActualizarFormato(Formato formato, UsuarioDTO usuario)
        {
            try
            {
                var existeFormato = _context.Formato.Where(f => f.Codigo.ToLower() == formato.Codigo.ToLower());
                var validar = existeFormato.Where(f => f.Guid != formato.Guid).Count();
                if (validar > 0)
                {
                    throw new ApplicationException("Ya existe un formato registrado con el mismo nombre.");
                }


                foreach (var FormatoFormatoParametro in formato.FormatoFormatoParametro)
                {


                    if (FormatoFormatoParametro.FormatoParametro.Id <= 0)
                    {

                        _context.Entry(FormatoFormatoParametro.FormatoParametro).State = EntityState.Added;
                        _context.Entry(FormatoFormatoParametro).State = EntityState.Added;


                    }
                    else
                    {
                        _context.Entry(FormatoFormatoParametro.FormatoParametro).State = EntityState.Modified;
                        _context.Entry(FormatoFormatoParametro).State = EntityState.Modified;



                    }


                }
                if (formato.Adendum != null)
                {


                    foreach (var Adendum in formato.Adendum)
                    {
                        if (!(Adendum.Id <= 0))
                        {
                            _context.Entry(Adendum).State = EntityState.Modified;
                            _context.FormatoAdendum.Update(Adendum);

                        }
                        else
                        {
                            _context.Entry(Adendum).State = EntityState.Added;
                            _context.FormatoAdendum.Add(Adendum);
                        }
                    }
                }


                formato.Version += 1;
                _context.Entry(formato).State = EntityState.Modified;





                if (formato.FormatoTiposConexion != null)
                {
                    foreach (var tipoConexion in formato.FormatoTiposConexion)
                    {
                        _context.Entry(tipoConexion.TipoConexion).State = EntityState.Detached;


                        _context.Entry(tipoConexion).State = tipoConexion.Id <= 0 ? EntityState.Added : EntityState.Modified;


                    }
                }
                if (formato.Herramienta != null)
                {
                    _context.Entry(formato.Herramienta).State = EntityState.Unchanged;

                }
                if (formato.TipoFormato != null)
                {
                    _context.Entry(formato.TipoFormato).State = EntityState.Unchanged;

                }
                if (formato.Conexion != null)
                {
                    _context.Entry(formato.Conexion).State = EntityState.Unchanged;

                }




                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception) { throw; }
        }

        public async Task<Formato> ConsultarFormatoPorGuid(Guid guidformato, UsuarioDTO usuario)
        {
            try
            {
                return await _context.Formato
                    .Include(f => f.Adendum)
                    .Include(f => f.Herramienta)
                    .Include(f => f.Planos)
                    .Include(f => f.TipoFormato)
                    .Include(f => f.Adjunto)
                    .Include(f => f.FormatoTiposConexion).ThenInclude(ftc => ftc.TipoConexion)

                    .Include(f => f.FormatoFormatoParametro).ThenInclude(t => t.FormatoParametro)
                    .FirstOrDefaultAsync(f => f.Guid == guidformato);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, ICollection<Formato>>> ConsultarFormatos(Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                var query = _context.Formato.AsNoTracking()
                                    .Include(c => c.Adjunto)
                                    .Include(c => c.Adendum)
                                    .Include(c => c.FormatoFormatoParametro).ThenInclude(d => d.FormatoParametro)
                                    .Include(c => c.Planos)



                                    .Include(c => c.Herramienta);

                var result = await query
                                    .Skip(paginacion.RegistrosOmitir())
                                    .Take(paginacion.CantidadRegistros).ToListAsync();

                var cantidad = await _context.Cliente.CountAsync();
                return new Tuple<int, ICollection<Formato>>(cantidad, result);
            }
            catch (Exception e) { throw e; }
        }

        public async Task<Tuple<int, ICollection<Formato>>> ConsultarFormatosPorFiltro(ParametrosDTO parametrosDTO, UsuarioDTO usuario)
        {

            var query = _context.Formato
                .Include(f => f.Herramienta)
                .Include(f => f.Planos)
                .Include(f => f.TipoFormato)
                .Include(f => f.Conexion)
                .Include(f => f.TipoFormato)
                .Include(f => f.Adendum)
                .Include(f => f.FormatoFormatoParametro)
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.HerramientaId) || f.Herramienta.Id == Int32.Parse(parametrosDTO.HerramientaId))
                        && (string.IsNullOrEmpty(parametrosDTO.Codigo) || f.Codigo.ToLower().Contains(parametrosDTO.Codigo.ToLower()))
                        && (string.IsNullOrEmpty(parametrosDTO.FechaCreacion) || f.FechaRegistro.ToString().Contains(parametrosDTO.FechaCreacion))
                        && (string.IsNullOrEmpty(parametrosDTO.HerramientaId) || f.Herramienta.Nombre.ToLower().Contains(parametrosDTO.HerramientaId.ToLower()))
                        && (string.IsNullOrEmpty(parametrosDTO.Conexion) || f.Conexion.Valor.ToLower().Contains(parametrosDTO.Conexion.ToLower()))
                        && (string.IsNullOrEmpty(parametrosDTO.HerramientaGuid) || f.Conexion.Guid.ToString().Contains(parametrosDTO.HerramientaGuid))
                        && (string.IsNullOrEmpty(parametrosDTO.TipoConexion) || f.TipoFormatoId.ToString().Contains(parametrosDTO.TipoConexion))
                        && (string.IsNullOrEmpty(parametrosDTO.TipoConexion) || f.TipoFormato.Valor.ToLower().Contains(parametrosDTO.TipoConexion.ToLower())));


            /*
            var query = _context.Formato
                .Include(f => f.Herramienta)
                .Include(f => f.Planos)
                .Include(f => f.TipoFormato)
                .Include(f => f.Conexion)
                .Include(f => f.TipoFormato)
                .Include(f => f.Adendum)
                .Include(f => f.FormatoFormatoParametro)
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.HerramientaId) || f.Herramienta.Id == Int32.Parse(parametrosDTO.HerramientaId)))
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.HerramientaId) || f.Herramienta.Nombre.ToLower().Contains(parametrosDTO.HerramientaId.ToLower())))
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.Conexion) || f.Conexion.Valor.ToLower().Contains(parametrosDTO.Conexion.ToLower())))
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.HerramientaGuid) || f.Conexion.Guid.ToString().Contains(parametrosDTO.HerramientaGuid)))
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.TipoConexion) || f.TipoFormatoId.ToString().Contains(parametrosDTO.TipoConexion)))
                .Where(f => (string.IsNullOrEmpty(parametrosDTO.TipoConexion) || f.TipoFormato.Valor.ToLower().Contains(parametrosDTO.TipoConexion.ToLower())));*/



            var paginacion = await query.OrderBy(f => f.FechaRegistro).ToListAsync();
            var cantidad = await query.CountAsync();
            return new Tuple<int, ICollection<Formato>>(cantidad, paginacion);
        }

        public async Task<Formato> ConsultarFormatoPorGuidHerramienta(Guid guidHerramienta, UsuarioDTO usuario)
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

        public async Task<ICollection<Formato>> ConsultarFormatoPorTipoConexion(int tipoConexion, UsuarioDTO usuario)
        {
            try
            {
                var query = _context.Formato
                    .Include(f => f.Adendum)
                    .Include(f => f.Herramienta)
                    .Include(f => f.FormatoTiposConexion).ThenInclude(fc => fc.TipoConexion).Where(d => d.FormatoTiposConexion.Any(dr => dr.TipoConexionId == tipoConexion)).ToListAsync();


                return await query;




            }
            catch (Exception) { throw; }
        }

        public async Task<Formato> ConsultarFormatoPorInspeccionConexion(InspeccionConexion inspeccionConexion, UsuarioDTO usuarioDTO)
        {
            try
            {
                var query = _context.Formato
                    .Include(d => d.Adendum)
                    .Include(d => d.Planos)
                    .Include(d => d.Adjunto)
                    .Include(t => t.FormatoTiposConexion)
                    .Include(t => t.FormatoFormatoParametro).ThenInclude(a => a.FormatoParametro);
                if (inspeccionConexion.TipoConexionId == 111 || inspeccionConexion.TipoConexionId == null)
                {

                    Formato formato = await query.FirstOrDefaultAsync(t => t.ConexionId == inspeccionConexion.ConexionId );
                    return formato;
                }
                else {
                    Formato formato = await query.FirstOrDefaultAsync(t => t.ConexionId == inspeccionConexion.ConexionId && t.FormatoTiposConexion.Any(d => d.TipoConexionId == inspeccionConexion.TipoConexionId && d.Estado == true));
                    return formato;
                }

                throw new NotImplementedException();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

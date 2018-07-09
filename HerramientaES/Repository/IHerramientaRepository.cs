using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HerramientaES.Repository
{
    public interface IHerramientaRepository
    {
        Task<Guid> CrearHerramienta( Herramienta herramienta,UsuarioDTO usuario);
        Task<IEnumerable<Herramienta>> ConsultarHerramientasPorGuidCliente(Guid guidCliente, UsuarioDTO usuario);
        Task<Herramienta> ConsultarHerramientaPorGuid(Guid guidHerramienta, UsuarioDTO usuario);
        Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientas(Paginacion paginacion, UsuarioDTO usuario);
        Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientasPorFiltro(ParametrosHerramientasDTO parametrosHerramientasDTO, UsuarioDTO usuario);
        Task<bool> ActualizarHerramienta(Herramienta herramienta, UsuarioDTO usuario);
        Task<Herramienta> ConsultarHerramientaPorId(int id, UsuarioDTO usuario);

    }
}

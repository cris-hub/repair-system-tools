using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FormatoES.Repository
{
    public interface IFormatoRepository
    {
        Task<Guid> CrearFormato(Formato formato, UsuarioDTO usuario);
        Task<Formato> ConsultarFormatoPorGuid(Guid guidFormato, UsuarioDTO usuario);
        Task<bool> ActualizarFormato(Formato formato, UsuarioDTO usuario);
        Task<Tuple<int, ICollection<Formato>>> ConsultarFormatos(Paginacion paginacion, UsuarioDTO usuario);
        Task<Tuple<int, ICollection<Formato>>> ConsultarFormatosPorFiltro(ParametrosDTO parametrosDTO, UsuarioDTO usuario);
        Task<Formato> ConsultarFormatoPorGuidHerramienta(Guid guidHerramienta, UsuarioDTO usuario);
        Task<ICollection<Formato>> ConsultarFormatoPorTipoConexion(int tipoConexion, UsuarioDTO usuario);
    }

}
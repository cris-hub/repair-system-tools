using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
namespace FormatoES.Service
{
    public interface IFormatoService
    {
        Task<Guid> CrearFormato(Formato formato, UsuarioDTO usuario);

        Task<Formato> ConsultarFormatoPorGuid(Guid guidFormato, UsuarioDTO usuario);

        Task<bool> ActualizarFormato(Formato formato,  UsuarioDTO usuario);

        Task<Tuple<int, ICollection<Formato>>> ConsultarFormatos(Paginacion paginacion, UsuarioDTO usuario);

        Task<Tuple<int, ICollection<Formato>>> ConsultarFormatosPorFiltro(ParametrosDTO parametrosDTO, UsuarioDTO usuario);

        Task<ICollection<Formato>> ConsultarFormatoPorTipoConexion(int tipoConexion, UsuarioDTO usuario);
        Task<Formato> ConsultarFormatoPorInspeccionConexion(InspeccionConexion inspeccionConexion, UsuarioDTO usuarioDTO);
    }
}

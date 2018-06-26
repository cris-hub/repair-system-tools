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
        Task<Guid> CrearFormato(Formato formato, string RutaServer);
        Task<Formato> ConsultarFormatoPorGuid(Guid guidFormato);
        Task<bool> ActualizarFormato(Formato formato, string RutaServer);
        Task<Tuple<int, ICollection<Formato>>> ConsultarFormatos(Paginacion paginacion);

        Task<Tuple<int, ICollection<Formato>>> ConsultarFormatosPorFiltro(ParametrosDTO parametrosDTO);
        Task<ICollection<Formato>> ConsultarFormatoPorTipoConexion(int tipoConexion);
    }
}

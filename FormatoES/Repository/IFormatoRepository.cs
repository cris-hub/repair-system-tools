using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FormatoES.Repository
{
    public interface IFormatoRepository
    {
        Task<Guid> CrearFormato(Formato formato);
        Task<Formato> ConsultarFormatoPorGuid(Guid guidFormato);
        Task<bool> ActualizarFormato(Formato formato);
        Task<Tuple<int, ICollection<Formato>>> ConsultarFormatos(Paginacion paginacion);
        Task<Tuple<int, ICollection<Formato>>> ConsultarFormatosPorFiltro(ParametrosDTO parametrosDTO);
        Task<Formato> ConsultarFormatoPorGuidHerramienta(Guid guidHerramienta);
        Task<ICollection<Formato>> ConsultarFormatoPorTipoConexion(int tipoConexion);
    }

}
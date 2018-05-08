using System.Collections.Generic;
using System.Threading.Tasks;
using ParametroUS.DTO;
using Pemarsa.Domain;


namespace ParametroUS.Repository
{
    public interface IParametroRepository
    {
        Task<ParametrosDTO> ConsultarParametrosPorEntidad(string entidad);
    }
}

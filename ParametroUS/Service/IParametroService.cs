using System.Collections.Generic;
using System.Threading.Tasks;
using ParametroUS.DTO;
using Pemarsa.Domain;


namespace ParametroUS.Service
{
    public interface IParametroService
    {
        Task<ParametrosDTO> ConsultarParametrosPorEntidad(string entidad);
    }
}

using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HerramientaES.Service
{
    public interface IHerramientaService
    {
        Task<Guid> CrearHerramienta(Herramienta herramienta);
        Task<IEnumerable<Herramienta>> ConsultarHerramientasPorGuidCliente(Guid guidCliente);
        Task<Herramienta> ConsultarHerramientaPorGuid(Guid guidHerramienta);
        Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientas(Paginacion paginacion);
        Task<Tuple<int, IEnumerable<Herramienta>>> ConsultarHerramientasPorFiltro(ParametrosHerramientasDTO parametrosHerramientasDTO);
        Task<bool> ActualizarHerramienta(Herramienta herramienta);
        Task<Herramienta> ConsultarHerramientaPorId(int id);
    }
}

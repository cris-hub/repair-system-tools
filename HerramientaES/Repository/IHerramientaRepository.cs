using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HerramientaES.Repository
{
    public interface IHerramientaRepository
    {
        Task<Guid> CrearHerramienta( Herramienta herramienta );
        Task<IEnumerable<Herramienta>> ConsultarHerramientasPorGuidCliente(Guid guidCliente);
        Task<Herramienta> ConsultarHerramientaPorGuid(Guid guidHerramienta);
        
    }
}

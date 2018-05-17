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
    }
}

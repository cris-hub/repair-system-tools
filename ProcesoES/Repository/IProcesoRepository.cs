using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProcesoES.Repository
{
    public interface IProcesoRepository
    {
        Task<Guid> CrearPrpceso(Proceso proceso);
    }
}

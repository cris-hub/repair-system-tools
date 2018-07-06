using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pemarsa.Domain;

namespace ProcesoES.Service
{
    public interface IProcesoService
    {
        Task<Guid> CrearProceso(Proceso proceso);
    }
}

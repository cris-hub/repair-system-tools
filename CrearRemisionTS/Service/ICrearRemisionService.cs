using CrearRemisionTS.DTO;
using Pemarsa.CanonicalModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CrearRemisionTS.Service
{
    public interface ICrearRemisionService
    {
        Task<Guid> CrearRemision(RemisionDTO remision, UsuarioDTO usuario);
    }
}

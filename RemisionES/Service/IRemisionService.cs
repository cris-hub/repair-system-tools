using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Threading.Tasks;

namespace RemisionES.Service
{
    public interface IRemisionService
    {
        Task<Guid> CrearRemision(Remision remision, UsuarioDTO usuario);
    }
}

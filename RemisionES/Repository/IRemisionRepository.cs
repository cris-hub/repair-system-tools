using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Threading.Tasks;

namespace RemisionES.Repository
{
    public interface IRemisionRepository
    {
        Task<Guid> CrearRemision(Remision remision, UsuarioDTO usuario);
    }
}

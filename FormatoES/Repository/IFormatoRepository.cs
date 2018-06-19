using Pemarsa.Domain;
using System;
using System.Threading.Tasks;

namespace FormatoES.Repository
{
    public interface IFormatoRepository
    {
        Task<Guid> CrearFormato(Formato formato);
    }
}
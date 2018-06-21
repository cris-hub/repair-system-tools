using Pemarsa.Domain;
using System;
using System.Threading.Tasks;

namespace FormatoES.Repository
{
    public interface IFormatoRepository
    {
        Task<Guid> CrearFormato(Formato formato);
        Task<Formato> ConsultarClientePorGuid(Guid guidFormato);
        Task<bool> ActualizarFormato(Formato cliente);
    }
}
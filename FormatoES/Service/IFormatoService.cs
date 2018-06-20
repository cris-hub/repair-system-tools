using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pemarsa.Domain;
namespace FormatoES.Service
{
    public interface IFormatoService
    {
        Task<Guid> CrearFormato(Formato formato, string RutaServer);

    }
}

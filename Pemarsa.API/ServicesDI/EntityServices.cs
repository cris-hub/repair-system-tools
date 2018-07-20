using ClienteES.Service;
using DocumentoAdjuntoUS.Service;
using FormatoES.Service;
using HerramientaES.Service;
using Microsoft.Extensions.DependencyInjection;
using OrdenTrabajoES.Service;
using ProcesoES.Service;

namespace Pemarsa.API.ServicesDI
{
    public static class EntityServices
    {
        public static void AddEntityServices(this IServiceCollection services)
        {
            services.AddTransient<IClienteService, ClienteService>();
            services.AddTransient<IHerramientaService, HerramientaService>();
            services.AddTransient<IOrdenTrabajoService, OrdenTrabajoService>();
            services.AddTransient<IDocumentoAdjuntoService, DocumentoAdjuntoService>();
            services.AddTransient<IFormatoService, FormatoService>();
            services.AddTransient<IProcesoService, ProcesoService>();
            

        }
    }
}

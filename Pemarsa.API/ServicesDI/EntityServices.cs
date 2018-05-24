using ClienteES.Service;
using HerramientaES.Service;
using Microsoft.Extensions.DependencyInjection;
using OrdenTrabajoES.Service;

namespace Pemarsa.API.ServicesDI
{
    public static class EntityServices
    {
        public static void AddEntityServices(this IServiceCollection services)
        {
            services.AddTransient<IClienteService, ClienteService>();
            services.AddTransient<IHerramientaService, HerramientaService>();
            services.AddTransient<IOrdenTrabajoService, OrdenTrabajoService>();
        }
    }
}

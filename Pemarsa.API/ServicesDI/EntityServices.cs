using ClienteES.Service;
using Microsoft.Extensions.DependencyInjection;

namespace Pemarsa.API.ServicesDI
{
    public static class EntityServices
    {
        public static void AddEntityServices(this IServiceCollection services)
        {
            services.AddTransient<IClienteService, ClienteService>();
        }
    }
}

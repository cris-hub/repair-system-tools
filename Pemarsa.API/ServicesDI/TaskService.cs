using CrearRemisionTS.Service;
using Microsoft.Extensions.DependencyInjection;

namespace Pemarsa.API.ServicesDI
{
    public static class TaskService
    {
        public static void AddTaskServices(this IServiceCollection services)
        {
            services.AddTransient<ICrearRemisionService, CrearRemisionService>();
        }
    }
}

using DocumentoAdjuntoUS.Service;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pemarsa.API.ServicesDI
{
    public static class UtilityService
    {
        public static void AddUtilityServices(this IServiceCollection services)
        {
            services.AddTransient<IDocumentoAdjuntoService, DocumentoAdjuntoService>();
        }
    }
}

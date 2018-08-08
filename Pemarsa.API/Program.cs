using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Pemarsa.API
{
    public class Program
    {

        public static IConfiguration Configuration { get; set; }
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            //return WebHost.CreateDefaultBuilder(args)
            //    .UseContentRoot(Directory.GetCurrentDirectory()).ConfigureAppConfiguration((hostingContext, config) =>
            //    {
            //        var env = hostingContext.HostingEnvironment;
            //        var sharedFolder = Path.Combine(env.ContentRootPath, "..", "Shared");

            //        config.AddJsonFile(Path.Combine(sharedFolder, "SharedSettings.json"), optional: true)
            //        .AddJsonFile("appsettings.json", optional: true)
            //        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            //        config.AddEnvironmentVariables();
            //    })
            //    .UseStartup<Startup>()
            //    .Build();

            //se obtiene la informacion del appsettings 
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");

            // se obtiene la configuracion establecida en el appsettings 
            Configuration = builder.Build();

            string pathServer = Configuration["FileServer:VirtualPath"];

            return WebHost.CreateDefaultBuilder(args)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseWebRoot(pathServer)
                .UseStartup<Startup>()
                .Build()
                ;
        }
    }
}

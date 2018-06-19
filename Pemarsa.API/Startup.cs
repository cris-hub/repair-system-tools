using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Pemarsa.API.ServicesDI;
using Pemarsa.Data;
using Pemarsa.Data.DBInitialize;
using Swashbuckle.AspNetCore.Swagger;

namespace Pemarsa.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFrameworkMySql()
                .AddDbContext<PemarsaContext>(opt => opt.UseMySql(Configuration.GetConnectionString("PemarsaDatabase")));

            services.AddCors(opt => opt.AddPolicy("PemarsaPolicy", builder => {
                builder.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader()
                      .AllowCredentials();
            }));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "API Pemarsa", Version = "v1" });
            });


            services.AddMvc().AddJsonOptions(opt => {
                opt.SerializerSettings.ContractResolver = new DefaultContractResolver();
                opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

            });
            services.AddRouting();

            //Dependency Injection
            services.AddEntityServices();
            services.AddUtilityServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, PemarsaContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("PemarsaPolicy");
            app.UseMvcWithDefaultRoute();
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Pemarsa");
            });
            context.Database.EnsureCreated();



            //TODO: Esta linea debe estar comentada para ejecutar las migraciones
            DBInitializer.Initialize(context);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Pemarsa.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Pemarsa.API.Helpers
{
    public class DesignTimeDbContextFactory: IDesignTimeDbContextFactory<PemarsaContext>
    {
        public PemarsaContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<PemarsaContext>();
            var connectionString = configuration.GetConnectionString("PemarsaDatabase");
            builder.UseMySql(connectionString);
            return new PemarsaContext(builder.Options);
        }
    }
}

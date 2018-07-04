using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Pemarsa.Domain;

namespace Pemarsa.Data
{
    public class PemarsaContext : DbContext
    {
        public PemarsaContext(DbContextOptions<PemarsaContext> options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<SolicitudOrdenTrabajoAnexos>().HasKey(k => new { k.SolicitudOrdenTrabajoId, k.DocumentoAdjuntoId });
            modelBuilder.Entity<ProcesoInspeccionSalida>().HasKey(k => new { k.InspeccionId, k.ProcesoId });
            modelBuilder.Entity<ProcesoInspeccionEntrada>().HasKey(k => new { k.InspeccionId, k.ProcesoId });





        }

        #region Entities
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<ClienteLinea> ClienteLinea { get; set; }
        public DbSet<Catalogo> Catalogo { get; set; }
        public DbSet<Consulta> Consulta { get; set; }
        public DbSet<Parametro> Parametro { get; set; }
        public DbSet<DocumentoAdjunto> DocumentoAdjunto { get; set; }
        public DbSet<ParametroCatalogo> ParametroCatalogo { get; set; }
        public DbSet<ParametroConsulta> ParametroConsulta { get; set; }
        public DbSet<Herramienta> Herramienta { get; set; }
        public DbSet<HerramientaEstudioFactibilidad> HerramientaEstudioFactibilidad { get; set; }
        public DbSet<HerramientaTamano> HerramientaTamano { get; set; }
        public DbSet<HerramientaTamanoMotor> HerramientaTamanoMotor { get; set; }
        public DbSet<HerramientaMaterial> HerramientaMaterial { get; set; }
        public DbSet<SolicitudOrdenTrabajo> SolicitudOrdenTrabajo { get; set; }
        public DbSet<SolicitudOrdenTrabajoAnexos> SolicitudOrdenTrabajoAnexos { get; set; }
        public DbSet<FormatoParametro> FormatoParametro { get; set; }
        public DbSet<FormatoAdendum> FormatoAdendum { get; set; }
        public DbSet<Formato> Formato { get; set; }
        public DbSet<OrdenTrabajo> OrdenTrabajo { get; set; }
        public DbSet<Proceso> Proceso { get; set; }



        #endregion

    }

    public class TemporaryDbContextFactory : IDesignTimeDbContextFactory<PemarsaContext>
    {
        public IConfiguration Configuration { get; }
        public PemarsaContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<PemarsaContext>();
            IConfigurationRoot configuration = new ConfigurationBuilder()

              .Build();

            builder.UseMySql("Server=192.168.15.174;Database=pemarsa_neg_trunk;Uid=mysqldev;Pwd=MySqld3v1720*.;");
            return new PemarsaContext(builder.Options);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Pemarsa.Domain;
using System.IO;

namespace Pemarsa.Data
{
    public class PemarsaContext : DbContext
    {
        public PemarsaContext(DbContextOptions<PemarsaContext> options) : base(options)
        {
            this.Database.SetCommandTimeout(180); //

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Inspeccion>().HasAlternateKey(k => new { k.Pieza, k.TipoInspeccionId, k.Id });
            modelBuilder.Entity<InspeccionFotos>().HasKey(k => new { k.InspeccionId, k.DocumentoAdjuntoId, k.Pieza });
            modelBuilder.Entity<InspeccionEquipoUtilizado>().HasKey(k => new { k.InspeccionId, k.EquipoUtilizadoId });

            modelBuilder.Entity<ProcesoInspeccion>().HasKey(k => new { k.InspeccionId, k.ProcesoId });

            modelBuilder.Entity<ProcesoRealizar>().HasKey(k => new { k.TipoProcesoId, k.ProcesoId });
            modelBuilder.Entity<ProcesoEquipoMedicion>().HasKey(k => new { k.IdEquipoMedicion, k.ProcesoId });
            modelBuilder.Entity<ConexionEquipoMedicionUsado>().HasKey(k => new { k.InspeccionConexionFormatoId, k.EquipoMedicionId });

            modelBuilder.Entity<FormatoFormatoParametro>().HasKey(k => new { k.FormatoId, k.FormatoParametroId });


            modelBuilder.Entity<OrdenTrabajoAnexos>().HasKey(k => new { k.OrdenTrabajoId, k.DocumentoAdjuntoId });
            modelBuilder.Entity<SolicitudOrdenTrabajoAnexos>().HasKey(k => new { k.SolicitudOrdenTrabajoId, k.DocumentoAdjuntoId });

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
        public DbSet<OrdenTrabajoAnexos> OrdenTrabajoAnexos { get; set; }
        public DbSet<FormatoParametro> FormatoParametro { get; set; }
        public DbSet<FormatoFormatoParametro> FormatoFormatoParametro { get; set; }
        public DbSet<FormatoAdendum> FormatoAdendum { get; set; }
        public DbSet<FormatoTiposConexion> FormatoTiposConexion { get; set; }
        public DbSet<Formato> Formato { get; set; }
        public DbSet<OrdenTrabajo> OrdenTrabajo { get; set; }
        public DbSet<Proceso> Proceso { get; set; }
        public DbSet<ProcesoInspeccion> ProcesoInspeccion { get; set; }
        public DbSet<ProcesoRealizar> ProcesoRealizar { get; set; }
        public DbSet<ProcesoEquipoMedicion> ProcesoEquipoMedicion { get; set; }
        public DbSet<InspeccionConexion> InspeccionConexion { get; set; }
        public DbSet<InspeccionEquipoUtilizado> InspeccionEquipoUtilizado { get; set; }
        public DbSet<InspeccionDimensionalOtro> InspeccionDimensionalOtro { get; set; }
        public DbSet<Inspeccion> Inspeccion { get; set; }
        public DbSet<InspeccionInsumo> InspeccionInsumo { get; set; }
        public DbSet<OrdenTrabajoHistorialModificacion> OrdenTrabajoHistorialModificacion { get; set; }
        public DbSet<DetalleSoldadura> DetalleSoldadura { get; set; }
        public DbSet<Remision> Remision { get; set; }
        public DbSet<InspeccionConexionFormato> InspeccionConexionFormato { get; set; }


        #endregion


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
            // ...

        }
    }




    //public class TemporaryDbContextFactory : IDesignTimeDbContextFactory<PemarsaContext>
    //{

    //    public PemarsaContext CreateDbContext(string[] args)
    //    {
    //        var builder = new DbContextOptionsBuilder<PemarsaContext>();
    //        builder.EnableSensitiveDataLogging();
    //        IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
    //            .AddJsonFile("appsettings.json")
    //            .Build();
    //        var conexionString = configuration.GetConnectionString("PemarsaDatabase");

    //        builder.UseMySql(conexionString);
    //        return new PemarsaContext(builder.Options);
    //    }
    //}
}

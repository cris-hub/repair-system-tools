using Microsoft.EntityFrameworkCore;
using Pemarsa.Domain;

namespace Pemarsa.Data
{
    public class PemarsaContext : DbContext
    {
        public PemarsaContext(DbContextOptions<PemarsaContext> options) : base(options)
        {
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
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}

using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class procesos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InspeccionId",
                table: "DocumentoAdjunto",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Inspeccion",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Guid = table.Column<Guid>(nullable: false),
                    GuidUsuarioCrea = table.Column<Guid>(nullable: false),
                    GuidUsuarioModifica = table.Column<Guid>(nullable: true),
                    GuidOrganizacion = table.Column<Guid>(nullable: false),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    FechaModifica = table.Column<DateTime>(nullable: true),
                    NombreUsuarioCrea = table.Column<string>(maxLength: 60, nullable: false),
                    NombreUsuarioModifica = table.Column<string>(maxLength: 60, nullable: true),
                    Amperaje = table.Column<int>(nullable: false),
                    ConcentracionUtilizada = table.Column<int>(nullable: false),
                    EstaConforme = table.Column<bool>(nullable: false),
                    FechaDePreparacion = table.Column<DateTime>(nullable: false),
                    InspeccionLuzNegra = table.Column<bool>(nullable: false),
                    InspeccionParticulasMagneticas = table.Column<bool>(nullable: false),
                    IntensidadLuzBlanca = table.Column<int>(nullable: false),
                    IntensidadLuzNegra = table.Column<int>(nullable: false),
                    Lote = table.Column<int>(nullable: false),
                    Lumens = table.Column<int>(nullable: false),
                    Luxes = table.Column<int>(nullable: false),
                    Observaciones = table.Column<string>(nullable: true),
                    ObservacionesInspeccion = table.Column<string>(nullable: true),
                    SeIdentificaDefecto = table.Column<bool>(nullable: false),
                    SeRealizoCalibracionEquipo = table.Column<bool>(nullable: false),
                    TemperaturaAmbiente = table.Column<int>(nullable: false),
                    TemperaturaDePieza = table.Column<int>(nullable: false),
                    VelocidadBuggyDrive = table.Column<int>(nullable: false),
                    BloqueEscalonadoUsadoId = table.Column<int>(nullable: false),
                    BobinaMagneticaId = table.Column<int>(nullable: false),
                    EquipoEmiId = table.Column<int>(nullable: false),
                    EstadoId = table.Column<int>(nullable: false),
                    EquipoUtilizadoId = table.Column<int>(nullable: false),
                    TipoDeLiquidosId = table.Column<int>(nullable: false),
                    TipoInspeccionId = table.Column<int>(nullable: false),
                    TurboPatronId = table.Column<int>(nullable: false),
                    ImagenMedicionEspesoresId = table.Column<int>(nullable: false),
                    ImagenMflId = table.Column<int>(nullable: false),
                    ImagenPantallaUltrasonidoId = table.Column<int>(nullable: false),
                    ImagenUltrasonidoDespuesId = table.Column<int>(nullable: false),
                    ImagenUltrasonidoDuranteId = table.Column<int>(nullable: false),
                    ImagenUltrasonidoPreviaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inspeccion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_BloqueEscalonadoUsadoId",
                        column: x => x.BloqueEscalonadoUsadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_BobinaMagneticaId",
                        column: x => x.BobinaMagneticaId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_EquipoEmiId",
                        column: x => x.EquipoEmiId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_EquipoUtilizadoId",
                        column: x => x.EquipoUtilizadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_EstadoId",
                        column: x => x.EstadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenMedicionEspesoresId",
                        column: x => x.ImagenMedicionEspesoresId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenMflId",
                        column: x => x.ImagenMflId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenPantallaUltrasonidoId",
                        column: x => x.ImagenPantallaUltrasonidoId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDespuesId",
                        column: x => x.ImagenUltrasonidoDespuesId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDuranteId",
                        column: x => x.ImagenUltrasonidoDuranteId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoPreviaId",
                        column: x => x.ImagenUltrasonidoPreviaId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_TipoDeLiquidosId",
                        column: x => x.TipoDeLiquidosId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_TipoInspeccionId",
                        column: x => x.TipoInspeccionId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_TurboPatronId",
                        column: x => x.TurboPatronId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InspeccionConexionFormatoAdendum",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionConexionFormatoAdendum", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InspeccionConexionFormatoParametros",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EstaConforme = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionConexionFormatoParametros", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InspeccionDimensionalOtro",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Guid = table.Column<Guid>(nullable: false),
                    GuidUsuarioCrea = table.Column<Guid>(nullable: false),
                    GuidUsuarioModifica = table.Column<Guid>(nullable: true),
                    GuidOrganizacion = table.Column<Guid>(nullable: false),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    FechaModifica = table.Column<DateTime>(nullable: true),
                    NombreUsuarioCrea = table.Column<string>(maxLength: 60, nullable: false),
                    NombreUsuarioModifica = table.Column<string>(maxLength: 60, nullable: true),
                    Conformidad = table.Column<bool>(nullable: false),
                    MedidaActual = table.Column<string>(nullable: true),
                    MedidaNominal = table.Column<string>(nullable: true),
                    Tolerancia = table.Column<string>(nullable: true),
                    InspeccionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionDimensionalOtro", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InspeccionDimensionalOtro_Inspeccion_InspeccionId",
                        column: x => x.InspeccionId,
                        principalTable: "Inspeccion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InspeccionEspesor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Guid = table.Column<Guid>(nullable: false),
                    GuidUsuarioCrea = table.Column<Guid>(nullable: false),
                    GuidUsuarioModifica = table.Column<Guid>(nullable: true),
                    GuidOrganizacion = table.Column<Guid>(nullable: false),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    FechaModifica = table.Column<DateTime>(nullable: true),
                    NombreUsuarioCrea = table.Column<string>(maxLength: 60, nullable: false),
                    NombreUsuarioModifica = table.Column<string>(maxLength: 60, nullable: true),
                    Desviacion = table.Column<int>(nullable: false),
                    EspesorActual = table.Column<int>(nullable: false),
                    EspesorNominal = table.Column<int>(nullable: false),
                    InspeccionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionEspesor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InspeccionEspesor_Inspeccion_InspeccionId",
                        column: x => x.InspeccionId,
                        principalTable: "Inspeccion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InspeccionInsumo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Guid = table.Column<Guid>(nullable: false),
                    GuidUsuarioCrea = table.Column<Guid>(nullable: false),
                    GuidUsuarioModifica = table.Column<Guid>(nullable: true),
                    GuidOrganizacion = table.Column<Guid>(nullable: false),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    FechaModifica = table.Column<DateTime>(nullable: true),
                    NombreUsuarioCrea = table.Column<string>(maxLength: 60, nullable: false),
                    NombreUsuarioModifica = table.Column<string>(maxLength: 60, nullable: true),
                    NumeroLote = table.Column<int>(nullable: false),
                    TipoInsumoId = table.Column<int>(nullable: false),
                    InspeccionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionInsumo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InspeccionInsumo_Inspeccion_InspeccionId",
                        column: x => x.InspeccionId,
                        principalTable: "Inspeccion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionInsumo_Catalogo_TipoInsumoId",
                        column: x => x.TipoInsumoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InspeccionConexionFormato",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EsBoreBack = table.Column<bool>(nullable: false),
                    EsCw = table.Column<bool>(nullable: false),
                    EsEstampado = table.Column<bool>(nullable: false),
                    EsStandBlasting = table.Column<bool>(nullable: false),
                    EstaConforme = table.Column<bool>(nullable: false),
                    FlatBoardId = table.Column<int>(nullable: false),
                    FlatBoardLongitud = table.Column<int>(nullable: false),
                    GuidUsuarioElabora = table.Column<Guid>(nullable: false),
                    Od = table.Column<int>(nullable: false),
                    OIT = table.Column<int>(nullable: false),
                    NombreUsuarioElabora = table.Column<string>(nullable: true),
                    Serial = table.Column<string>(nullable: true),
                    FloatValveId = table.Column<int>(nullable: false),
                    EquipoUsadoId = table.Column<int>(nullable: false),
                    InspeccionConexionFormatoAdendumId = table.Column<int>(nullable: false),
                    InspeccionConexionFormatoParametrosId = table.Column<int>(nullable: false),
                    ClienteId = table.Column<int>(nullable: false),
                    FormatoAdjuntoId = table.Column<int>(nullable: false),
                    HerramientaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionConexionFormato", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_Cliente_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Cliente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_Catalogo_EquipoUsadoId",
                        column: x => x.EquipoUsadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_Catalogo_FloatValveId",
                        column: x => x.FloatValveId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_DocumentoAdjunto_FormatoAdjuntoId",
                        column: x => x.FormatoAdjuntoId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_Herramienta_HerramientaId",
                        column: x => x.HerramientaId,
                        principalTable: "Herramienta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_InspeccionConexionFormatoAdendum_I~",
                        column: x => x.InspeccionConexionFormatoAdendumId,
                        principalTable: "InspeccionConexionFormatoAdendum",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_InspeccionConexionFormatoParametro~",
                        column: x => x.InspeccionConexionFormatoParametrosId,
                        principalTable: "InspeccionConexionFormatoParametros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InspeccionConexion",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Guid = table.Column<Guid>(nullable: false),
                    GuidUsuarioCrea = table.Column<Guid>(nullable: false),
                    GuidUsuarioModifica = table.Column<Guid>(nullable: true),
                    GuidOrganizacion = table.Column<Guid>(nullable: false),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    FechaModifica = table.Column<DateTime>(nullable: true),
                    NombreUsuarioCrea = table.Column<string>(maxLength: 60, nullable: false),
                    NombreUsuarioModifica = table.Column<string>(maxLength: 60, nullable: true),
                    NumeroConexion = table.Column<int>(nullable: false),
                    Observaciones = table.Column<string>(nullable: true),
                    ConexionId = table.Column<int>(nullable: false),
                    EstadoId = table.Column<int>(nullable: false),
                    TipoConexionId = table.Column<int>(nullable: false),
                    FormatoId = table.Column<int>(nullable: false),
                    InspeccionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionConexion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InspeccionConexion_Catalogo_ConexionId",
                        column: x => x.ConexionId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexion_Catalogo_EstadoId",
                        column: x => x.EstadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexion_InspeccionConexionFormato_FormatoId",
                        column: x => x.FormatoId,
                        principalTable: "InspeccionConexionFormato",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexion_Inspeccion_InspeccionId",
                        column: x => x.InspeccionId,
                        principalTable: "Inspeccion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InspeccionConexion_Catalogo_TipoConexionId",
                        column: x => x.TipoConexionId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Proceso",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Guid = table.Column<Guid>(nullable: false),
                    GuidUsuarioCrea = table.Column<Guid>(nullable: false),
                    GuidUsuarioModifica = table.Column<Guid>(nullable: true),
                    GuidOrganizacion = table.Column<Guid>(nullable: false),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    FechaModifica = table.Column<DateTime>(nullable: true),
                    NombreUsuarioCrea = table.Column<string>(maxLength: 60, nullable: false),
                    NombreUsuarioModifica = table.Column<string>(maxLength: 60, nullable: true),
                    GuidOperario = table.Column<Guid>(nullable: false),
                    CantidadInspeccion = table.Column<int>(nullable: false),
                    EsPruebaConGauge = table.Column<bool>(nullable: true),
                    NombreOperario = table.Column<string>(nullable: true),
                    TrabajoRealizadoId = table.Column<string>(nullable: true),
                    TrabajoRealizar = table.Column<string>(nullable: true),
                    EstadoId = table.Column<int>(nullable: false),
                    TipoProcesoAnteriorId = table.Column<int>(nullable: false),
                    TipoProcesoId = table.Column<int>(nullable: false),
                    TipoProcesoSiguienteId = table.Column<int>(nullable: false),
                    TipoProcesoSiguienteSugeridoId = table.Column<int>(nullable: false),
                    TipoSoldaduraId = table.Column<int>(nullable: false),
                    EquipoMedicionUtilizadoId = table.Column<int>(nullable: true),
                    NormaId = table.Column<int>(nullable: true),
                    MaquinaAsignadaId = table.Column<int>(nullable: false),
                    InstructivoId = table.Column<int>(nullable: false),
                    ProcesosRealizarId = table.Column<int>(nullable: false),
                    ProcesoSiguienteId = table.Column<int>(nullable: false),
                    ProcesoAnteriorId = table.Column<int>(nullable: false),
                    OrdenTrabajoId = table.Column<int>(nullable: false),
                    DetalleSoldaduraId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proceso", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_EquipoMedicionUtilizadoId",
                        column: x => x.EquipoMedicionUtilizadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_EstadoId",
                        column: x => x.EstadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_InstructivoId",
                        column: x => x.InstructivoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_MaquinaAsignadaId",
                        column: x => x.MaquinaAsignadaId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_NormaId",
                        column: x => x.NormaId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Proceso_OrdenTrabajo_OrdenTrabajoId",
                        column: x => x.OrdenTrabajoId,
                        principalTable: "OrdenTrabajo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_TipoProcesoAnteriorId",
                        column: x => x.TipoProcesoAnteriorId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_TipoProcesoId",
                        column: x => x.TipoProcesoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_TipoProcesoSiguienteId",
                        column: x => x.TipoProcesoSiguienteId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_TipoProcesoSiguienteSugeridoId",
                        column: x => x.TipoProcesoSiguienteSugeridoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_TipoSoldaduraId",
                        column: x => x.TipoSoldaduraId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetalleSoldadura",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Guid = table.Column<Guid>(nullable: false),
                    GuidUsuarioCrea = table.Column<Guid>(nullable: false),
                    GuidUsuarioModifica = table.Column<Guid>(nullable: true),
                    GuidOrganizacion = table.Column<Guid>(nullable: false),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    FechaModifica = table.Column<DateTime>(nullable: true),
                    NombreUsuarioCrea = table.Column<string>(maxLength: 60, nullable: false),
                    NombreUsuarioModifica = table.Column<string>(maxLength: 60, nullable: true),
                    Amperaje = table.Column<int>(nullable: false),
                    CantidadSoldadura = table.Column<int>(nullable: false),
                    Lote = table.Column<int>(nullable: false),
                    PresionAcetileno = table.Column<int>(nullable: false),
                    PresionGas1 = table.Column<int>(nullable: false),
                    PresionGas2 = table.Column<int>(nullable: false),
                    PresionOxigeno = table.Column<int>(nullable: false),
                    TemperaturaDespuesProceso = table.Column<int>(nullable: false),
                    TemperaturaDuranteProceso = table.Column<int>(nullable: false),
                    TemperaturaPrecalentamiento = table.Column<int>(nullable: false),
                    TiempoAplicacion = table.Column<int>(nullable: false),
                    TiempoPrecalentamiento = table.Column<int>(nullable: false),
                    Voltaje = table.Column<int>(nullable: false),
                    ModoAplicacionId = table.Column<int>(nullable: false),
                    TamañoCortadoresId = table.Column<int>(nullable: false),
                    TipoFuenteId = table.Column<int>(nullable: false),
                    TipoSoldaduraId = table.Column<int>(nullable: false),
                    ProcesoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetalleSoldadura", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetalleSoldadura_Catalogo_ModoAplicacionId",
                        column: x => x.ModoAplicacionId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleSoldadura_Proceso_ProcesoId",
                        column: x => x.ProcesoId,
                        principalTable: "Proceso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleSoldadura_Catalogo_TamañoCortadoresId",
                        column: x => x.TamañoCortadoresId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleSoldadura_Catalogo_TipoFuenteId",
                        column: x => x.TipoFuenteId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetalleSoldadura_Catalogo_TipoSoldaduraId",
                        column: x => x.TipoSoldaduraId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProcesoInspeccionEntrada",
                columns: table => new
                {
                    InspeccionId = table.Column<int>(nullable: false),
                    ProcesoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcesoInspeccionEntrada", x => new { x.InspeccionId, x.ProcesoId });
                    table.ForeignKey(
                        name: "FK_ProcesoInspeccionEntrada_Inspeccion_InspeccionId",
                        column: x => x.InspeccionId,
                        principalTable: "Inspeccion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcesoInspeccionEntrada_Proceso_ProcesoId",
                        column: x => x.ProcesoId,
                        principalTable: "Proceso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProcesoInspeccionSalida",
                columns: table => new
                {
                    InspeccionId = table.Column<int>(nullable: false),
                    ProcesoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcesoInspeccionSalida", x => new { x.InspeccionId, x.ProcesoId });
                    table.ForeignKey(
                        name: "FK_ProcesoInspeccionSalida_Inspeccion_InspeccionId",
                        column: x => x.InspeccionId,
                        principalTable: "Inspeccion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcesoInspeccionSalida_Proceso_ProcesoId",
                        column: x => x.ProcesoId,
                        principalTable: "Proceso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DocumentoAdjunto_InspeccionId",
                table: "DocumentoAdjunto",
                column: "InspeccionId");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleSoldadura_ModoAplicacionId",
                table: "DetalleSoldadura",
                column: "ModoAplicacionId");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleSoldadura_ProcesoId",
                table: "DetalleSoldadura",
                column: "ProcesoId");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleSoldadura_TamañoCortadoresId",
                table: "DetalleSoldadura",
                column: "TamañoCortadoresId");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleSoldadura_TipoFuenteId",
                table: "DetalleSoldadura",
                column: "TipoFuenteId");

            migrationBuilder.CreateIndex(
                name: "IX_DetalleSoldadura_TipoSoldaduraId",
                table: "DetalleSoldadura",
                column: "TipoSoldaduraId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_BloqueEscalonadoUsadoId",
                table: "Inspeccion",
                column: "BloqueEscalonadoUsadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_BobinaMagneticaId",
                table: "Inspeccion",
                column: "BobinaMagneticaId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_EquipoEmiId",
                table: "Inspeccion",
                column: "EquipoEmiId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_EquipoUtilizadoId",
                table: "Inspeccion",
                column: "EquipoUtilizadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_EstadoId",
                table: "Inspeccion",
                column: "EstadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_ImagenMedicionEspesoresId",
                table: "Inspeccion",
                column: "ImagenMedicionEspesoresId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_ImagenMflId",
                table: "Inspeccion",
                column: "ImagenMflId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_ImagenPantallaUltrasonidoId",
                table: "Inspeccion",
                column: "ImagenPantallaUltrasonidoId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_ImagenUltrasonidoDespuesId",
                table: "Inspeccion",
                column: "ImagenUltrasonidoDespuesId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_ImagenUltrasonidoDuranteId",
                table: "Inspeccion",
                column: "ImagenUltrasonidoDuranteId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_ImagenUltrasonidoPreviaId",
                table: "Inspeccion",
                column: "ImagenUltrasonidoPreviaId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_TipoDeLiquidosId",
                table: "Inspeccion",
                column: "TipoDeLiquidosId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_TipoInspeccionId",
                table: "Inspeccion",
                column: "TipoInspeccionId");

            migrationBuilder.CreateIndex(
                name: "IX_Inspeccion_TurboPatronId",
                table: "Inspeccion",
                column: "TurboPatronId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexion_ConexionId",
                table: "InspeccionConexion",
                column: "ConexionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexion_EstadoId",
                table: "InspeccionConexion",
                column: "EstadoId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexion_FormatoId",
                table: "InspeccionConexion",
                column: "FormatoId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexion_InspeccionId",
                table: "InspeccionConexion",
                column: "InspeccionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexion_TipoConexionId",
                table: "InspeccionConexion",
                column: "TipoConexionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_ClienteId",
                table: "InspeccionConexionFormato",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_EquipoUsadoId",
                table: "InspeccionConexionFormato",
                column: "EquipoUsadoId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_FloatValveId",
                table: "InspeccionConexionFormato",
                column: "FloatValveId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_FormatoAdjuntoId",
                table: "InspeccionConexionFormato",
                column: "FormatoAdjuntoId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_HerramientaId",
                table: "InspeccionConexionFormato",
                column: "HerramientaId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_InspeccionConexionFormatoAdendumId",
                table: "InspeccionConexionFormato",
                column: "InspeccionConexionFormatoAdendumId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_InspeccionConexionFormatoParametro~",
                table: "InspeccionConexionFormato",
                column: "InspeccionConexionFormatoParametrosId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionDimensionalOtro_InspeccionId",
                table: "InspeccionDimensionalOtro",
                column: "InspeccionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionEspesor_InspeccionId",
                table: "InspeccionEspesor",
                column: "InspeccionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionInsumo_InspeccionId",
                table: "InspeccionInsumo",
                column: "InspeccionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionInsumo_TipoInsumoId",
                table: "InspeccionInsumo",
                column: "TipoInsumoId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_DetalleSoldaduraId",
                table: "Proceso",
                column: "DetalleSoldaduraId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_EquipoMedicionUtilizadoId",
                table: "Proceso",
                column: "EquipoMedicionUtilizadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_EstadoId",
                table: "Proceso",
                column: "EstadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_InstructivoId",
                table: "Proceso",
                column: "InstructivoId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_MaquinaAsignadaId",
                table: "Proceso",
                column: "MaquinaAsignadaId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_NormaId",
                table: "Proceso",
                column: "NormaId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_OrdenTrabajoId",
                table: "Proceso",
                column: "OrdenTrabajoId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_TipoProcesoAnteriorId",
                table: "Proceso",
                column: "TipoProcesoAnteriorId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_TipoProcesoId",
                table: "Proceso",
                column: "TipoProcesoId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_TipoProcesoSiguienteId",
                table: "Proceso",
                column: "TipoProcesoSiguienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_TipoProcesoSiguienteSugeridoId",
                table: "Proceso",
                column: "TipoProcesoSiguienteSugeridoId");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_TipoSoldaduraId",
                table: "Proceso",
                column: "TipoSoldaduraId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcesoInspeccionEntrada_ProcesoId",
                table: "ProcesoInspeccionEntrada",
                column: "ProcesoId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcesoInspeccionSalida_ProcesoId",
                table: "ProcesoInspeccionSalida",
                column: "ProcesoId");

            migrationBuilder.AddForeignKey(
                name: "FK_DocumentoAdjunto_Inspeccion_InspeccionId",
                table: "DocumentoAdjunto",
                column: "InspeccionId",
                principalTable: "Inspeccion",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_DetalleSoldadura_DetalleSoldaduraId",
                table: "Proceso",
                column: "DetalleSoldaduraId",
                principalTable: "DetalleSoldadura",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DocumentoAdjunto_Inspeccion_InspeccionId",
                table: "DocumentoAdjunto");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Proceso_ProcesoId",
                table: "DetalleSoldadura");

            migrationBuilder.DropTable(
                name: "InspeccionConexion");

            migrationBuilder.DropTable(
                name: "InspeccionDimensionalOtro");

            migrationBuilder.DropTable(
                name: "InspeccionEspesor");

            migrationBuilder.DropTable(
                name: "InspeccionInsumo");

            migrationBuilder.DropTable(
                name: "ProcesoInspeccionEntrada");

            migrationBuilder.DropTable(
                name: "ProcesoInspeccionSalida");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormato");

            migrationBuilder.DropTable(
                name: "Inspeccion");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormatoAdendum");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropTable(
                name: "Proceso");

            migrationBuilder.DropTable(
                name: "DetalleSoldadura");

            migrationBuilder.DropIndex(
                name: "IX_DocumentoAdjunto_InspeccionId",
                table: "DocumentoAdjunto");

            migrationBuilder.DropColumn(
                name: "InspeccionId",
                table: "DocumentoAdjunto");
        }
    }
}

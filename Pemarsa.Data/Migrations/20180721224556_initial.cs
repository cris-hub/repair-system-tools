using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Catalogo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Guid = table.Column<Guid>(nullable: false),
                    Valor = table.Column<string>(nullable: false),
                    Grupo = table.Column<string>(nullable: false),
                    Simbolo = table.Column<string>(nullable: true),
                    Estado = table.Column<bool>(nullable: true),
                    CatalogoId = table.Column<int>(nullable: true),
                    Dia = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Catalogo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Catalogo_Catalogo_CatalogoId",
                        column: x => x.CatalogoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Consulta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Guid = table.Column<Guid>(nullable: false),
                    Campos = table.Column<string>(nullable: false),
                    Tabla = table.Column<string>(nullable: false),
                    CampoPadre = table.Column<string>(nullable: true),
                    CamposBusqueda = table.Column<string>(nullable: true),
                    Condicion = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consulta", x => x.Id);
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
                name: "Parametro",
                columns: table => new
                {
                    Entidad = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parametro", x => x.Entidad);
                });

            migrationBuilder.CreateTable(
                name: "ParametroCatalogo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Entidad = table.Column<string>(nullable: true),
                    CatalogoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParametroCatalogo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParametroCatalogo_Catalogo_CatalogoId",
                        column: x => x.CatalogoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ParametroCatalogo_Parametro_Entidad",
                        column: x => x.Entidad,
                        principalTable: "Parametro",
                        principalColumn: "Entidad",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ParametroConsulta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Entidad = table.Column<string>(nullable: true),
                    ConsultaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParametroConsulta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParametroConsulta_Consulta_ConsultaId",
                        column: x => x.ConsultaId,
                        principalTable: "Consulta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ParametroConsulta_Parametro_Entidad",
                        column: x => x.Entidad,
                        principalTable: "Parametro",
                        principalColumn: "Entidad",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Cliente",
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
                    ContactoCorreo = table.Column<string>(nullable: false),
                    ContactoNombre = table.Column<string>(nullable: false),
                    ContactoTelefono = table.Column<string>(nullable: false),
                    Direccion = table.Column<string>(nullable: false),
                    EstadoId = table.Column<int>(nullable: false),
                    GuidResponsable = table.Column<Guid>(nullable: false),
                    NickName = table.Column<string>(nullable: false),
                    Nit = table.Column<string>(nullable: false),
                    NombreResponsable = table.Column<string>(nullable: false),
                    RazonSocial = table.Column<string>(nullable: false),
                    Telefono = table.Column<string>(nullable: false),
                    DocumentoAdjuntoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cliente", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cliente_Catalogo_EstadoId",
                        column: x => x.EstadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClienteLinea",
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
                    ContactoCorreo = table.Column<string>(nullable: false),
                    ContactoNombre = table.Column<string>(nullable: false),
                    ContactoTelefono = table.Column<string>(nullable: false),
                    Direccion = table.Column<string>(nullable: false),
                    Nombre = table.Column<string>(nullable: false),
                    ClienteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClienteLinea", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClienteLinea_Cliente_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Cliente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Herramienta",
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
                    ClienteId = table.Column<int>(nullable: false),
                    EsHerramientaMotor = table.Column<bool>(nullable: false),
                    EsHerramientaPetrolera = table.Column<bool>(nullable: false),
                    EsHerramientaPorCantidad = table.Column<bool>(nullable: false),
                    EstadoId = table.Column<int>(nullable: false),
                    EstudioFactibilidadId = table.Column<int>(nullable: false),
                    GuidUsuarioVerifica = table.Column<Guid>(nullable: false),
                    NombreUsuarioVerifica = table.Column<string>(nullable: false),
                    LineaId = table.Column<int>(nullable: false),
                    Moc = table.Column<int>(nullable: false),
                    Nombre = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Herramienta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Herramienta_Cliente_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Cliente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Herramienta_Catalogo_EstadoId",
                        column: x => x.EstadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Herramienta_ClienteLinea_LineaId",
                        column: x => x.LineaId,
                        principalTable: "ClienteLinea",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Formato",
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
                    TipoFormatoId = table.Column<int>(nullable: false),
                    Codigo = table.Column<string>(nullable: true),
                    TPI = table.Column<string>(nullable: true),
                    TPF = table.Column<string>(nullable: true),
                    HerramientaId = table.Column<int>(nullable: true),
                    EsFormatoAdjunto = table.Column<bool>(nullable: true),
                    EspecificacionId = table.Column<int>(nullable: true),
                    TiposConexionesId = table.Column<int>(nullable: true),
                    ConexionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Formato", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Formato_Catalogo_ConexionId",
                        column: x => x.ConexionId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Formato_Catalogo_EspecificacionId",
                        column: x => x.EspecificacionId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Formato_Herramienta_HerramientaId",
                        column: x => x.HerramientaId,
                        principalTable: "Herramienta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Formato_Catalogo_TipoFormatoId",
                        column: x => x.TipoFormatoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Formato_Catalogo_TiposConexionesId",
                        column: x => x.TiposConexionesId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HerramientaEstudioFactibilidad",
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
                    Admin = table.Column<bool>(nullable: true),
                    ManoObra = table.Column<bool>(nullable: true),
                    Mantenimiento = table.Column<bool>(nullable: true),
                    Maquina = table.Column<bool>(nullable: true),
                    Material = table.Column<bool>(nullable: true),
                    Metodo = table.Column<bool>(nullable: true),
                    HerramientaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HerramientaEstudioFactibilidad", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HerramientaEstudioFactibilidad_Herramienta_HerramientaId",
                        column: x => x.HerramientaId,
                        principalTable: "Herramienta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HerramientaMaterial",
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
                    Estado = table.Column<bool>(nullable: false),
                    HerramientaId = table.Column<int>(nullable: false),
                    MaterialId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HerramientaMaterial", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HerramientaMaterial_Herramienta_HerramientaId",
                        column: x => x.HerramientaId,
                        principalTable: "Herramienta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HerramientaMaterial_Catalogo_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HerramientaTamano",
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
                    Tamano = table.Column<string>(nullable: false),
                    Estado = table.Column<bool>(nullable: false),
                    HerramientaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HerramientaTamano", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HerramientaTamano_Herramienta_HerramientaId",
                        column: x => x.HerramientaId,
                        principalTable: "Herramienta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HerramientaTamanoMotor",
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
                    Tamano = table.Column<string>(nullable: false),
                    Estado = table.Column<bool>(nullable: false),
                    HerramientaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HerramientaTamanoMotor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HerramientaTamanoMotor_Herramienta_HerramientaId",
                        column: x => x.HerramientaId,
                        principalTable: "Herramienta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocumentoAdjunto",
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
                    Nombre = table.Column<string>(maxLength: 45, nullable: false),
                    Descripcion = table.Column<string>(maxLength: 250, nullable: true),
                    NombreArchivo = table.Column<string>(maxLength: 50, nullable: false),
                    Ruta = table.Column<string>(nullable: false),
                    Extension = table.Column<string>(nullable: false),
                    FormatoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentoAdjunto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocumentoAdjunto_Formato_FormatoId",
                        column: x => x.FormatoId,
                        principalTable: "Formato",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FormatoAdendum",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Posicion = table.Column<int>(nullable: false),
                    TipoId = table.Column<int>(nullable: true),
                    Valor = table.Column<string>(nullable: true),
                    FormatoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormatoAdendum", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormatoAdendum_Formato_FormatoId",
                        column: x => x.FormatoId,
                        principalTable: "Formato",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FormatoAdendum_Catalogo_TipoId",
                        column: x => x.TipoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FormatoParametro",
                columns: table => new
                {
                    DimensionEspecifica = table.Column<string>(nullable: true),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Item = table.Column<string>(nullable: true),
                    Parametro = table.Column<string>(nullable: true),
                    ToleranciaMax = table.Column<string>(nullable: true),
                    ToleranciaMin = table.Column<string>(nullable: true),
                    FormatoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormatoParametro", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormatoParametro_Formato_FormatoId",
                        column: x => x.FormatoId,
                        principalTable: "Formato",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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
                    Amperaje = table.Column<int>(nullable: true),
                    ConcentracionUtilizada = table.Column<int>(nullable: true),
                    EstaConforme = table.Column<bool>(nullable: true),
                    FechaDePreparacion = table.Column<DateTime>(nullable: true),
                    InspeccionLuzNegra = table.Column<bool>(nullable: true),
                    InspeccionParticulasMagneticas = table.Column<bool>(nullable: true),
                    IntensidadLuzBlanca = table.Column<int>(nullable: true),
                    IntensidadLuzNegra = table.Column<int>(nullable: true),
                    Lote = table.Column<int>(nullable: true),
                    Pieza = table.Column<int>(nullable: false),
                    Lumens = table.Column<int>(nullable: true),
                    Luxes = table.Column<int>(nullable: true),
                    Observaciones = table.Column<string>(nullable: true),
                    ObservacionesInspeccion = table.Column<string>(nullable: true),
                    SeIdentificaDefecto = table.Column<bool>(nullable: true),
                    SeRealizoCalibracionEquipo = table.Column<bool>(nullable: true),
                    TemperaturaAmbiente = table.Column<int>(nullable: true),
                    TemperaturaDePieza = table.Column<int>(nullable: true),
                    VelocidadBuggyDrive = table.Column<int>(nullable: true),
                    BloqueEscalonadoUsadoId = table.Column<int>(nullable: true),
                    BobinaMagneticaId = table.Column<int>(nullable: true),
                    EquipoEmiId = table.Column<int>(nullable: true),
                    EstadoId = table.Column<int>(nullable: true),
                    TipoDeLiquidosId = table.Column<int>(nullable: true),
                    TipoInspeccionId = table.Column<int>(nullable: false),
                    TurboPatronId = table.Column<int>(nullable: true),
                    ImagenMedicionEspesoresId = table.Column<int>(nullable: true),
                    ImagenMflId = table.Column<int>(nullable: true),
                    ImagenPantallaUltrasonidoId = table.Column<int>(nullable: true),
                    ImagenUltrasonidoDespuesId = table.Column<int>(nullable: true),
                    ImagenUltrasonidoDuranteId = table.Column<int>(nullable: true),
                    ImagenUltrasonidoPreviaId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inspeccion", x => x.Id);
                    table.UniqueConstraint("AK_Inspeccion_Pieza_TipoInspeccionId_Id", x => new { x.Pieza, x.TipoInspeccionId, x.Id });
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_BloqueEscalonadoUsadoId",
                        column: x => x.BloqueEscalonadoUsadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_BobinaMagneticaId",
                        column: x => x.BobinaMagneticaId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_EquipoEmiId",
                        column: x => x.EquipoEmiId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_EstadoId",
                        column: x => x.EstadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenMedicionEspesoresId",
                        column: x => x.ImagenMedicionEspesoresId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenMflId",
                        column: x => x.ImagenMflId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenPantallaUltrasonidoId",
                        column: x => x.ImagenPantallaUltrasonidoId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDespuesId",
                        column: x => x.ImagenUltrasonidoDespuesId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDuranteId",
                        column: x => x.ImagenUltrasonidoDuranteId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoPreviaId",
                        column: x => x.ImagenUltrasonidoPreviaId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inspeccion_Catalogo_TipoDeLiquidosId",
                        column: x => x.TipoDeLiquidosId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                        onDelete: ReferentialAction.Restrict);
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
                name: "SolicitudOrdenTrabajo",
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
                    Cantidad = table.Column<int>(nullable: false),
                    CantidadInspeccionar = table.Column<int>(nullable: false),
                    Contacto = table.Column<string>(nullable: false),
                    Cotizacion = table.Column<int>(nullable: false),
                    DetallesSolicitud = table.Column<string>(nullable: false),
                    ClienteId = table.Column<int>(nullable: false),
                    EstadoId = table.Column<int>(nullable: false),
                    LineaId = table.Column<int>(nullable: false),
                    OrigenSolicitudId = table.Column<int>(nullable: false),
                    PrioridadId = table.Column<int>(nullable: false),
                    ResponsableId = table.Column<int>(nullable: true),
                    RemisionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SolicitudOrdenTrabajo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SolicitudOrdenTrabajo_Cliente_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Cliente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SolicitudOrdenTrabajo_Catalogo_EstadoId",
                        column: x => x.EstadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SolicitudOrdenTrabajo_ClienteLinea_LineaId",
                        column: x => x.LineaId,
                        principalTable: "ClienteLinea",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SolicitudOrdenTrabajo_Catalogo_OrigenSolicitudId",
                        column: x => x.OrigenSolicitudId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SolicitudOrdenTrabajo_Catalogo_PrioridadId",
                        column: x => x.PrioridadId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SolicitudOrdenTrabajo_DocumentoAdjunto_RemisionId",
                        column: x => x.RemisionId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SolicitudOrdenTrabajo_Catalogo_ResponsableId",
                        column: x => x.ResponsableId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "InspeccionEquipoUtilizado",
                columns: table => new
                {
                    EquipoUtilizadoId = table.Column<int>(nullable: false),
                    InspeccionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionEquipoUtilizado", x => new { x.InspeccionId, x.EquipoUtilizadoId });
                    table.ForeignKey(
                        name: "FK_InspeccionEquipoUtilizado_Catalogo_EquipoUtilizadoId",
                        column: x => x.EquipoUtilizadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionEquipoUtilizado_Inspeccion_InspeccionId",
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
                name: "InspeccionFotos",
                columns: table => new
                {
                    DocumentoAdjuntoId = table.Column<int>(nullable: false),
                    InspeccionId = table.Column<int>(nullable: false),
                    Pieza = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionFotos", x => new { x.InspeccionId, x.DocumentoAdjuntoId, x.Pieza });
                    table.ForeignKey(
                        name: "FK_InspeccionFotos_DocumentoAdjunto_DocumentoAdjuntoId",
                        column: x => x.DocumentoAdjuntoId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionFotos_Inspeccion_InspeccionId",
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
                    InspeccionId = table.Column<int>(nullable: false),
                    FormatoId = table.Column<int>(nullable: false)
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
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexion_Catalogo_TipoConexionId",
                        column: x => x.TipoConexionId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrdenTrabajo",
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
                    Cantidad = table.Column<int>(nullable: false),
                    CantidadInspeccionar = table.Column<int>(nullable: false),
                    Cotizacion = table.Column<int>(nullable: false),
                    DetallesSolicitud = table.Column<string>(nullable: true),
                    ObservacionRemision = table.Column<string>(nullable: true),
                    OrdenCompra = table.Column<int>(nullable: false),
                    ProvieneDeSolicitud = table.Column<bool>(nullable: false),
                    RemisionCliente = table.Column<int>(nullable: false),
                    SerialHerramienta = table.Column<string>(nullable: true),
                    SerialMaterial = table.Column<string>(nullable: true),
                    EstadoId = table.Column<int>(nullable: false),
                    TipoServicioId = table.Column<int>(nullable: false),
                    ResponsableId = table.Column<int>(nullable: true),
                    PrioridadId = table.Column<int>(nullable: false),
                    MaterialId = table.Column<int>(nullable: true),
                    TamanoHerramientaId = table.Column<int>(nullable: true),
                    HerramientaId = table.Column<int>(nullable: true),
                    LineaId = table.Column<int>(nullable: false),
                    ClienteId = table.Column<int>(nullable: false),
                    RemisionInicialId = table.Column<int>(nullable: true),
                    SolicitudOrdenTrabajoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdenTrabajo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_Cliente_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Cliente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_Catalogo_EstadoId",
                        column: x => x.EstadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_Herramienta_HerramientaId",
                        column: x => x.HerramientaId,
                        principalTable: "Herramienta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_ClienteLinea_LineaId",
                        column: x => x.LineaId,
                        principalTable: "ClienteLinea",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_HerramientaMaterial_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "HerramientaMaterial",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_Catalogo_PrioridadId",
                        column: x => x.PrioridadId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_DocumentoAdjunto_RemisionInicialId",
                        column: x => x.RemisionInicialId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_Catalogo_ResponsableId",
                        column: x => x.ResponsableId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_SolicitudOrdenTrabajo_SolicitudOrdenTrabajoId",
                        column: x => x.SolicitudOrdenTrabajoId,
                        principalTable: "SolicitudOrdenTrabajo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_HerramientaTamano_TamanoHerramientaId",
                        column: x => x.TamanoHerramientaId,
                        principalTable: "HerramientaTamano",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_Catalogo_TipoServicioId",
                        column: x => x.TipoServicioId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SolicitudOrdenTrabajoAnexos",
                columns: table => new
                {
                    Estado = table.Column<bool>(nullable: false),
                    SolicitudOrdenTrabajoId = table.Column<int>(nullable: false),
                    DocumentoAdjuntoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SolicitudOrdenTrabajoAnexos", x => new { x.SolicitudOrdenTrabajoId, x.DocumentoAdjuntoId });
                    table.ForeignKey(
                        name: "FK_SolicitudOrdenTrabajoAnexos_DocumentoAdjunto_DocumentoAdjunt~",
                        column: x => x.DocumentoAdjuntoId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SolicitudOrdenTrabajoAnexos_SolicitudOrdenTrabajo_SolicitudO~",
                        column: x => x.SolicitudOrdenTrabajoId,
                        principalTable: "SolicitudOrdenTrabajo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrdenTrabajoAnexos",
                columns: table => new
                {
                    Estado = table.Column<bool>(nullable: false),
                    OrdenTrabajoId = table.Column<int>(nullable: false),
                    DocumentoAdjuntoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdenTrabajoAnexos", x => new { x.OrdenTrabajoId, x.DocumentoAdjuntoId });
                    table.ForeignKey(
                        name: "FK_OrdenTrabajoAnexos_DocumentoAdjunto_DocumentoAdjuntoId",
                        column: x => x.DocumentoAdjuntoId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajoAnexos_OrdenTrabajo_OrdenTrabajoId",
                        column: x => x.OrdenTrabajoId,
                        principalTable: "OrdenTrabajo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrdenTrabajoHistorialModificacion",
                columns: table => new
                {
                    Campo = table.Column<string>(nullable: false),
                    FechaModificacion = table.Column<DateTime>(nullable: false),
                    Guid = table.Column<Guid>(nullable: false),
                    GuidUsuarioModifica = table.Column<Guid>(nullable: false),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UsuarioModifica = table.Column<string>(nullable: false),
                    ValorAnterior = table.Column<string>(nullable: false),
                    OrdenTrabajoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdenTrabajoHistorialModificacion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajoHistorialModificacion_OrdenTrabajo_OrdenTrabajoId",
                        column: x => x.OrdenTrabajoId,
                        principalTable: "OrdenTrabajo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrdenTrabajoHistorialProceso",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EstadoProceso = table.Column<int>(nullable: false),
                    FechaProceso = table.Column<DateTime>(nullable: false),
                    LiberaProcesoAnteriorId = table.Column<int>(nullable: false),
                    Observaciones = table.Column<string>(nullable: true),
                    OperarioId = table.Column<int>(nullable: false),
                    TipoProcesoId = table.Column<int>(nullable: false),
                    TipoProcesoAnteriorId = table.Column<int>(nullable: false),
                    OrdenTrabajoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdenTrabajoHistorialProceso", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajoHistorialProceso_OrdenTrabajo_OrdenTrabajoId",
                        column: x => x.OrdenTrabajoId,
                        principalTable: "OrdenTrabajo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    TipoProcesoAnteriorId = table.Column<int>(nullable: true),
                    TipoProcesoId = table.Column<int>(nullable: true),
                    TipoProcesoSiguienteId = table.Column<int>(nullable: true),
                    TipoProcesoSiguienteSugeridoId = table.Column<int>(nullable: true),
                    TipoSoldaduraId = table.Column<int>(nullable: true),
                    EquipoMedicionUtilizadoId = table.Column<int>(nullable: true),
                    NormaId = table.Column<int>(nullable: true),
                    MaquinaAsignadaId = table.Column<int>(nullable: true),
                    InstructivoId = table.Column<int>(nullable: true),
                    ProcesosRealizarId = table.Column<int>(nullable: true),
                    ProcesoSiguienteId = table.Column<int>(nullable: true),
                    ProcesoAnteriorId = table.Column<int>(nullable: true),
                    OrdenTrabajoId = table.Column<int>(nullable: false),
                    DetalleSoldaduraId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proceso", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Proceso_DetalleSoldadura_DetalleSoldaduraId",
                        column: x => x.DetalleSoldaduraId,
                        principalTable: "DetalleSoldadura",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_MaquinaAsignadaId",
                        column: x => x.MaquinaAsignadaId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_TipoProcesoId",
                        column: x => x.TipoProcesoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_TipoProcesoSiguienteId",
                        column: x => x.TipoProcesoSiguienteId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_TipoProcesoSiguienteSugeridoId",
                        column: x => x.TipoProcesoSiguienteSugeridoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Proceso_Catalogo_TipoSoldaduraId",
                        column: x => x.TipoSoldaduraId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "IX_Catalogo_CatalogoId",
                table: "Catalogo",
                column: "CatalogoId");

            migrationBuilder.CreateIndex(
                name: "IX_Cliente_DocumentoAdjuntoId",
                table: "Cliente",
                column: "DocumentoAdjuntoId");

            migrationBuilder.CreateIndex(
                name: "IX_Cliente_EstadoId",
                table: "Cliente",
                column: "EstadoId");

            migrationBuilder.CreateIndex(
                name: "IX_ClienteLinea_ClienteId",
                table: "ClienteLinea",
                column: "ClienteId");

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
                name: "IX_DocumentoAdjunto_FormatoId",
                table: "DocumentoAdjunto",
                column: "FormatoId");

            migrationBuilder.CreateIndex(
                name: "IX_Formato_ConexionId",
                table: "Formato",
                column: "ConexionId");

            migrationBuilder.CreateIndex(
                name: "IX_Formato_EspecificacionId",
                table: "Formato",
                column: "EspecificacionId");

            migrationBuilder.CreateIndex(
                name: "IX_Formato_HerramientaId",
                table: "Formato",
                column: "HerramientaId");

            migrationBuilder.CreateIndex(
                name: "IX_Formato_TipoFormatoId",
                table: "Formato",
                column: "TipoFormatoId");

            migrationBuilder.CreateIndex(
                name: "IX_Formato_TiposConexionesId",
                table: "Formato",
                column: "TiposConexionesId");

            migrationBuilder.CreateIndex(
                name: "IX_FormatoAdendum_FormatoId",
                table: "FormatoAdendum",
                column: "FormatoId");

            migrationBuilder.CreateIndex(
                name: "IX_FormatoAdendum_TipoId",
                table: "FormatoAdendum",
                column: "TipoId");

            migrationBuilder.CreateIndex(
                name: "IX_FormatoParametro_FormatoId",
                table: "FormatoParametro",
                column: "FormatoId");

            migrationBuilder.CreateIndex(
                name: "IX_Herramienta_ClienteId",
                table: "Herramienta",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Herramienta_EstadoId",
                table: "Herramienta",
                column: "EstadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Herramienta_LineaId",
                table: "Herramienta",
                column: "LineaId");

            migrationBuilder.CreateIndex(
                name: "IX_HerramientaEstudioFactibilidad_HerramientaId",
                table: "HerramientaEstudioFactibilidad",
                column: "HerramientaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_HerramientaMaterial_HerramientaId",
                table: "HerramientaMaterial",
                column: "HerramientaId");

            migrationBuilder.CreateIndex(
                name: "IX_HerramientaMaterial_MaterialId",
                table: "HerramientaMaterial",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_HerramientaTamano_HerramientaId",
                table: "HerramientaTamano",
                column: "HerramientaId");

            migrationBuilder.CreateIndex(
                name: "IX_HerramientaTamanoMotor_HerramientaId",
                table: "HerramientaTamanoMotor",
                column: "HerramientaId");

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
                name: "IX_InspeccionEquipoUtilizado_EquipoUtilizadoId",
                table: "InspeccionEquipoUtilizado",
                column: "EquipoUtilizadoId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionEspesor_InspeccionId",
                table: "InspeccionEspesor",
                column: "InspeccionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionFotos_DocumentoAdjuntoId",
                table: "InspeccionFotos",
                column: "DocumentoAdjuntoId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionInsumo_InspeccionId",
                table: "InspeccionInsumo",
                column: "InspeccionId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionInsumo_TipoInsumoId",
                table: "InspeccionInsumo",
                column: "TipoInsumoId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_ClienteId",
                table: "OrdenTrabajo",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_EstadoId",
                table: "OrdenTrabajo",
                column: "EstadoId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_HerramientaId",
                table: "OrdenTrabajo",
                column: "HerramientaId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_LineaId",
                table: "OrdenTrabajo",
                column: "LineaId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_MaterialId",
                table: "OrdenTrabajo",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_PrioridadId",
                table: "OrdenTrabajo",
                column: "PrioridadId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_RemisionInicialId",
                table: "OrdenTrabajo",
                column: "RemisionInicialId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_ResponsableId",
                table: "OrdenTrabajo",
                column: "ResponsableId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_SolicitudOrdenTrabajoId",
                table: "OrdenTrabajo",
                column: "SolicitudOrdenTrabajoId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_TamanoHerramientaId",
                table: "OrdenTrabajo",
                column: "TamanoHerramientaId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_TipoServicioId",
                table: "OrdenTrabajo",
                column: "TipoServicioId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajoAnexos_DocumentoAdjuntoId",
                table: "OrdenTrabajoAnexos",
                column: "DocumentoAdjuntoId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajoHistorialModificacion_OrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion",
                column: "OrdenTrabajoId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajoHistorialProceso_OrdenTrabajoId",
                table: "OrdenTrabajoHistorialProceso",
                column: "OrdenTrabajoId");

            migrationBuilder.CreateIndex(
                name: "IX_ParametroCatalogo_CatalogoId",
                table: "ParametroCatalogo",
                column: "CatalogoId");

            migrationBuilder.CreateIndex(
                name: "IX_ParametroCatalogo_Entidad",
                table: "ParametroCatalogo",
                column: "Entidad");

            migrationBuilder.CreateIndex(
                name: "IX_ParametroConsulta_ConsultaId",
                table: "ParametroConsulta",
                column: "ConsultaId");

            migrationBuilder.CreateIndex(
                name: "IX_ParametroConsulta_Entidad",
                table: "ParametroConsulta",
                column: "Entidad");

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

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajo_ClienteId",
                table: "SolicitudOrdenTrabajo",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajo_EstadoId",
                table: "SolicitudOrdenTrabajo",
                column: "EstadoId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajo_LineaId",
                table: "SolicitudOrdenTrabajo",
                column: "LineaId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajo_OrigenSolicitudId",
                table: "SolicitudOrdenTrabajo",
                column: "OrigenSolicitudId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajo_PrioridadId",
                table: "SolicitudOrdenTrabajo",
                column: "PrioridadId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajo_RemisionId",
                table: "SolicitudOrdenTrabajo",
                column: "RemisionId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajo_ResponsableId",
                table: "SolicitudOrdenTrabajo",
                column: "ResponsableId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajoAnexos_DocumentoAdjuntoId",
                table: "SolicitudOrdenTrabajoAnexos",
                column: "DocumentoAdjuntoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cliente_DocumentoAdjunto_DocumentoAdjuntoId",
                table: "Cliente",
                column: "DocumentoAdjuntoId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleSoldadura_Proceso_ProcesoId",
                table: "DetalleSoldadura",
                column: "ProcesoId",
                principalTable: "Proceso",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cliente_DocumentoAdjunto_DocumentoAdjuntoId",
                table: "Cliente");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_DocumentoAdjunto_RemisionInicialId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajo_DocumentoAdjunto_RemisionId",
                table: "SolicitudOrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_Cliente_Catalogo_EstadoId",
                table: "Cliente");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_ModoAplicacionId",
                table: "DetalleSoldadura");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TamañoCortadoresId",
                table: "DetalleSoldadura");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TipoFuenteId",
                table: "DetalleSoldadura");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TipoSoldaduraId",
                table: "DetalleSoldadura");

            migrationBuilder.DropForeignKey(
                name: "FK_Herramienta_Catalogo_EstadoId",
                table: "Herramienta");

            migrationBuilder.DropForeignKey(
                name: "FK_HerramientaMaterial_Catalogo_MaterialId",
                table: "HerramientaMaterial");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_Catalogo_EstadoId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_Catalogo_PrioridadId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_Catalogo_ResponsableId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_Catalogo_TipoServicioId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_EquipoMedicionUtilizadoId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_EstadoId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_InstructivoId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_MaquinaAsignadaId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_NormaId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoAnteriorId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoSiguienteId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoSiguienteSugeridoId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoSoldaduraId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajo_Catalogo_EstadoId",
                table: "SolicitudOrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajo_Catalogo_OrigenSolicitudId",
                table: "SolicitudOrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajo_Catalogo_PrioridadId",
                table: "SolicitudOrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajo_Catalogo_ResponsableId",
                table: "SolicitudOrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_ClienteLinea_Cliente_ClienteId",
                table: "ClienteLinea");

            migrationBuilder.DropForeignKey(
                name: "FK_Herramienta_Cliente_ClienteId",
                table: "Herramienta");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_Cliente_ClienteId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajo_Cliente_ClienteId",
                table: "SolicitudOrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Proceso_ProcesoId",
                table: "DetalleSoldadura");

            migrationBuilder.DropTable(
                name: "FormatoAdendum");

            migrationBuilder.DropTable(
                name: "FormatoParametro");

            migrationBuilder.DropTable(
                name: "HerramientaEstudioFactibilidad");

            migrationBuilder.DropTable(
                name: "HerramientaTamanoMotor");

            migrationBuilder.DropTable(
                name: "InspeccionConexion");

            migrationBuilder.DropTable(
                name: "InspeccionDimensionalOtro");

            migrationBuilder.DropTable(
                name: "InspeccionEquipoUtilizado");

            migrationBuilder.DropTable(
                name: "InspeccionEspesor");

            migrationBuilder.DropTable(
                name: "InspeccionFotos");

            migrationBuilder.DropTable(
                name: "InspeccionInsumo");

            migrationBuilder.DropTable(
                name: "OrdenTrabajoAnexos");

            migrationBuilder.DropTable(
                name: "OrdenTrabajoHistorialModificacion");

            migrationBuilder.DropTable(
                name: "OrdenTrabajoHistorialProceso");

            migrationBuilder.DropTable(
                name: "ParametroCatalogo");

            migrationBuilder.DropTable(
                name: "ParametroConsulta");

            migrationBuilder.DropTable(
                name: "ProcesoInspeccionEntrada");

            migrationBuilder.DropTable(
                name: "ProcesoInspeccionSalida");

            migrationBuilder.DropTable(
                name: "SolicitudOrdenTrabajoAnexos");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormato");

            migrationBuilder.DropTable(
                name: "Consulta");

            migrationBuilder.DropTable(
                name: "Parametro");

            migrationBuilder.DropTable(
                name: "Inspeccion");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormatoAdendum");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropTable(
                name: "DocumentoAdjunto");

            migrationBuilder.DropTable(
                name: "Formato");

            migrationBuilder.DropTable(
                name: "Catalogo");

            migrationBuilder.DropTable(
                name: "Cliente");

            migrationBuilder.DropTable(
                name: "Proceso");

            migrationBuilder.DropTable(
                name: "DetalleSoldadura");

            migrationBuilder.DropTable(
                name: "OrdenTrabajo");

            migrationBuilder.DropTable(
                name: "HerramientaMaterial");

            migrationBuilder.DropTable(
                name: "SolicitudOrdenTrabajo");

            migrationBuilder.DropTable(
                name: "HerramientaTamano");

            migrationBuilder.DropTable(
                name: "Herramienta");

            migrationBuilder.DropTable(
                name: "ClienteLinea");
        }
    }
}

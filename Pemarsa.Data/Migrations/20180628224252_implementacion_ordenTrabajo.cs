using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class implementacion_ordenTrabajo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos",
                nullable: true);

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
                    MaterialId = table.Column<int>(nullable: false),
                    TamanoHerramientaId = table.Column<int>(nullable: false),
                    HerramientaId = table.Column<int>(nullable: false),
                    LineaID = table.Column<int>(nullable: false),
                    ClienteId = table.Column<int>(nullable: false),
                    RemisionInicialId = table.Column<int>(nullable: false),
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
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_ClienteLinea_LineaID",
                        column: x => x.LineaID,
                        principalTable: "ClienteLinea",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_HerramientaMaterial_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "HerramientaMaterial",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                        onDelete: ReferentialAction.Cascade);
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
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajo_Catalogo_TipoServicioId",
                        column: x => x.TipoServicioId,
                        principalTable: "Catalogo",
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
                    SolicitudOrdenTrabajoId = table.Column<int>(nullable: false),
                    OrdenTrabajoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdenTrabajoHistorialModificacion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajoHistorialModificacion_OrdenTrabajo_OrdenTrabajoId",
                        column: x => x.OrdenTrabajoId,
                        principalTable: "OrdenTrabajo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajoHistorialModificacion_SolicitudOrdenTrabajo_Soli~",
                        column: x => x.SolicitudOrdenTrabajoId,
                        principalTable: "SolicitudOrdenTrabajo",
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

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajoAnexos_OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos",
                column: "OrdenTrabajoId");

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
                name: "IX_OrdenTrabajo_LineaID",
                table: "OrdenTrabajo",
                column: "LineaID");

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
                name: "IX_OrdenTrabajoHistorialModificacion_OrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion",
                column: "OrdenTrabajoId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajoHistorialModificacion_SolicitudOrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion",
                column: "SolicitudOrdenTrabajoId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajoHistorialProceso_OrdenTrabajoId",
                table: "OrdenTrabajoHistorialProceso",
                column: "OrdenTrabajoId");

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitudOrdenTrabajoAnexos_OrdenTrabajo_OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos",
                column: "OrdenTrabajoId",
                principalTable: "OrdenTrabajo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajoAnexos_OrdenTrabajo_OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos");

            migrationBuilder.DropTable(
                name: "OrdenTrabajoHistorialModificacion");

            migrationBuilder.DropTable(
                name: "OrdenTrabajoHistorialProceso");

            migrationBuilder.DropTable(
                name: "OrdenTrabajo");

            migrationBuilder.DropIndex(
                name: "IX_SolicitudOrdenTrabajoAnexos_OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos");

            migrationBuilder.DropColumn(
                name: "OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos");
        }
    }
}

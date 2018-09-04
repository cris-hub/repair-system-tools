using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class agregartableremision : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RemisionId",
                table: "OrdenTrabajo",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Remision",
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
                    EstadoId = table.Column<int>(nullable: false),
                    ImagenFacturaID = table.Column<int>(nullable: false),
                    ImagenRemisionId = table.Column<int>(nullable: false),
                    OrdenTrabajoId = table.Column<int>(nullable: false),
                    NumeroFactura = table.Column<int>(nullable: false),
                    ValorFactura = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Remision", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Remision_Catalogo_EstadoId",
                        column: x => x.EstadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Remision_DocumentoAdjunto_ImagenFacturaID",
                        column: x => x.ImagenFacturaID,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Remision_DocumentoAdjunto_ImagenRemisionId",
                        column: x => x.ImagenRemisionId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Remision_OrdenTrabajo_OrdenTrabajoId",
                        column: x => x.OrdenTrabajoId,
                        principalTable: "OrdenTrabajo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajo_RemisionId",
                table: "OrdenTrabajo",
                column: "RemisionId");

            migrationBuilder.CreateIndex(
                name: "IX_Remision_EstadoId",
                table: "Remision",
                column: "EstadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Remision_ImagenFacturaID",
                table: "Remision",
                column: "ImagenFacturaID");

            migrationBuilder.CreateIndex(
                name: "IX_Remision_ImagenRemisionId",
                table: "Remision",
                column: "ImagenRemisionId");

            migrationBuilder.CreateIndex(
                name: "IX_Remision_OrdenTrabajoId",
                table: "Remision",
                column: "OrdenTrabajoId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajo_Remision_RemisionId",
                table: "OrdenTrabajo",
                column: "RemisionId",
                principalTable: "Remision",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_Remision_RemisionId",
                table: "OrdenTrabajo");

            migrationBuilder.DropTable(
                name: "Remision");

            migrationBuilder.DropIndex(
                name: "IX_OrdenTrabajo_RemisionId",
                table: "OrdenTrabajo");

            migrationBuilder.DropColumn(
                name: "RemisionId",
                table: "OrdenTrabajo");
        }
    }
}

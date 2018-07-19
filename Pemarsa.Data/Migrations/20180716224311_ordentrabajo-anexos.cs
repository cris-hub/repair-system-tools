using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class ordentrabajoanexos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajoAnexos_DocumentoAdjuntoId",
                table: "OrdenTrabajoAnexos",
                column: "DocumentoAdjuntoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrdenTrabajoAnexos");
        }
    }
}

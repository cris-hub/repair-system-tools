using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class relationinspecciondocumentoadjunto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DocumentoAdjunto_Inspeccion_InspeccionId",
                table: "DocumentoAdjunto");

            migrationBuilder.DropIndex(
                name: "IX_DocumentoAdjunto_InspeccionId",
                table: "DocumentoAdjunto");

            migrationBuilder.DropColumn(
                name: "InspeccionId",
                table: "DocumentoAdjunto");

            migrationBuilder.CreateTable(
                name: "InspeccionFotos",
                columns: table => new
                {
                    DocumentoAdjuntoId = table.Column<int>(nullable: false),
                    InspeccionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionFotos", x => new { x.InspeccionId, x.DocumentoAdjuntoId });
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

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionFotos_DocumentoAdjuntoId",
                table: "InspeccionFotos",
                column: "DocumentoAdjuntoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InspeccionFotos");

            migrationBuilder.AddColumn<int>(
                name: "InspeccionId",
                table: "DocumentoAdjunto",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DocumentoAdjunto_InspeccionId",
                table: "DocumentoAdjunto",
                column: "InspeccionId");

            migrationBuilder.AddForeignKey(
                name: "FK_DocumentoAdjunto_Inspeccion_InspeccionId",
                table: "DocumentoAdjunto",
                column: "InspeccionId",
                principalTable: "Inspeccion",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

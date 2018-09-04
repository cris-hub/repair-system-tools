using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class estandar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenFacturaID",
                table: "Remision");

            migrationBuilder.RenameColumn(
                name: "ImagenFacturaID",
                table: "Remision",
                newName: "ImagenFacturaId");

            migrationBuilder.RenameIndex(
                name: "IX_Remision_ImagenFacturaID",
                table: "Remision",
                newName: "IX_Remision_ImagenFacturaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenFacturaId",
                table: "Remision",
                column: "ImagenFacturaId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenFacturaId",
                table: "Remision");

            migrationBuilder.RenameColumn(
                name: "ImagenFacturaId",
                table: "Remision",
                newName: "ImagenFacturaID");

            migrationBuilder.RenameIndex(
                name: "IX_Remision_ImagenFacturaId",
                table: "Remision",
                newName: "IX_Remision_ImagenFacturaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenFacturaID",
                table: "Remision",
                column: "ImagenFacturaID",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

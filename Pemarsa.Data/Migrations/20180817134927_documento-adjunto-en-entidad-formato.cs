using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class documentoadjuntoenentidadformato : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdjuntoId",
                table: "Formato",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Formato_AdjuntoId",
                table: "Formato",
                column: "AdjuntoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Formato_DocumentoAdjunto_AdjuntoId",
                table: "Formato",
                column: "AdjuntoId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Formato_DocumentoAdjunto_AdjuntoId",
                table: "Formato");

            migrationBuilder.DropIndex(
                name: "IX_Formato_AdjuntoId",
                table: "Formato");

            migrationBuilder.DropColumn(
                name: "AdjuntoId",
                table: "Formato");
        }
    }
}

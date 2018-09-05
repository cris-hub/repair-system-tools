using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class referenciaaformatodesdelainspeccionconexioncoreespondientealformato : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FormatoId",
                table: "InspeccionConexion",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexion_FormatoId",
                table: "InspeccionConexion",
                column: "FormatoId");

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexion_Formato_FormatoId",
                table: "InspeccionConexion",
                column: "FormatoId",
                principalTable: "Formato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_Formato_FormatoId",
                table: "InspeccionConexion");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexion_FormatoId",
                table: "InspeccionConexion");

            migrationBuilder.DropColumn(
                name: "FormatoId",
                table: "InspeccionConexion");
        }
    }
}

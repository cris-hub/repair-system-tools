using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class relacionprocesoinspeccionConexionFormato : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InspeccionConexionFormatoId",
                table: "Proceso",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_InspeccionConexionFormatoId",
                table: "Proceso",
                column: "InspeccionConexionFormatoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_InspeccionConexionFormato_InspeccionConexionFormatoId",
                table: "Proceso",
                column: "InspeccionConexionFormatoId",
                principalTable: "InspeccionConexionFormato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_InspeccionConexionFormato_InspeccionConexionFormatoId",
                table: "Proceso");

            migrationBuilder.DropIndex(
                name: "IX_Proceso_InspeccionConexionFormatoId",
                table: "Proceso");

            migrationBuilder.DropColumn(
                name: "InspeccionConexionFormatoId",
                table: "Proceso");
        }
    }
}

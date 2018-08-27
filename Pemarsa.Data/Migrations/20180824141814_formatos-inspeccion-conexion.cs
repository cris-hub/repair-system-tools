using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class formatosinspeccionconexion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FormatoParametroId",
                table: "InspeccionConexionFormatoParametros",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FormatoAdendumId",
                table: "InspeccionConexionFormatoAdendum",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormatoParametros_FormatoParametroId",
                table: "InspeccionConexionFormatoParametros",
                column: "FormatoParametroId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormatoAdendum_FormatoAdendumId",
                table: "InspeccionConexionFormatoAdendum",
                column: "FormatoAdendumId");

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormatoAdendum_FormatoAdendum_FormatoAdend~",
                table: "InspeccionConexionFormatoAdendum",
                column: "FormatoAdendumId",
                principalTable: "FormatoAdendum",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormatoParametros_FormatoParametro_Formato~",
                table: "InspeccionConexionFormatoParametros",
                column: "FormatoParametroId",
                principalTable: "FormatoParametro",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormatoAdendum_FormatoAdendum_FormatoAdend~",
                table: "InspeccionConexionFormatoAdendum");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormatoParametros_FormatoParametro_Formato~",
                table: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexionFormatoParametros_FormatoParametroId",
                table: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexionFormatoAdendum_FormatoAdendumId",
                table: "InspeccionConexionFormatoAdendum");

            migrationBuilder.DropColumn(
                name: "FormatoParametroId",
                table: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropColumn(
                name: "FormatoAdendumId",
                table: "InspeccionConexionFormatoAdendum");
        }
    }
}

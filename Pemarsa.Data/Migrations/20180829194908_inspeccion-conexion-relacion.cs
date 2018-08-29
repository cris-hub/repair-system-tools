using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class inspeccionconexionrelacion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "InspeccionConexionFormatoParametrosId",
                table: "FormatoParametro",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InspeccionConexionFormatoAdendumId",
                table: "FormatoAdendum",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FormatoParametro_InspeccionConexionFormatoParametrosId",
                table: "FormatoParametro",
                column: "InspeccionConexionFormatoParametrosId");

            migrationBuilder.CreateIndex(
                name: "IX_FormatoAdendum_InspeccionConexionFormatoAdendumId",
                table: "FormatoAdendum",
                column: "InspeccionConexionFormatoAdendumId");

            migrationBuilder.AddForeignKey(
                name: "FK_FormatoAdendum_InspeccionConexionFormatoAdendum_InspeccionCo~",
                table: "FormatoAdendum",
                column: "InspeccionConexionFormatoAdendumId",
                principalTable: "InspeccionConexionFormatoAdendum",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FormatoParametro_InspeccionConexionFormatoParametros_Inspecc~",
                table: "FormatoParametro",
                column: "InspeccionConexionFormatoParametrosId",
                principalTable: "InspeccionConexionFormatoParametros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormatoAdendum_InspeccionConexionFormatoAdendum_InspeccionCo~",
                table: "FormatoAdendum");

            migrationBuilder.DropForeignKey(
                name: "FK_FormatoParametro_InspeccionConexionFormatoParametros_Inspecc~",
                table: "FormatoParametro");

            migrationBuilder.DropIndex(
                name: "IX_FormatoParametro_InspeccionConexionFormatoParametrosId",
                table: "FormatoParametro");

            migrationBuilder.DropIndex(
                name: "IX_FormatoAdendum_InspeccionConexionFormatoAdendumId",
                table: "FormatoAdendum");

            migrationBuilder.DropColumn(
                name: "InspeccionConexionFormatoParametrosId",
                table: "FormatoParametro");

            migrationBuilder.DropColumn(
                name: "InspeccionConexionFormatoAdendumId",
                table: "FormatoAdendum");

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
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class inspeccionconexionrelacionformato : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormatoAdendum_InspeccionConexionFormatoAdendum_InspeccionCo~",
                table: "FormatoAdendum");

            migrationBuilder.DropForeignKey(
                name: "FK_FormatoParametro_InspeccionConexionFormatoParametros_Inspecc~",
                table: "FormatoParametro");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_InspeccionConexionFormatoAdendum_I~",
                table: "InspeccionConexionFormato");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_InspeccionConexionFormatoParametro~",
                table: "InspeccionConexionFormato");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexionFormato_InspeccionConexionFormatoAdendumId",
                table: "InspeccionConexionFormato");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexionFormato_InspeccionConexionFormatoParametro~",
                table: "InspeccionConexionFormato");

            migrationBuilder.DropIndex(
                name: "IX_FormatoParametro_InspeccionConexionFormatoParametrosId",
                table: "FormatoParametro");

            migrationBuilder.DropIndex(
                name: "IX_FormatoAdendum_InspeccionConexionFormatoAdendumId",
                table: "FormatoAdendum");

            migrationBuilder.DropColumn(
                name: "InspeccionConexionFormatoAdendumId",
                table: "InspeccionConexionFormato");

            migrationBuilder.DropColumn(
                name: "InspeccionConexionFormatoParametrosId",
                table: "InspeccionConexionFormato");

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
                name: "InspeccionConexionFormatoId",
                table: "InspeccionConexionFormatoParametros",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FormatoAdendumId",
                table: "InspeccionConexionFormatoAdendum",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InspeccionConexionFormatoId",
                table: "InspeccionConexionFormatoAdendum",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormatoParametros_FormatoParametroId",
                table: "InspeccionConexionFormatoParametros",
                column: "FormatoParametroId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormatoParametros_InspeccionConexionFormat~",
                table: "InspeccionConexionFormatoParametros",
                column: "InspeccionConexionFormatoId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormatoAdendum_FormatoAdendumId",
                table: "InspeccionConexionFormatoAdendum",
                column: "FormatoAdendumId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormatoAdendum_InspeccionConexionFormatoId",
                table: "InspeccionConexionFormatoAdendum",
                column: "InspeccionConexionFormatoId");

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormatoAdendum_FormatoAdendum_FormatoAdend~",
                table: "InspeccionConexionFormatoAdendum",
                column: "FormatoAdendumId",
                principalTable: "FormatoAdendum",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormatoAdendum_InspeccionConexionFormato_I~",
                table: "InspeccionConexionFormatoAdendum",
                column: "InspeccionConexionFormatoId",
                principalTable: "InspeccionConexionFormato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormatoParametros_FormatoParametro_Formato~",
                table: "InspeccionConexionFormatoParametros",
                column: "FormatoParametroId",
                principalTable: "FormatoParametro",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormatoParametros_InspeccionConexionFormat~",
                table: "InspeccionConexionFormatoParametros",
                column: "InspeccionConexionFormatoId",
                principalTable: "InspeccionConexionFormato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormatoAdendum_FormatoAdendum_FormatoAdend~",
                table: "InspeccionConexionFormatoAdendum");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormatoAdendum_InspeccionConexionFormato_I~",
                table: "InspeccionConexionFormatoAdendum");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormatoParametros_FormatoParametro_Formato~",
                table: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormatoParametros_InspeccionConexionFormat~",
                table: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexionFormatoParametros_FormatoParametroId",
                table: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexionFormatoParametros_InspeccionConexionFormat~",
                table: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexionFormatoAdendum_FormatoAdendumId",
                table: "InspeccionConexionFormatoAdendum");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexionFormatoAdendum_InspeccionConexionFormatoId",
                table: "InspeccionConexionFormatoAdendum");

            migrationBuilder.DropColumn(
                name: "FormatoParametroId",
                table: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropColumn(
                name: "InspeccionConexionFormatoId",
                table: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropColumn(
                name: "FormatoAdendumId",
                table: "InspeccionConexionFormatoAdendum");

            migrationBuilder.DropColumn(
                name: "InspeccionConexionFormatoId",
                table: "InspeccionConexionFormatoAdendum");

            migrationBuilder.AddColumn<int>(
                name: "InspeccionConexionFormatoAdendumId",
                table: "InspeccionConexionFormato",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InspeccionConexionFormatoParametrosId",
                table: "InspeccionConexionFormato",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InspeccionConexionFormatoParametrosId",
                table: "FormatoParametro",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InspeccionConexionFormatoAdendumId",
                table: "FormatoAdendum",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_InspeccionConexionFormatoAdendumId",
                table: "InspeccionConexionFormato",
                column: "InspeccionConexionFormatoAdendumId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_InspeccionConexionFormatoParametro~",
                table: "InspeccionConexionFormato",
                column: "InspeccionConexionFormatoParametrosId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_InspeccionConexionFormatoAdendum_I~",
                table: "InspeccionConexionFormato",
                column: "InspeccionConexionFormatoAdendumId",
                principalTable: "InspeccionConexionFormatoAdendum",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_InspeccionConexionFormatoParametro~",
                table: "InspeccionConexionFormato",
                column: "InspeccionConexionFormatoParametrosId",
                principalTable: "InspeccionConexionFormatoParametros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

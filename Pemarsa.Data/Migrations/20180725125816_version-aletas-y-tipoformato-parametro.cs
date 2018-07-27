using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class versionaletasytipoformatoparametro : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormatoParametro_Formato_FormatoId",
                table: "FormatoParametro");

            migrationBuilder.DropIndex(
                name: "IX_FormatoParametro_FormatoId",
                table: "FormatoParametro");

            migrationBuilder.DropColumn(
                name: "FormatoId",
                table: "FormatoParametro");

            migrationBuilder.AddColumn<int>(
                name: "TipoFormatoParametroId",
                table: "FormatoFormatoParametro",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Version",
                table: "Formato",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FormatoFormatoParametro_TipoFormatoParametroId",
                table: "FormatoFormatoParametro",
                column: "TipoFormatoParametroId");

            migrationBuilder.AddForeignKey(
                name: "FK_FormatoFormatoParametro_Catalogo_TipoFormatoParametroId",
                table: "FormatoFormatoParametro",
                column: "TipoFormatoParametroId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormatoFormatoParametro_Catalogo_TipoFormatoParametroId",
                table: "FormatoFormatoParametro");

            migrationBuilder.DropIndex(
                name: "IX_FormatoFormatoParametro_TipoFormatoParametroId",
                table: "FormatoFormatoParametro");

            migrationBuilder.DropColumn(
                name: "TipoFormatoParametroId",
                table: "FormatoFormatoParametro");

            migrationBuilder.DropColumn(
                name: "Version",
                table: "Formato");

            migrationBuilder.AddColumn<int>(
                name: "FormatoId",
                table: "FormatoParametro",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FormatoParametro_FormatoId",
                table: "FormatoParametro",
                column: "FormatoId");

            migrationBuilder.AddForeignKey(
                name: "FK_FormatoParametro_Formato_FormatoId",
                table: "FormatoParametro",
                column: "FormatoId",
                principalTable: "Formato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

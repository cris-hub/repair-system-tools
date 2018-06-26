using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class ajustetablaformato : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Formato_Catalogo_ConexionId",
                table: "Formato");

            migrationBuilder.DropForeignKey(
                name: "FK_Formato_Catalogo_EspecificacionId",
                table: "Formato");

            migrationBuilder.DropForeignKey(
                name: "FK_Formato_Catalogo_TiposConexionesId",
                table: "Formato");

            migrationBuilder.AlterColumn<int>(
                name: "TiposConexionesId",
                table: "Formato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "EspecificacionId",
                table: "Formato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<bool>(
                name: "EsFormatoAdjunto",
                table: "Formato",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<int>(
                name: "ConexionId",
                table: "Formato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Formato_Catalogo_ConexionId",
                table: "Formato",
                column: "ConexionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Formato_Catalogo_EspecificacionId",
                table: "Formato",
                column: "EspecificacionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Formato_Catalogo_TiposConexionesId",
                table: "Formato",
                column: "TiposConexionesId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Formato_Catalogo_ConexionId",
                table: "Formato");

            migrationBuilder.DropForeignKey(
                name: "FK_Formato_Catalogo_EspecificacionId",
                table: "Formato");

            migrationBuilder.DropForeignKey(
                name: "FK_Formato_Catalogo_TiposConexionesId",
                table: "Formato");

            migrationBuilder.AlterColumn<int>(
                name: "TiposConexionesId",
                table: "Formato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EspecificacionId",
                table: "Formato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "EsFormatoAdjunto",
                table: "Formato",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ConexionId",
                table: "Formato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Formato_Catalogo_ConexionId",
                table: "Formato",
                column: "ConexionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Formato_Catalogo_EspecificacionId",
                table: "Formato",
                column: "EspecificacionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Formato_Catalogo_TiposConexionesId",
                table: "Formato",
                column: "TiposConexionesId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

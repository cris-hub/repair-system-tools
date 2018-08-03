using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class inspeccioninsumonumerolotenulleabletipoinsumonulleable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionInsumo_Catalogo_TipoInsumoId",
                table: "InspeccionInsumo");

            migrationBuilder.AlterColumn<int>(
                name: "TipoInsumoId",
                table: "InspeccionInsumo",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "NumeroLote",
                table: "InspeccionInsumo",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionInsumo_Catalogo_TipoInsumoId",
                table: "InspeccionInsumo",
                column: "TipoInsumoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionInsumo_Catalogo_TipoInsumoId",
                table: "InspeccionInsumo");

            migrationBuilder.AlterColumn<int>(
                name: "TipoInsumoId",
                table: "InspeccionInsumo",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NumeroLote",
                table: "InspeccionInsumo",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionInsumo_Catalogo_TipoInsumoId",
                table: "InspeccionInsumo",
                column: "TipoInsumoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

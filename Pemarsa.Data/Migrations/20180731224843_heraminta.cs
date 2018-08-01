using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class heraminta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Herramienta_Catalogo_EstadoId",
                table: "Herramienta");

            migrationBuilder.DropForeignKey(
                name: "FK_Herramienta_ClienteLinea_LineaId",
                table: "Herramienta");

            migrationBuilder.AlterColumn<int>(
                name: "LineaId",
                table: "Herramienta",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "EstudioFactibilidadId",
                table: "Herramienta",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "EstadoId",
                table: "Herramienta",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Herramienta_Catalogo_EstadoId",
                table: "Herramienta",
                column: "EstadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Herramienta_ClienteLinea_LineaId",
                table: "Herramienta",
                column: "LineaId",
                principalTable: "ClienteLinea",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Herramienta_Catalogo_EstadoId",
                table: "Herramienta");

            migrationBuilder.DropForeignKey(
                name: "FK_Herramienta_ClienteLinea_LineaId",
                table: "Herramienta");

            migrationBuilder.AlterColumn<int>(
                name: "LineaId",
                table: "Herramienta",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EstudioFactibilidadId",
                table: "Herramienta",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EstadoId",
                table: "Herramienta",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Herramienta_Catalogo_EstadoId",
                table: "Herramienta",
                column: "EstadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Herramienta_ClienteLinea_LineaId",
                table: "Herramienta",
                column: "LineaId",
                principalTable: "ClienteLinea",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

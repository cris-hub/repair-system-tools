using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class estadoprocesonulleable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_EstadoId",
                table: "Proceso");

            migrationBuilder.AlterColumn<int>(
                name: "EstadoId",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_EstadoId",
                table: "Proceso",
                column: "EstadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_EstadoId",
                table: "Proceso");

            migrationBuilder.AlterColumn<int>(
                name: "EstadoId",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_EstadoId",
                table: "Proceso",
                column: "EstadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

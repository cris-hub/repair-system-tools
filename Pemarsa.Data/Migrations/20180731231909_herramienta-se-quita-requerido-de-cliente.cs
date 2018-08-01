using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class herramientasequitarequeridodecliente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Herramienta_Cliente_ClienteId",
                table: "Herramienta");

            migrationBuilder.AlterColumn<int>(
                name: "ClienteId",
                table: "Herramienta",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Herramienta_Cliente_ClienteId",
                table: "Herramienta",
                column: "ClienteId",
                principalTable: "Cliente",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Herramienta_Cliente_ClienteId",
                table: "Herramienta");

            migrationBuilder.AlterColumn<int>(
                name: "ClienteId",
                table: "Herramienta",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Herramienta_Cliente_ClienteId",
                table: "Herramienta",
                column: "ClienteId",
                principalTable: "Cliente",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

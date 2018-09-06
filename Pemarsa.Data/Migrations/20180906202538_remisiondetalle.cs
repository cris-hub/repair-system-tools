using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class remisiondetalle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RemisionDetalle_OrdenTrabajo_OrdenTrabajoId",
                table: "RemisionDetalle");

            migrationBuilder.AlterColumn<int>(
                name: "OrdenTrabajoId",
                table: "RemisionDetalle",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RemisionDetalle_OrdenTrabajo_OrdenTrabajoId",
                table: "RemisionDetalle",
                column: "OrdenTrabajoId",
                principalTable: "OrdenTrabajo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RemisionDetalle_OrdenTrabajo_OrdenTrabajoId",
                table: "RemisionDetalle");

            migrationBuilder.AlterColumn<int>(
                name: "OrdenTrabajoId",
                table: "RemisionDetalle",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_RemisionDetalle_OrdenTrabajo_OrdenTrabajoId",
                table: "RemisionDetalle",
                column: "OrdenTrabajoId",
                principalTable: "OrdenTrabajo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

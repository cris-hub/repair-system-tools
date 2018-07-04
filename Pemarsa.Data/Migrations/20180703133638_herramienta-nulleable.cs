using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class herramientanulleable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_Herramienta_HerramientaId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_ClienteLinea_LineaID",
                table: "OrdenTrabajo");

            migrationBuilder.RenameColumn(
                name: "LineaID",
                table: "OrdenTrabajo",
                newName: "LineaId");

            migrationBuilder.RenameIndex(
                name: "IX_OrdenTrabajo_LineaID",
                table: "OrdenTrabajo",
                newName: "IX_OrdenTrabajo_LineaId");

            migrationBuilder.AlterColumn<int>(
                name: "HerramientaId",
                table: "OrdenTrabajo",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajo_Herramienta_HerramientaId",
                table: "OrdenTrabajo",
                column: "HerramientaId",
                principalTable: "Herramienta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajo_ClienteLinea_LineaId",
                table: "OrdenTrabajo",
                column: "LineaId",
                principalTable: "ClienteLinea",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_Herramienta_HerramientaId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_ClienteLinea_LineaId",
                table: "OrdenTrabajo");

            migrationBuilder.RenameColumn(
                name: "LineaId",
                table: "OrdenTrabajo",
                newName: "LineaID");

            migrationBuilder.RenameIndex(
                name: "IX_OrdenTrabajo_LineaId",
                table: "OrdenTrabajo",
                newName: "IX_OrdenTrabajo_LineaID");

            migrationBuilder.AlterColumn<int>(
                name: "HerramientaId",
                table: "OrdenTrabajo",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajo_Herramienta_HerramientaId",
                table: "OrdenTrabajo",
                column: "HerramientaId",
                principalTable: "Herramienta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajo_ClienteLinea_LineaID",
                table: "OrdenTrabajo",
                column: "LineaID",
                principalTable: "ClienteLinea",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

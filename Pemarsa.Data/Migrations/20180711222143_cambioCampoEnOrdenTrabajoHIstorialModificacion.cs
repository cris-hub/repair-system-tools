using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class cambioCampoEnOrdenTrabajoHIstorialModificacion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajoHistorialModificacion_OrdenTrabajo_OrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajoHistorialModificacion_SolicitudOrdenTrabajo_Soli~",
                table: "OrdenTrabajoHistorialModificacion");

            migrationBuilder.DropIndex(
                name: "IX_OrdenTrabajoHistorialModificacion_SolicitudOrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion");

            migrationBuilder.DropColumn(
                name: "SolicitudOrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion");

            migrationBuilder.AlterColumn<int>(
                name: "OrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajoHistorialModificacion_OrdenTrabajo_OrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion",
                column: "OrdenTrabajoId",
                principalTable: "OrdenTrabajo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajoHistorialModificacion_OrdenTrabajo_OrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion");

            migrationBuilder.AlterColumn<int>(
                name: "OrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "SolicitudOrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajoHistorialModificacion_SolicitudOrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion",
                column: "SolicitudOrdenTrabajoId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajoHistorialModificacion_OrdenTrabajo_OrdenTrabajoId",
                table: "OrdenTrabajoHistorialModificacion",
                column: "OrdenTrabajoId",
                principalTable: "OrdenTrabajo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajoHistorialModificacion_SolicitudOrdenTrabajo_Soli~",
                table: "OrdenTrabajoHistorialModificacion",
                column: "SolicitudOrdenTrabajoId",
                principalTable: "SolicitudOrdenTrabajo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

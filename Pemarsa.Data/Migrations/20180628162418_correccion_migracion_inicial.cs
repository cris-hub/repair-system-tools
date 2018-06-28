using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class correccion_migracion_inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajoAnexos_SolicitudOrdenTrabajo_Solicitud~1",
                table: "SolicitudOrdenTrabajoAnexos");

            migrationBuilder.DropIndex(
                name: "IX_SolicitudOrdenTrabajoAnexos_SolicitudOrdenTrabajoId1",
                table: "SolicitudOrdenTrabajoAnexos");

            migrationBuilder.DropColumn(
                name: "SolicitudOrdenTrabajoId1",
                table: "SolicitudOrdenTrabajoAnexos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SolicitudOrdenTrabajoId1",
                table: "SolicitudOrdenTrabajoAnexos",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajoAnexos_SolicitudOrdenTrabajoId1",
                table: "SolicitudOrdenTrabajoAnexos",
                column: "SolicitudOrdenTrabajoId1");

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitudOrdenTrabajoAnexos_SolicitudOrdenTrabajo_Solicitud~1",
                table: "SolicitudOrdenTrabajoAnexos",
                column: "SolicitudOrdenTrabajoId1",
                principalTable: "SolicitudOrdenTrabajo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

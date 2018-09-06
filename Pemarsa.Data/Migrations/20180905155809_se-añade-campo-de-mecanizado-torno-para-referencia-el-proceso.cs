using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class seañadecampodemecanizadotornoparareferenciaelproceso : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Proceso_ProcesoAnteriorId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Proceso_ProcesoSiguienteId",
                table: "Proceso");

            migrationBuilder.DropIndex(
                name: "IX_Proceso_ProcesoAnteriorId",
                table: "Proceso");

            migrationBuilder.DropIndex(
                name: "IX_Proceso_ProcesoSiguienteId",
                table: "Proceso");

            migrationBuilder.AddColumn<int>(
                name: "ProcesoMecanizadoTornoId",
                table: "Proceso",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProcesoMecanizadoTornoId",
                table: "Proceso");

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_ProcesoAnteriorId",
                table: "Proceso",
                column: "ProcesoAnteriorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_ProcesoSiguienteId",
                table: "Proceso",
                column: "ProcesoSiguienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Proceso_ProcesoAnteriorId",
                table: "Proceso",
                column: "ProcesoAnteriorId",
                principalTable: "Proceso",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Proceso_ProcesoSiguienteId",
                table: "Proceso",
                column: "ProcesoSiguienteId",
                principalTable: "Proceso",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

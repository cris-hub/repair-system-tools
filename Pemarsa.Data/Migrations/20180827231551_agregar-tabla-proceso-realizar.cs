using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class agregartablaprocesorealizar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProcesosRealizarId",
                table: "Proceso");

            migrationBuilder.AddColumn<bool>(
                name: "AplicaEquipoMedicion",
                table: "Proceso",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProcesoRealizar",
                columns: table => new
                {
                    Valor = table.Column<string>(nullable: false),
                    TipoProcesoId = table.Column<int>(nullable: false),
                    ProcesoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcesoRealizar", x => new { x.TipoProcesoId, x.ProcesoId });
                    table.ForeignKey(
                        name: "FK_ProcesoRealizar_Proceso_ProcesoId",
                        column: x => x.ProcesoId,
                        principalTable: "Proceso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcesoRealizar_Catalogo_TipoProcesoId",
                        column: x => x.TipoProcesoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_ProcesoAnteriorId",
                table: "Proceso",
                column: "ProcesoAnteriorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Proceso_ProcesoSiguienteId",
                table: "Proceso",
                column: "ProcesoSiguienteId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcesoRealizar_ProcesoId",
                table: "ProcesoRealizar",
                column: "ProcesoId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Proceso_ProcesoAnteriorId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Proceso_ProcesoSiguienteId",
                table: "Proceso");

            migrationBuilder.DropTable(
                name: "ProcesoRealizar");

            migrationBuilder.DropIndex(
                name: "IX_Proceso_ProcesoAnteriorId",
                table: "Proceso");

            migrationBuilder.DropIndex(
                name: "IX_Proceso_ProcesoSiguienteId",
                table: "Proceso");

            migrationBuilder.DropColumn(
                name: "AplicaEquipoMedicion",
                table: "Proceso");

            migrationBuilder.AddColumn<int>(
                name: "ProcesosRealizarId",
                table: "Proceso",
                nullable: true);
        }
    }
}

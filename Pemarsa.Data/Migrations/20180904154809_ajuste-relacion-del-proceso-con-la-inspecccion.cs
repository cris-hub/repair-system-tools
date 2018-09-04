using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class ajusterelaciondelprocesoconlainspecccion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProcesoInspeccionEntrada");

            migrationBuilder.DropTable(
                name: "ProcesoInspeccionSalida");

            migrationBuilder.CreateTable(
                name: "ProcesoInspeccion",
                columns: table => new
                {
                    InspeccionId = table.Column<int>(nullable: false),
                    Activa = table.Column<bool>(nullable: false),
                    ProcesoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcesoInspeccion", x => new { x.InspeccionId, x.ProcesoId });
                    table.ForeignKey(
                        name: "FK_ProcesoInspeccion_Inspeccion_InspeccionId",
                        column: x => x.InspeccionId,
                        principalTable: "Inspeccion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcesoInspeccion_Proceso_ProcesoId",
                        column: x => x.ProcesoId,
                        principalTable: "Proceso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProcesoInspeccion_ProcesoId",
                table: "ProcesoInspeccion",
                column: "ProcesoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProcesoInspeccion");

            migrationBuilder.CreateTable(
                name: "ProcesoInspeccionEntrada",
                columns: table => new
                {
                    InspeccionId = table.Column<int>(nullable: false),
                    ProcesoId = table.Column<int>(nullable: false),
                    Activa = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcesoInspeccionEntrada", x => new { x.InspeccionId, x.ProcesoId });
                    table.ForeignKey(
                        name: "FK_ProcesoInspeccionEntrada_Inspeccion_InspeccionId",
                        column: x => x.InspeccionId,
                        principalTable: "Inspeccion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcesoInspeccionEntrada_Proceso_ProcesoId",
                        column: x => x.ProcesoId,
                        principalTable: "Proceso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProcesoInspeccionSalida",
                columns: table => new
                {
                    InspeccionId = table.Column<int>(nullable: false),
                    ProcesoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcesoInspeccionSalida", x => new { x.InspeccionId, x.ProcesoId });
                    table.ForeignKey(
                        name: "FK_ProcesoInspeccionSalida_Inspeccion_InspeccionId",
                        column: x => x.InspeccionId,
                        principalTable: "Inspeccion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcesoInspeccionSalida_Proceso_ProcesoId",
                        column: x => x.ProcesoId,
                        principalTable: "Proceso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProcesoInspeccionEntrada_ProcesoId",
                table: "ProcesoInspeccionEntrada",
                column: "ProcesoId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcesoInspeccionSalida_ProcesoId",
                table: "ProcesoInspeccionSalida",
                column: "ProcesoId");
        }
    }
}

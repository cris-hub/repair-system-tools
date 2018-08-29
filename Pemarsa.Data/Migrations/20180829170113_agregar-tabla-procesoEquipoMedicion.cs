using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class agregartablaprocesoEquipoMedicion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProcesoEquipoMedicion",
                columns: table => new
                {
                    ValorEquipoMedicion = table.Column<string>(nullable: true),
                    IdEquipoMedicion = table.Column<int>(nullable: false),
                    ProcesoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcesoEquipoMedicion", x => new { x.IdEquipoMedicion, x.ProcesoId });
                    table.ForeignKey(
                        name: "FK_ProcesoEquipoMedicion_Catalogo_IdEquipoMedicion",
                        column: x => x.IdEquipoMedicion,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcesoEquipoMedicion_Proceso_ProcesoId",
                        column: x => x.ProcesoId,
                        principalTable: "Proceso",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProcesoEquipoMedicion_ProcesoId",
                table: "ProcesoEquipoMedicion",
                column: "ProcesoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProcesoEquipoMedicion");
        }
    }
}

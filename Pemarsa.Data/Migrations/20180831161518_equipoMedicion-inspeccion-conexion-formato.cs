using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class equipoMedicioninspeccionconexionformato : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConexionEquipoMedicionUsado",
                columns: table => new
                {
                    InspeccionConexionFormatoId = table.Column<int>(nullable: false),
                    EquipoMedicionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConexionEquipoMedicionUsado", x => new { x.InspeccionConexionFormatoId, x.EquipoMedicionId });
                    table.ForeignKey(
                        name: "FK_ConexionEquipoMedicionUsado_Catalogo_EquipoMedicionId",
                        column: x => x.EquipoMedicionId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConexionEquipoMedicionUsado_InspeccionConexionFormato_Inspec~",
                        column: x => x.InspeccionConexionFormatoId,
                        principalTable: "InspeccionConexionFormato",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConexionEquipoMedicionUsado_EquipoMedicionId",
                table: "ConexionEquipoMedicionUsado",
                column: "EquipoMedicionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConexionEquipoMedicionUsado");
        }
    }
}

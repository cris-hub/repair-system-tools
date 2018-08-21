using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class tipoconexion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Formato_Catalogo_TiposConexionesId",
                table: "Formato");

            migrationBuilder.DropIndex(
                name: "IX_Formato_TiposConexionesId",
                table: "Formato");

            migrationBuilder.DropColumn(
                name: "TiposConexionesId",
                table: "Formato");

            migrationBuilder.CreateTable(
                name: "FormatoTiposConexion",
                columns: table => new
                {
                    FormatoId = table.Column<int>(nullable: false),
                    TipoConexionId = table.Column<int>(nullable: false),
                    Estado = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormatoTiposConexion", x => new { x.FormatoId, x.TipoConexionId });
                    table.ForeignKey(
                        name: "FK_FormatoTiposConexion_Formato_FormatoId",
                        column: x => x.FormatoId,
                        principalTable: "Formato",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormatoTiposConexion_Catalogo_TipoConexionId",
                        column: x => x.TipoConexionId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FormatoTiposConexion_TipoConexionId",
                table: "FormatoTiposConexion",
                column: "TipoConexionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormatoTiposConexion");

            migrationBuilder.AddColumn<int>(
                name: "TiposConexionesId",
                table: "Formato",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Formato_TiposConexionesId",
                table: "Formato",
                column: "TiposConexionesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Formato_Catalogo_TiposConexionesId",
                table: "Formato",
                column: "TiposConexionesId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

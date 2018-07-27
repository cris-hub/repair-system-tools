using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class aletas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FormatoFormatoParametro",
                columns: table => new
                {
                    FormatoId = table.Column<int>(nullable: false),
                    FormatoParametroId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormatoFormatoParametro", x => new { x.FormatoId, x.FormatoParametroId });
                    table.ForeignKey(
                        name: "FK_FormatoFormatoParametro_Formato_FormatoId",
                        column: x => x.FormatoId,
                        principalTable: "Formato",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormatoFormatoParametro_FormatoParametro_FormatoParametroId",
                        column: x => x.FormatoParametroId,
                        principalTable: "FormatoParametro",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FormatoFormatoParametro_FormatoParametroId",
                table: "FormatoFormatoParametro",
                column: "FormatoParametroId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormatoFormatoParametro");
        }
    }
}

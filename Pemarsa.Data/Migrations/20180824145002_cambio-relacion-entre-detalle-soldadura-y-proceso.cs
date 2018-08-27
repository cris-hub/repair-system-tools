using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class cambiorelacionentredetallesoldadurayproceso : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Proceso_ProcesoId",
                table: "DetalleSoldadura");

            migrationBuilder.DropIndex(
                name: "IX_DetalleSoldadura_ProcesoId",
                table: "DetalleSoldadura");

            migrationBuilder.DropColumn(
                name: "ProcesoId",
                table: "DetalleSoldadura");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProcesoId",
                table: "DetalleSoldadura",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DetalleSoldadura_ProcesoId",
                table: "DetalleSoldadura",
                column: "ProcesoId");

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleSoldadura_Proceso_ProcesoId",
                table: "DetalleSoldadura",
                column: "ProcesoId",
                principalTable: "Proceso",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

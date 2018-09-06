using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class actualizarremisiondetalle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RemisionDetalle",
                table: "RemisionDetalle");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RemisionDetalle",
                table: "RemisionDetalle",
                columns: new[] { "RemisionId", "OrdenTrabajoId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RemisionDetalle",
                table: "RemisionDetalle");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RemisionDetalle",
                table: "RemisionDetalle",
                column: "RemisionId");
        }
    }
}

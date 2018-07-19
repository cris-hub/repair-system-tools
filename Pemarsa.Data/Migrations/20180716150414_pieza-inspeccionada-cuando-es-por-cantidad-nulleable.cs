using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class piezainspeccionadacuandoesporcantidadnulleable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Pieza",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Pieza",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class estadoinspeccionfoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Estado",
                table: "InspeccionFotos",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<decimal>(
                name: "VelocidadBuggyDrive",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Amperaje",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Estado",
                table: "InspeccionFotos");

            migrationBuilder.AlterColumn<int>(
                name: "VelocidadBuggyDrive",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Amperaje",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(decimal),
                oldNullable: true);
        }
    }
}

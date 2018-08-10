using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class ordencompranulleable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "OrdenCompra",
                table: "OrdenTrabajo",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "OrdenCompra",
                table: "OrdenTrabajo",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}

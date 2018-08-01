using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class herramientasequitarequeridodecantidad : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Moc",
                table: "Herramienta",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<bool>(
                name: "EsHerramientaPorCantidad",
                table: "Herramienta",
                nullable: true,
                oldClrType: typeof(bool));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Moc",
                table: "Herramienta",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "EsHerramientaPorCantidad",
                table: "Herramienta",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);
        }
    }
}

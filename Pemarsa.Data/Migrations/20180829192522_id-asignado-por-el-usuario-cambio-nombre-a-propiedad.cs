using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class idasignadoporelusuariocambionombreapropiedad : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FlatBoardLongitud",
                table: "InspeccionConexionFormato",
                newName: "IdAsignaUsuario");

            migrationBuilder.RenameColumn(
                name: "FlatBoardId",
                table: "InspeccionConexionFormato",
                newName: "FloatBoardLongitud");

            migrationBuilder.AddColumn<int>(
                name: "FloatBoardId",
                table: "InspeccionConexionFormato",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FloatBoardId",
                table: "InspeccionConexionFormato");

            migrationBuilder.RenameColumn(
                name: "IdAsignaUsuario",
                table: "InspeccionConexionFormato",
                newName: "FlatBoardLongitud");

            migrationBuilder.RenameColumn(
                name: "FloatBoardLongitud",
                table: "InspeccionConexionFormato",
                newName: "FlatBoardId");
        }
    }
}

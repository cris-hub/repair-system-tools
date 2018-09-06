using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class nulleablesestaConforme : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_Catalogo_ConexionId",
                table: "InspeccionConexion");

            migrationBuilder.AlterColumn<bool>(
                name: "EstaConforme",
                table: "InspeccionConexionFormatoParametros",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<int>(
                name: "ConexionId",
                table: "InspeccionConexion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexion_Catalogo_ConexionId",
                table: "InspeccionConexion",
                column: "ConexionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_Catalogo_ConexionId",
                table: "InspeccionConexion");

            migrationBuilder.AlterColumn<bool>(
                name: "EstaConforme",
                table: "InspeccionConexionFormatoParametros",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ConexionId",
                table: "InspeccionConexion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexion_Catalogo_ConexionId",
                table: "InspeccionConexion",
                column: "ConexionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

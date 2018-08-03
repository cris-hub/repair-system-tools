using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class camposnulleables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_Catalogo_EstadoId",
                table: "InspeccionConexion");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_Catalogo_TipoConexionId",
                table: "InspeccionConexion");

            migrationBuilder.AlterColumn<int>(
                name: "TipoConexionId",
                table: "InspeccionConexion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "EstadoId",
                table: "InspeccionConexion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexion_Catalogo_EstadoId",
                table: "InspeccionConexion",
                column: "EstadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexion_Catalogo_TipoConexionId",
                table: "InspeccionConexion",
                column: "TipoConexionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_Catalogo_EstadoId",
                table: "InspeccionConexion");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_Catalogo_TipoConexionId",
                table: "InspeccionConexion");

            migrationBuilder.AlterColumn<int>(
                name: "TipoConexionId",
                table: "InspeccionConexion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EstadoId",
                table: "InspeccionConexion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexion_Catalogo_EstadoId",
                table: "InspeccionConexion",
                column: "EstadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexion_Catalogo_TipoConexionId",
                table: "InspeccionConexion",
                column: "TipoConexionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

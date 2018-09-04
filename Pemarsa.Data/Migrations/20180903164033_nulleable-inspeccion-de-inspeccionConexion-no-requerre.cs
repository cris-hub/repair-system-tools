using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class nulleableinspecciondeinspeccionConexionnorequerre : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_Inspeccion_InspeccionId",
                table: "InspeccionConexion");

            migrationBuilder.AlterColumn<int>(
                name: "InspeccionId",
                table: "InspeccionConexion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexion_Inspeccion_InspeccionId",
                table: "InspeccionConexion",
                column: "InspeccionId",
                principalTable: "Inspeccion",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_Inspeccion_InspeccionId",
                table: "InspeccionConexion");

            migrationBuilder.AlterColumn<int>(
                name: "InspeccionId",
                table: "InspeccionConexion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexion_Inspeccion_InspeccionId",
                table: "InspeccionConexion",
                column: "InspeccionId",
                principalTable: "Inspeccion",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

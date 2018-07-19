using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class inspeccionKEYS : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoInspeccionId",
                table: "Inspeccion");

            migrationBuilder.AlterColumn<int>(
                name: "TipoInspeccionId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Pieza",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Inspeccion_Pieza_TipoInspeccionId",
                table: "Inspeccion",
                columns: new[] { "Pieza", "TipoInspeccionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoInspeccionId",
                table: "Inspeccion",
                column: "TipoInspeccionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoInspeccionId",
                table: "Inspeccion");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Inspeccion_Pieza_TipoInspeccionId",
                table: "Inspeccion");

            migrationBuilder.AlterColumn<int>(
                name: "TipoInspeccionId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "Pieza",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoInspeccionId",
                table: "Inspeccion",
                column: "TipoInspeccionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

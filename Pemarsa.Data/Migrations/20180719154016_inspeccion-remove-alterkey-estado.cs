using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class inspeccionremovealterkeyestado : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_EstadoId",
                table: "Inspeccion");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Inspeccion_Pieza_TipoInspeccionId_EstadoId_Id",
                table: "Inspeccion");

            migrationBuilder.AlterColumn<int>(
                name: "EstadoId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Inspeccion_Pieza_TipoInspeccionId_Id",
                table: "Inspeccion",
                columns: new[] { "Pieza", "TipoInspeccionId", "Id" });

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_EstadoId",
                table: "Inspeccion",
                column: "EstadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_EstadoId",
                table: "Inspeccion");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Inspeccion_Pieza_TipoInspeccionId_Id",
                table: "Inspeccion");

            migrationBuilder.AlterColumn<int>(
                name: "EstadoId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Inspeccion_Pieza_TipoInspeccionId_EstadoId_Id",
                table: "Inspeccion",
                columns: new[] { "Pieza", "TipoInspeccionId", "EstadoId", "Id" });

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_EstadoId",
                table: "Inspeccion",
                column: "EstadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class cammposnulleables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoAnteriorId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoSiguienteId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoSiguienteSugeridoId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoSoldaduraId",
                table: "Proceso");

            migrationBuilder.AlterColumn<int>(
                name: "TipoSoldaduraId",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TipoProcesoSiguienteSugeridoId",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TipoProcesoSiguienteId",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TipoProcesoId",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TipoProcesoAnteriorId",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoAnteriorId",
                table: "Proceso",
                column: "TipoProcesoAnteriorId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoId",
                table: "Proceso",
                column: "TipoProcesoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoSiguienteId",
                table: "Proceso",
                column: "TipoProcesoSiguienteId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoSiguienteSugeridoId",
                table: "Proceso",
                column: "TipoProcesoSiguienteSugeridoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_TipoSoldaduraId",
                table: "Proceso",
                column: "TipoSoldaduraId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoAnteriorId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoSiguienteId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoSiguienteSugeridoId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_TipoSoldaduraId",
                table: "Proceso");

            migrationBuilder.AlterColumn<int>(
                name: "TipoSoldaduraId",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TipoProcesoSiguienteSugeridoId",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TipoProcesoSiguienteId",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TipoProcesoId",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TipoProcesoAnteriorId",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoAnteriorId",
                table: "Proceso",
                column: "TipoProcesoAnteriorId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoId",
                table: "Proceso",
                column: "TipoProcesoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoSiguienteId",
                table: "Proceso",
                column: "TipoProcesoSiguienteId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_TipoProcesoSiguienteSugeridoId",
                table: "Proceso",
                column: "TipoProcesoSiguienteSugeridoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_TipoSoldaduraId",
                table: "Proceso",
                column: "TipoSoldaduraId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

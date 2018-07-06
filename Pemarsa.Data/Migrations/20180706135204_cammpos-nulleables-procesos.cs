using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class cammposnulleablesprocesos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_InstructivoId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_MaquinaAsignadaId",
                table: "Proceso");

            migrationBuilder.AlterColumn<int>(
                name: "ProcesosRealizarId",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ProcesoSiguienteId",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ProcesoAnteriorId",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "MaquinaAsignadaId",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "InstructivoId",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_InstructivoId",
                table: "Proceso",
                column: "InstructivoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_MaquinaAsignadaId",
                table: "Proceso",
                column: "MaquinaAsignadaId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_InstructivoId",
                table: "Proceso");

            migrationBuilder.DropForeignKey(
                name: "FK_Proceso_Catalogo_MaquinaAsignadaId",
                table: "Proceso");

            migrationBuilder.AlterColumn<int>(
                name: "ProcesosRealizarId",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProcesoSiguienteId",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProcesoAnteriorId",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MaquinaAsignadaId",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "InstructivoId",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_InstructivoId",
                table: "Proceso",
                column: "InstructivoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Proceso_Catalogo_MaquinaAsignadaId",
                table: "Proceso",
                column: "MaquinaAsignadaId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

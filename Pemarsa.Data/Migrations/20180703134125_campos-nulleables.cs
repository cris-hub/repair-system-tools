using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class camposnulleables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_HerramientaMaterial_MaterialId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_DocumentoAdjunto_RemisionInicialId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_HerramientaTamano_TamanoHerramientaId",
                table: "OrdenTrabajo");

            migrationBuilder.AlterColumn<int>(
                name: "TamanoHerramientaId",
                table: "OrdenTrabajo",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "RemisionInicialId",
                table: "OrdenTrabajo",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "MaterialId",
                table: "OrdenTrabajo",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajo_HerramientaMaterial_MaterialId",
                table: "OrdenTrabajo",
                column: "MaterialId",
                principalTable: "HerramientaMaterial",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajo_DocumentoAdjunto_RemisionInicialId",
                table: "OrdenTrabajo",
                column: "RemisionInicialId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajo_HerramientaTamano_TamanoHerramientaId",
                table: "OrdenTrabajo",
                column: "TamanoHerramientaId",
                principalTable: "HerramientaTamano",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_HerramientaMaterial_MaterialId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_DocumentoAdjunto_RemisionInicialId",
                table: "OrdenTrabajo");

            migrationBuilder.DropForeignKey(
                name: "FK_OrdenTrabajo_HerramientaTamano_TamanoHerramientaId",
                table: "OrdenTrabajo");

            migrationBuilder.AlterColumn<int>(
                name: "TamanoHerramientaId",
                table: "OrdenTrabajo",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RemisionInicialId",
                table: "OrdenTrabajo",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MaterialId",
                table: "OrdenTrabajo",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajo_HerramientaMaterial_MaterialId",
                table: "OrdenTrabajo",
                column: "MaterialId",
                principalTable: "HerramientaMaterial",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajo_DocumentoAdjunto_RemisionInicialId",
                table: "OrdenTrabajo",
                column: "RemisionInicialId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrdenTrabajo_HerramientaTamano_TamanoHerramientaId",
                table: "OrdenTrabajo",
                column: "TamanoHerramientaId",
                principalTable: "HerramientaTamano",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

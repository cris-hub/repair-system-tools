using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class nulleablesinspeccionconexionformatoclienteherramienta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_Cliente_ClienteId",
                table: "InspeccionConexionFormato");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_DocumentoAdjunto_FormatoAdjuntoId",
                table: "InspeccionConexionFormato");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_Herramienta_HerramientaId",
                table: "InspeccionConexionFormato");

            migrationBuilder.AlterColumn<int>(
                name: "HerramientaId",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "FormatoAdjuntoId",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ClienteId",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_Cliente_ClienteId",
                table: "InspeccionConexionFormato",
                column: "ClienteId",
                principalTable: "Cliente",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_DocumentoAdjunto_FormatoAdjuntoId",
                table: "InspeccionConexionFormato",
                column: "FormatoAdjuntoId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_Herramienta_HerramientaId",
                table: "InspeccionConexionFormato",
                column: "HerramientaId",
                principalTable: "Herramienta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_Cliente_ClienteId",
                table: "InspeccionConexionFormato");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_DocumentoAdjunto_FormatoAdjuntoId",
                table: "InspeccionConexionFormato");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_Herramienta_HerramientaId",
                table: "InspeccionConexionFormato");

            migrationBuilder.AlterColumn<int>(
                name: "HerramientaId",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FormatoAdjuntoId",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClienteId",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_Cliente_ClienteId",
                table: "InspeccionConexionFormato",
                column: "ClienteId",
                principalTable: "Cliente",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_DocumentoAdjunto_FormatoAdjuntoId",
                table: "InspeccionConexionFormato",
                column: "FormatoAdjuntoId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_Herramienta_HerramientaId",
                table: "InspeccionConexionFormato",
                column: "HerramientaId",
                principalTable: "Herramienta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class actualizarmodelo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenFacturaId",
                table: "Remision");

            migrationBuilder.DropForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenRemisionId",
                table: "Remision");

            migrationBuilder.DropForeignKey(
                name: "FK_Remision_OrdenTrabajo_OrdenTrabajoId",
                table: "Remision");

            migrationBuilder.DropIndex(
                name: "IX_Remision_OrdenTrabajoId",
                table: "Remision");

            migrationBuilder.DropColumn(
                name: "OrdenTrabajoId",
                table: "Remision");

            migrationBuilder.AlterColumn<int>(
                name: "ValorFactura",
                table: "Remision",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "NumeroFactura",
                table: "Remision",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ImagenRemisionId",
                table: "Remision",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ImagenFacturaId",
                table: "Remision",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaAnulacion",
                table: "Remision",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsuarioAnula",
                table: "Remision",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "EsPruebaConGauge",
                table: "Proceso",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FormatoId",
                table: "InspeccionConexion",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RemisionDetalle",
                columns: table => new
                {
                    OrdenTrabajoId = table.Column<int>(nullable: true),
                    RemisionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RemisionDetalle", x => x.RemisionId);
                    table.ForeignKey(
                        name: "FK_RemisionDetalle_OrdenTrabajo_OrdenTrabajoId",
                        column: x => x.OrdenTrabajoId,
                        principalTable: "OrdenTrabajo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RemisionDetalle_Remision_RemisionId",
                        column: x => x.RemisionId,
                        principalTable: "Remision",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexion_FormatoId",
                table: "InspeccionConexion",
                column: "FormatoId");

            migrationBuilder.CreateIndex(
                name: "IX_RemisionDetalle_OrdenTrabajoId",
                table: "RemisionDetalle",
                column: "OrdenTrabajoId");

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexion_Formato_FormatoId",
                table: "InspeccionConexion",
                column: "FormatoId",
                principalTable: "Formato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenFacturaId",
                table: "Remision",
                column: "ImagenFacturaId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenRemisionId",
                table: "Remision",
                column: "ImagenRemisionId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_Formato_FormatoId",
                table: "InspeccionConexion");

            migrationBuilder.DropForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenFacturaId",
                table: "Remision");

            migrationBuilder.DropForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenRemisionId",
                table: "Remision");

            migrationBuilder.DropTable(
                name: "RemisionDetalle");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexion_FormatoId",
                table: "InspeccionConexion");

            migrationBuilder.DropColumn(
                name: "FechaAnulacion",
                table: "Remision");

            migrationBuilder.DropColumn(
                name: "UsuarioAnula",
                table: "Remision");

            migrationBuilder.DropColumn(
                name: "FormatoId",
                table: "InspeccionConexion");

            migrationBuilder.AlterColumn<int>(
                name: "ValorFactura",
                table: "Remision",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NumeroFactura",
                table: "Remision",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImagenRemisionId",
                table: "Remision",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImagenFacturaId",
                table: "Remision",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrdenTrabajoId",
                table: "Remision",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<bool>(
                name: "EsPruebaConGauge",
                table: "Proceso",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.CreateIndex(
                name: "IX_Remision_OrdenTrabajoId",
                table: "Remision",
                column: "OrdenTrabajoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenFacturaId",
                table: "Remision",
                column: "ImagenFacturaId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Remision_DocumentoAdjunto_ImagenRemisionId",
                table: "Remision",
                column: "ImagenRemisionId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Remision_OrdenTrabajo_OrdenTrabajoId",
                table: "Remision",
                column: "OrdenTrabajoId",
                principalTable: "OrdenTrabajo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

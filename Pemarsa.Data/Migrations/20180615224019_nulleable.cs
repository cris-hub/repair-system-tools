using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Pemarsa.Data.Migrations
{
    public partial class nulleable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DocumentoAdjunto_Formato_FormatoId",
                table: "DocumentoAdjunto");

            migrationBuilder.DropForeignKey(
                name: "FK_Formato_Herramienta_HerramientaId",
                table: "Formato");

            migrationBuilder.AlterColumn<int>(
                name: "HerramientaId",
                table: "Formato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "TPF",
                table: "Formato",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FormatoId",
                table: "DocumentoAdjunto",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_DocumentoAdjunto_Formato_FormatoId",
                table: "DocumentoAdjunto",
                column: "FormatoId",
                principalTable: "Formato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Formato_Herramienta_HerramientaId",
                table: "Formato",
                column: "HerramientaId",
                principalTable: "Herramienta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DocumentoAdjunto_Formato_FormatoId",
                table: "DocumentoAdjunto");

            migrationBuilder.DropForeignKey(
                name: "FK_Formato_Herramienta_HerramientaId",
                table: "Formato");

            migrationBuilder.DropColumn(
                name: "TPF",
                table: "Formato");

            migrationBuilder.AlterColumn<int>(
                name: "HerramientaId",
                table: "Formato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FormatoId",
                table: "DocumentoAdjunto",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DocumentoAdjunto_Formato_FormatoId",
                table: "DocumentoAdjunto",
                column: "FormatoId",
                principalTable: "Formato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Formato_Herramienta_HerramientaId",
                table: "Formato",
                column: "HerramientaId",
                principalTable: "Herramienta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

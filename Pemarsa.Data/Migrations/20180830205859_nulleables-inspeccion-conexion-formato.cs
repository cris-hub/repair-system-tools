using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class nulleablesinspeccionconexionformato : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_Catalogo_EquipoUsadoId",
                table: "InspeccionConexionFormato");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_Catalogo_FloatValveId",
                table: "InspeccionConexionFormato");

            migrationBuilder.AlterColumn<int>(
                name: "Od",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "OIT",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "IdAsignaUsuario",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<Guid>(
                name: "GuidUsuarioElabora",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<int>(
                name: "FloatValveId",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "FloatBoardLongitud",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "FloatBoardId",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<bool>(
                name: "EstaConforme",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<bool>(
                name: "EsStandBlasting",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<bool>(
                name: "EsEstampado",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<bool>(
                name: "EsCw",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<bool>(
                name: "EsBoreBack",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<int>(
                name: "EquipoUsadoId",
                table: "InspeccionConexionFormato",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_Catalogo_EquipoUsadoId",
                table: "InspeccionConexionFormato",
                column: "EquipoUsadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_Catalogo_FloatValveId",
                table: "InspeccionConexionFormato",
                column: "FloatValveId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_Catalogo_EquipoUsadoId",
                table: "InspeccionConexionFormato");

            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexionFormato_Catalogo_FloatValveId",
                table: "InspeccionConexionFormato");

            migrationBuilder.AlterColumn<int>(
                name: "Od",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "OIT",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "IdAsignaUsuario",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "GuidUsuarioElabora",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FloatValveId",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FloatBoardLongitud",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FloatBoardId",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "EstaConforme",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "EsStandBlasting",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "EsEstampado",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "EsCw",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "EsBoreBack",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EquipoUsadoId",
                table: "InspeccionConexionFormato",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_Catalogo_EquipoUsadoId",
                table: "InspeccionConexionFormato",
                column: "EquipoUsadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexionFormato_Catalogo_FloatValveId",
                table: "InspeccionConexionFormato",
                column: "FloatValveId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

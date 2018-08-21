using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class camposusuariosinteractuanconprocesos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "GuidPersonaAsignaOperario",
                table: "Proceso",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "GuidPersonaCompleta",
                table: "Proceso",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "GuidPersonaLibera",
                table: "Proceso",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "NombrePersonaAsignaOperario",
                table: "Proceso",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NombrePersonaCompleta",
                table: "Proceso",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NombrePersonaLibera",
                table: "Proceso",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GuidPersonaAsignaOperario",
                table: "Proceso");

            migrationBuilder.DropColumn(
                name: "GuidPersonaCompleta",
                table: "Proceso");

            migrationBuilder.DropColumn(
                name: "GuidPersonaLibera",
                table: "Proceso");

            migrationBuilder.DropColumn(
                name: "NombrePersonaAsignaOperario",
                table: "Proceso");

            migrationBuilder.DropColumn(
                name: "NombrePersonaCompleta",
                table: "Proceso");

            migrationBuilder.DropColumn(
                name: "NombrePersonaLibera",
                table: "Proceso");
        }
    }
}

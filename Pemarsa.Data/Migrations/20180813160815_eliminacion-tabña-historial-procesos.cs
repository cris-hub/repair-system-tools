using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class eliminaciontabñahistorialprocesos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrdenTrabajoHistorialProceso");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrdenTrabajoHistorialProceso",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EstadoProceso = table.Column<int>(nullable: false),
                    FechaProceso = table.Column<DateTime>(nullable: false),
                    LiberaProcesoAnteriorId = table.Column<int>(nullable: false),
                    Observaciones = table.Column<string>(nullable: true),
                    OperarioId = table.Column<int>(nullable: false),
                    OrdenTrabajoId = table.Column<int>(nullable: true),
                    TipoProcesoAnteriorId = table.Column<int>(nullable: false),
                    TipoProcesoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdenTrabajoHistorialProceso", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdenTrabajoHistorialProceso_OrdenTrabajo_OrdenTrabajoId",
                        column: x => x.OrdenTrabajoId,
                        principalTable: "OrdenTrabajo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrdenTrabajoHistorialProceso_OrdenTrabajoId",
                table: "OrdenTrabajoHistorialProceso",
                column: "OrdenTrabajoId");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class campoobservacionrechazo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TrabajoRealizadoId",
                table: "Proceso",
                newName: "TrabajoRealizado");

            migrationBuilder.AddColumn<string>(
                name: "ObservacionRechazo",
                table: "Proceso",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ObservacionRechazo",
                table: "Proceso");

            migrationBuilder.RenameColumn(
                name: "TrabajoRealizado",
                table: "Proceso",
                newName: "TrabajoRealizadoId");
        }
    }
}

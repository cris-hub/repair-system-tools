using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class remisonsolicitud : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RemisionId",
                table: "SolicitudOrdenTrabajo",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajo_RemisionId",
                table: "SolicitudOrdenTrabajo",
                column: "RemisionId");

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitudOrdenTrabajo_DocumentoAdjunto_RemisionId",
                table: "SolicitudOrdenTrabajo",
                column: "RemisionId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajo_DocumentoAdjunto_RemisionId",
                table: "SolicitudOrdenTrabajo");

            migrationBuilder.DropIndex(
                name: "IX_SolicitudOrdenTrabajo_RemisionId",
                table: "SolicitudOrdenTrabajo");

            migrationBuilder.DropColumn(
                name: "RemisionId",
                table: "SolicitudOrdenTrabajo");
        }
    }
}

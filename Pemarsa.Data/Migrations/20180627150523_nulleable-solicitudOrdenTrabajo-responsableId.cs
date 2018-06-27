using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class nulleablesolicitudOrdenTrabajoresponsableId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajo_Catalogo_ResponsableId",
                table: "SolicitudOrdenTrabajo");

            migrationBuilder.AlterColumn<int>(
                name: "ResponsableId",
                table: "SolicitudOrdenTrabajo",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitudOrdenTrabajo_Catalogo_ResponsableId",
                table: "SolicitudOrdenTrabajo",
                column: "ResponsableId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajo_Catalogo_ResponsableId",
                table: "SolicitudOrdenTrabajo");

            migrationBuilder.AlterColumn<int>(
                name: "ResponsableId",
                table: "SolicitudOrdenTrabajo",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitudOrdenTrabajo_Catalogo_ResponsableId",
                table: "SolicitudOrdenTrabajo",
                column: "ResponsableId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class cambionombrecolumnaturbopatrontubopatron : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_TurboPatronId",
                table: "Inspeccion");

            migrationBuilder.RenameColumn(
                name: "TurboPatronId",
                table: "Inspeccion",
                newName: "TuboPatronId");

            migrationBuilder.RenameIndex(
                name: "IX_Inspeccion_TurboPatronId",
                table: "Inspeccion",
                newName: "IX_Inspeccion_TuboPatronId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_TuboPatronId",
                table: "Inspeccion",
                column: "TuboPatronId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_TuboPatronId",
                table: "Inspeccion");

            migrationBuilder.RenameColumn(
                name: "TuboPatronId",
                table: "Inspeccion",
                newName: "TurboPatronId");

            migrationBuilder.RenameIndex(
                name: "IX_Inspeccion_TuboPatronId",
                table: "Inspeccion",
                newName: "IX_Inspeccion_TurboPatronId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_TurboPatronId",
                table: "Inspeccion",
                column: "TurboPatronId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

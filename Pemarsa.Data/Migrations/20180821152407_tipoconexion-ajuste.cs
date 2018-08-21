using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class tipoconexionajuste : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormatoTiposConexion_Formato_FormatoId",
                table: "FormatoTiposConexion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FormatoTiposConexion",
                table: "FormatoTiposConexion");

            migrationBuilder.AlterColumn<int>(
                name: "FormatoId",
                table: "FormatoTiposConexion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "FormatoTiposConexion",
                nullable: false,
                defaultValue: 0)
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FormatoTiposConexion",
                table: "FormatoTiposConexion",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_FormatoTiposConexion_FormatoId",
                table: "FormatoTiposConexion",
                column: "FormatoId");

            migrationBuilder.AddForeignKey(
                name: "FK_FormatoTiposConexion_Formato_FormatoId",
                table: "FormatoTiposConexion",
                column: "FormatoId",
                principalTable: "Formato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormatoTiposConexion_Formato_FormatoId",
                table: "FormatoTiposConexion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FormatoTiposConexion",
                table: "FormatoTiposConexion");

            migrationBuilder.DropIndex(
                name: "IX_FormatoTiposConexion_FormatoId",
                table: "FormatoTiposConexion");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "FormatoTiposConexion");

            migrationBuilder.AlterColumn<int>(
                name: "FormatoId",
                table: "FormatoTiposConexion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FormatoTiposConexion",
                table: "FormatoTiposConexion",
                columns: new[] { "FormatoId", "TipoConexionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_FormatoTiposConexion_Formato_FormatoId",
                table: "FormatoTiposConexion",
                column: "FormatoId",
                principalTable: "Formato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

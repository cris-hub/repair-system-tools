using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class valoresnull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_ModoAplicacionId",
                table: "DetalleSoldadura");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TamañoCortadoresId",
                table: "DetalleSoldadura");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TipoFuenteId",
                table: "DetalleSoldadura");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TipoSoldaduraId",
                table: "DetalleSoldadura");

            migrationBuilder.AlterColumn<int>(
                name: "Voltaje",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TipoSoldaduraId",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TipoFuenteId",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TiempoPrecalentamiento",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TiempoAplicacion",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TemperaturaPrecalentamiento",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TemperaturaDuranteProceso",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TemperaturaDespuesProceso",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TamañoCortadoresId",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "PresionOxigeno",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "PresionGas2",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "PresionGas1",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "PresionAcetileno",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ModoAplicacionId",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "Lote",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "CantidadSoldadura",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "Amperaje",
                table: "DetalleSoldadura",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_ModoAplicacionId",
                table: "DetalleSoldadura",
                column: "ModoAplicacionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TamañoCortadoresId",
                table: "DetalleSoldadura",
                column: "TamañoCortadoresId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TipoFuenteId",
                table: "DetalleSoldadura",
                column: "TipoFuenteId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TipoSoldaduraId",
                table: "DetalleSoldadura",
                column: "TipoSoldaduraId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_ModoAplicacionId",
                table: "DetalleSoldadura");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TamañoCortadoresId",
                table: "DetalleSoldadura");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TipoFuenteId",
                table: "DetalleSoldadura");

            migrationBuilder.DropForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TipoSoldaduraId",
                table: "DetalleSoldadura");

            migrationBuilder.AlterColumn<int>(
                name: "Voltaje",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TipoSoldaduraId",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TipoFuenteId",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TiempoPrecalentamiento",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TiempoAplicacion",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TemperaturaPrecalentamiento",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TemperaturaDuranteProceso",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TemperaturaDespuesProceso",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TamañoCortadoresId",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PresionOxigeno",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PresionGas2",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PresionGas1",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PresionAcetileno",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ModoAplicacionId",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Lote",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CantidadSoldadura",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Amperaje",
                table: "DetalleSoldadura",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_ModoAplicacionId",
                table: "DetalleSoldadura",
                column: "ModoAplicacionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TamañoCortadoresId",
                table: "DetalleSoldadura",
                column: "TamañoCortadoresId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TipoFuenteId",
                table: "DetalleSoldadura",
                column: "TipoFuenteId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetalleSoldadura_Catalogo_TipoSoldaduraId",
                table: "DetalleSoldadura",
                column: "TipoSoldaduraId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

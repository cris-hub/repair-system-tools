using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class inspeccionnulleables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_BloqueEscalonadoUsadoId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_BobinaMagneticaId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_EquipoEmiId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_EquipoUtilizadoId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_EstadoId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenMedicionEspesoresId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenMflId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenPantallaUltrasonidoId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDespuesId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDuranteId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoPreviaId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoDeLiquidosId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoInspeccionId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_TurboPatronId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitudOrdenTrabajoAnexos_OrdenTrabajo_OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos");

            migrationBuilder.DropIndex(
                name: "IX_SolicitudOrdenTrabajoAnexos_OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos");

            migrationBuilder.DropColumn(
                name: "OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos");

            migrationBuilder.AlterColumn<int>(
                name: "TurboPatronId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TipoInspeccionId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "TipoDeLiquidosId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ImagenUltrasonidoPreviaId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ImagenUltrasonidoDuranteId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ImagenUltrasonidoDespuesId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ImagenPantallaUltrasonidoId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ImagenMflId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ImagenMedicionEspesoresId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "EstadoId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "EquipoUtilizadoId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "EquipoEmiId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "BobinaMagneticaId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "BloqueEscalonadoUsadoId",
                table: "Inspeccion",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_BloqueEscalonadoUsadoId",
                table: "Inspeccion",
                column: "BloqueEscalonadoUsadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_BobinaMagneticaId",
                table: "Inspeccion",
                column: "BobinaMagneticaId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_EquipoEmiId",
                table: "Inspeccion",
                column: "EquipoEmiId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_EquipoUtilizadoId",
                table: "Inspeccion",
                column: "EquipoUtilizadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_EstadoId",
                table: "Inspeccion",
                column: "EstadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenMedicionEspesoresId",
                table: "Inspeccion",
                column: "ImagenMedicionEspesoresId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenMflId",
                table: "Inspeccion",
                column: "ImagenMflId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenPantallaUltrasonidoId",
                table: "Inspeccion",
                column: "ImagenPantallaUltrasonidoId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDespuesId",
                table: "Inspeccion",
                column: "ImagenUltrasonidoDespuesId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDuranteId",
                table: "Inspeccion",
                column: "ImagenUltrasonidoDuranteId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoPreviaId",
                table: "Inspeccion",
                column: "ImagenUltrasonidoPreviaId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoDeLiquidosId",
                table: "Inspeccion",
                column: "TipoDeLiquidosId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoInspeccionId",
                table: "Inspeccion",
                column: "TipoInspeccionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_TurboPatronId",
                table: "Inspeccion",
                column: "TurboPatronId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_BloqueEscalonadoUsadoId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_BobinaMagneticaId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_EquipoEmiId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_EquipoUtilizadoId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_EstadoId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenMedicionEspesoresId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenMflId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenPantallaUltrasonidoId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDespuesId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDuranteId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoPreviaId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoDeLiquidosId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoInspeccionId",
                table: "Inspeccion");

            migrationBuilder.DropForeignKey(
                name: "FK_Inspeccion_Catalogo_TurboPatronId",
                table: "Inspeccion");

            migrationBuilder.AddColumn<int>(
                name: "OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TurboPatronId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TipoInspeccionId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TipoDeLiquidosId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImagenUltrasonidoPreviaId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImagenUltrasonidoDuranteId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImagenUltrasonidoDespuesId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImagenPantallaUltrasonidoId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImagenMflId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImagenMedicionEspesoresId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EstadoId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EquipoUtilizadoId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EquipoEmiId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BobinaMagneticaId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BloqueEscalonadoUsadoId",
                table: "Inspeccion",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SolicitudOrdenTrabajoAnexos_OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos",
                column: "OrdenTrabajoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_BloqueEscalonadoUsadoId",
                table: "Inspeccion",
                column: "BloqueEscalonadoUsadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_BobinaMagneticaId",
                table: "Inspeccion",
                column: "BobinaMagneticaId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_EquipoEmiId",
                table: "Inspeccion",
                column: "EquipoEmiId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_EquipoUtilizadoId",
                table: "Inspeccion",
                column: "EquipoUtilizadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_EstadoId",
                table: "Inspeccion",
                column: "EstadoId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenMedicionEspesoresId",
                table: "Inspeccion",
                column: "ImagenMedicionEspesoresId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenMflId",
                table: "Inspeccion",
                column: "ImagenMflId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenPantallaUltrasonidoId",
                table: "Inspeccion",
                column: "ImagenPantallaUltrasonidoId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDespuesId",
                table: "Inspeccion",
                column: "ImagenUltrasonidoDespuesId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoDuranteId",
                table: "Inspeccion",
                column: "ImagenUltrasonidoDuranteId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_DocumentoAdjunto_ImagenUltrasonidoPreviaId",
                table: "Inspeccion",
                column: "ImagenUltrasonidoPreviaId",
                principalTable: "DocumentoAdjunto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoDeLiquidosId",
                table: "Inspeccion",
                column: "TipoDeLiquidosId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_TipoInspeccionId",
                table: "Inspeccion",
                column: "TipoInspeccionId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inspeccion_Catalogo_TurboPatronId",
                table: "Inspeccion",
                column: "TurboPatronId",
                principalTable: "Catalogo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitudOrdenTrabajoAnexos_OrdenTrabajo_OrdenTrabajoId",
                table: "SolicitudOrdenTrabajoAnexos",
                column: "OrdenTrabajoId",
                principalTable: "OrdenTrabajo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

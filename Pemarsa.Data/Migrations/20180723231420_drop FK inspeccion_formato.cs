using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class dropFKinspeccion_formato : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_InspeccionConexionFormato_FormatoId",
                table: "InspeccionConexion");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormato");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormatoAdendum");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexion_FormatoId",
                table: "InspeccionConexion");

            migrationBuilder.DropColumn(
                name: "FormatoId",
                table: "InspeccionConexion");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FormatoId",
                table: "InspeccionConexion",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "InspeccionConexionFormatoAdendum",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionConexionFormatoAdendum", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InspeccionConexionFormatoParametros",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EstaConforme = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionConexionFormatoParametros", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InspeccionConexionFormato",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ClienteId = table.Column<int>(nullable: false),
                    EquipoUsadoId = table.Column<int>(nullable: false),
                    EsBoreBack = table.Column<bool>(nullable: false),
                    EsCw = table.Column<bool>(nullable: false),
                    EsEstampado = table.Column<bool>(nullable: false),
                    EsStandBlasting = table.Column<bool>(nullable: false),
                    EstaConforme = table.Column<bool>(nullable: false),
                    FlatBoardId = table.Column<int>(nullable: false),
                    FlatBoardLongitud = table.Column<int>(nullable: false),
                    FloatValveId = table.Column<int>(nullable: false),
                    FormatoAdjuntoId = table.Column<int>(nullable: false),
                    GuidUsuarioElabora = table.Column<Guid>(nullable: false),
                    HerramientaId = table.Column<int>(nullable: false),
                    InspeccionConexionFormatoAdendumId = table.Column<int>(nullable: false),
                    InspeccionConexionFormatoParametrosId = table.Column<int>(nullable: false),
                    NombreUsuarioElabora = table.Column<string>(nullable: true),
                    OIT = table.Column<int>(nullable: false),
                    Od = table.Column<int>(nullable: false),
                    Serial = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspeccionConexionFormato", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_Cliente_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Cliente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_Catalogo_EquipoUsadoId",
                        column: x => x.EquipoUsadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_Catalogo_FloatValveId",
                        column: x => x.FloatValveId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_DocumentoAdjunto_FormatoAdjuntoId",
                        column: x => x.FormatoAdjuntoId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_Herramienta_HerramientaId",
                        column: x => x.HerramientaId,
                        principalTable: "Herramienta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_InspeccionConexionFormatoAdendum_I~",
                        column: x => x.InspeccionConexionFormatoAdendumId,
                        principalTable: "InspeccionConexionFormatoAdendum",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InspeccionConexionFormato_InspeccionConexionFormatoParametro~",
                        column: x => x.InspeccionConexionFormatoParametrosId,
                        principalTable: "InspeccionConexionFormatoParametros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexion_FormatoId",
                table: "InspeccionConexion",
                column: "FormatoId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_ClienteId",
                table: "InspeccionConexionFormato",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_EquipoUsadoId",
                table: "InspeccionConexionFormato",
                column: "EquipoUsadoId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_FloatValveId",
                table: "InspeccionConexionFormato",
                column: "FloatValveId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_FormatoAdjuntoId",
                table: "InspeccionConexionFormato",
                column: "FormatoAdjuntoId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_HerramientaId",
                table: "InspeccionConexionFormato",
                column: "HerramientaId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_InspeccionConexionFormatoAdendumId",
                table: "InspeccionConexionFormato",
                column: "InspeccionConexionFormatoAdendumId");

            migrationBuilder.CreateIndex(
                name: "IX_InspeccionConexionFormato_InspeccionConexionFormatoParametro~",
                table: "InspeccionConexionFormato",
                column: "InspeccionConexionFormatoParametrosId");

            migrationBuilder.AddForeignKey(
                name: "FK_InspeccionConexion_InspeccionConexionFormato_FormatoId",
                table: "InspeccionConexion",
                column: "FormatoId",
                principalTable: "InspeccionConexionFormato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

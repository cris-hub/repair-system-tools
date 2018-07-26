using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pemarsa.Data.Migrations
{
    public partial class nspeccionConexionFormatoParametros : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InspeccionConexionFormatoId",
                table: "InspeccionConexion",
                nullable: true);

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
                    EsBoreBack = table.Column<bool>(nullable: false),
                    EsCw = table.Column<bool>(nullable: false),
                    EsEstampado = table.Column<bool>(nullable: false),
                    EsStandBlasting = table.Column<bool>(nullable: false),
                    EstaConforme = table.Column<bool>(nullable: false),
                    FlatBoardId = table.Column<int>(nullable: false),
                    FlatBoardLongitud = table.Column<int>(nullable: false),
                    GuidUsuarioElabora = table.Column<Guid>(nullable: false),
                    Od = table.Column<int>(nullable: false),
                    OIT = table.Column<int>(nullable: false),
                    NombreUsuarioElabora = table.Column<string>(nullable: true),
                    Serial = table.Column<string>(nullable: true),
                    FloatValveId = table.Column<int>(nullable: false),
                    EquipoUsadoId = table.Column<int>(nullable: false),
                    InspeccionConexionFormatoAdendumId = table.Column<int>(nullable: false),
                    InspeccionConexionFormatoParametrosId = table.Column<int>(nullable: false),
                    ClienteId = table.Column<int>(nullable: false),
                    FormatoAdjuntoId = table.Column<int>(nullable: false),
                    HerramientaId = table.Column<int>(nullable: false)
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
                name: "IX_InspeccionConexion_InspeccionConexionFormatoId",
                table: "InspeccionConexion",
                column: "InspeccionConexionFormatoId");

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
                name: "FK_InspeccionConexion_InspeccionConexionFormato_InspeccionConex~",
                table: "InspeccionConexion",
                column: "InspeccionConexionFormatoId",
                principalTable: "InspeccionConexionFormato",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InspeccionConexion_InspeccionConexionFormato_InspeccionConex~",
                table: "InspeccionConexion");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormato");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormatoAdendum");

            migrationBuilder.DropTable(
                name: "InspeccionConexionFormatoParametros");

            migrationBuilder.DropIndex(
                name: "IX_InspeccionConexion_InspeccionConexionFormatoId",
                table: "InspeccionConexion");

            migrationBuilder.DropColumn(
                name: "InspeccionConexionFormatoId",
                table: "InspeccionConexion");
        }
    }
}

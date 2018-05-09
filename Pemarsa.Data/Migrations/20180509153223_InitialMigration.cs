﻿using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Pemarsa.Data.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Catalogo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CatalogoId = table.Column<int>(nullable: true),
                    Dia = table.Column<int>(nullable: true),
                    Estado = table.Column<bool>(nullable: true),
                    Grupo = table.Column<string>(nullable: false),
                    Guid = table.Column<Guid>(nullable: false),
                    Simbolo = table.Column<string>(nullable: true),
                    Valor = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Catalogo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Catalogo_Catalogo_CatalogoId",
                        column: x => x.CatalogoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Consulta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CampoPadre = table.Column<string>(nullable: true),
                    Campos = table.Column<string>(nullable: false),
                    CamposBusqueda = table.Column<string>(nullable: true),
                    Condicion = table.Column<string>(nullable: true),
                    Guid = table.Column<Guid>(nullable: false),
                    Tabla = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consulta", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DocumentoAdjunto",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Descripcion = table.Column<string>(maxLength: 250, nullable: true),
                    Extension = table.Column<string>(nullable: false),
                    FechaModifica = table.Column<DateTime>(nullable: true),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    Guid = table.Column<Guid>(nullable: false),
                    GuidOrganizacion = table.Column<Guid>(nullable: false),
                    GuidUsuarioCrea = table.Column<Guid>(nullable: false),
                    GuidUsuarioModifica = table.Column<Guid>(nullable: true),
                    Nombre = table.Column<string>(maxLength: 45, nullable: false),
                    NombreArchivo = table.Column<string>(maxLength: 50, nullable: false),
                    NombreUsuarioCrea = table.Column<string>(maxLength: 60, nullable: false),
                    NombreUsuarioModifica = table.Column<string>(maxLength: 60, nullable: true),
                    Ruta = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentoAdjunto", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Parametro",
                columns: table => new
                {
                    Entidad = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parametro", x => x.Entidad);
                });

            migrationBuilder.CreateTable(
                name: "Cliente",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ContactoCorreo = table.Column<string>(nullable: false),
                    ContactoNombre = table.Column<string>(nullable: false),
                    ContactoTelefono = table.Column<string>(nullable: false),
                    Direccion = table.Column<string>(nullable: false),
                    DocumentoAdjuntoId = table.Column<int>(nullable: true),
                    EstadoId = table.Column<int>(nullable: false),
                    FechaModifica = table.Column<DateTime>(nullable: true),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    Guid = table.Column<Guid>(nullable: false),
                    GuidOrganizacion = table.Column<Guid>(nullable: false),
                    GuidResponsable = table.Column<Guid>(nullable: false),
                    GuidUsuarioCrea = table.Column<Guid>(nullable: false),
                    GuidUsuarioModifica = table.Column<Guid>(nullable: true),
                    NickName = table.Column<string>(nullable: false),
                    Nit = table.Column<string>(nullable: false),
                    NombreResponsable = table.Column<string>(nullable: false),
                    NombreUsuarioCrea = table.Column<string>(maxLength: 60, nullable: false),
                    NombreUsuarioModifica = table.Column<string>(maxLength: 60, nullable: true),
                    RazonSocial = table.Column<string>(nullable: false),
                    Telefono = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cliente", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cliente_DocumentoAdjunto_DocumentoAdjuntoId",
                        column: x => x.DocumentoAdjuntoId,
                        principalTable: "DocumentoAdjunto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Cliente_Catalogo_EstadoId",
                        column: x => x.EstadoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ParametroCatalogo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CatalogoId = table.Column<int>(nullable: false),
                    Entidad = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParametroCatalogo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParametroCatalogo_Catalogo_CatalogoId",
                        column: x => x.CatalogoId,
                        principalTable: "Catalogo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ParametroCatalogo_Parametro_Entidad",
                        column: x => x.Entidad,
                        principalTable: "Parametro",
                        principalColumn: "Entidad",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ParametroConsulta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ConsultaId = table.Column<int>(nullable: false),
                    Entidad = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParametroConsulta", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParametroConsulta_Consulta_ConsultaId",
                        column: x => x.ConsultaId,
                        principalTable: "Consulta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ParametroConsulta_Parametro_Entidad",
                        column: x => x.Entidad,
                        principalTable: "Parametro",
                        principalColumn: "Entidad",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ClienteLinea",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ClienteId = table.Column<int>(nullable: false),
                    ContactoCorreo = table.Column<string>(nullable: false),
                    ContactoNombre = table.Column<string>(nullable: false),
                    ContactoTelefono = table.Column<string>(nullable: false),
                    Direccion = table.Column<string>(nullable: false),
                    FechaModifica = table.Column<DateTime>(nullable: true),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    Guid = table.Column<Guid>(nullable: false),
                    GuidOrganizacion = table.Column<Guid>(nullable: false),
                    GuidUsuarioCrea = table.Column<Guid>(nullable: false),
                    GuidUsuarioModifica = table.Column<Guid>(nullable: true),
                    Nombre = table.Column<string>(nullable: false),
                    NombreUsuarioCrea = table.Column<string>(maxLength: 60, nullable: false),
                    NombreUsuarioModifica = table.Column<string>(maxLength: 60, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClienteLinea", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClienteLinea_Cliente_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Cliente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Catalogo_CatalogoId",
                table: "Catalogo",
                column: "CatalogoId");

            migrationBuilder.CreateIndex(
                name: "IX_Cliente_DocumentoAdjuntoId",
                table: "Cliente",
                column: "DocumentoAdjuntoId");

            migrationBuilder.CreateIndex(
                name: "IX_Cliente_EstadoId",
                table: "Cliente",
                column: "EstadoId");

            migrationBuilder.CreateIndex(
                name: "IX_ClienteLinea_ClienteId",
                table: "ClienteLinea",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_ParametroCatalogo_CatalogoId",
                table: "ParametroCatalogo",
                column: "CatalogoId");

            migrationBuilder.CreateIndex(
                name: "IX_ParametroCatalogo_Entidad",
                table: "ParametroCatalogo",
                column: "Entidad");

            migrationBuilder.CreateIndex(
                name: "IX_ParametroConsulta_ConsultaId",
                table: "ParametroConsulta",
                column: "ConsultaId");

            migrationBuilder.CreateIndex(
                name: "IX_ParametroConsulta_Entidad",
                table: "ParametroConsulta",
                column: "Entidad");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClienteLinea");

            migrationBuilder.DropTable(
                name: "ParametroCatalogo");

            migrationBuilder.DropTable(
                name: "ParametroConsulta");

            migrationBuilder.DropTable(
                name: "Cliente");

            migrationBuilder.DropTable(
                name: "Consulta");

            migrationBuilder.DropTable(
                name: "Parametro");

            migrationBuilder.DropTable(
                name: "DocumentoAdjunto");

            migrationBuilder.DropTable(
                name: "Catalogo");
        }
    }
}
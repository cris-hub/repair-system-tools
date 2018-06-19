﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Pemarsa.Data;
using System;

namespace Pemarsa.Data.Migrations
{
    [DbContext(typeof(PemarsaContext))]
    partial class PemarsaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011");

            modelBuilder.Entity("Pemarsa.Domain.Catalogo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CatalogoId");

                    b.Property<int?>("Dia");

                    b.Property<bool?>("Estado");

                    b.Property<string>("Grupo")
                        .IsRequired();

                    b.Property<Guid>("Guid");

                    b.Property<string>("Simbolo");

                    b.Property<string>("Valor")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CatalogoId");

                    b.ToTable("Catalogo");
                });

            modelBuilder.Entity("Pemarsa.Domain.Cliente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ContactoCorreo")
                        .IsRequired();

                    b.Property<string>("ContactoNombre")
                        .IsRequired();

                    b.Property<string>("ContactoTelefono")
                        .IsRequired();

                    b.Property<string>("Direccion")
                        .IsRequired();

                    b.Property<int?>("DocumentoAdjuntoId");

                    b.Property<int>("EstadoId");

                    b.Property<DateTime?>("FechaModifica");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<Guid>("Guid");

                    b.Property<Guid>("GuidOrganizacion");

                    b.Property<Guid>("GuidResponsable");

                    b.Property<Guid>("GuidUsuarioCrea");

                    b.Property<Guid?>("GuidUsuarioModifica");

                    b.Property<string>("NickName")
                        .IsRequired();

                    b.Property<string>("Nit")
                        .IsRequired();

                    b.Property<string>("NombreResponsable")
                        .IsRequired();

                    b.Property<string>("NombreUsuarioCrea")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioModifica")
                        .HasMaxLength(60);

                    b.Property<string>("RazonSocial")
                        .IsRequired();

                    b.Property<string>("Telefono")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("DocumentoAdjuntoId");

                    b.HasIndex("EstadoId");

                    b.ToTable("Cliente");
                });

            modelBuilder.Entity("Pemarsa.Domain.ClienteLinea", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClienteId");

                    b.Property<string>("ContactoCorreo")
                        .IsRequired();

                    b.Property<string>("ContactoNombre")
                        .IsRequired();

                    b.Property<string>("ContactoTelefono")
                        .IsRequired();

                    b.Property<string>("Direccion")
                        .IsRequired();

                    b.Property<DateTime?>("FechaModifica");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<Guid>("Guid");

                    b.Property<Guid>("GuidOrganizacion");

                    b.Property<Guid>("GuidUsuarioCrea");

                    b.Property<Guid?>("GuidUsuarioModifica");

                    b.Property<string>("Nombre")
                        .IsRequired();

                    b.Property<string>("NombreUsuarioCrea")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioModifica")
                        .HasMaxLength(60);

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.ToTable("ClienteLinea");
                });

            modelBuilder.Entity("Pemarsa.Domain.Consulta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CampoPadre");

                    b.Property<string>("Campos")
                        .IsRequired();

                    b.Property<string>("CamposBusqueda");

                    b.Property<string>("Condicion");

                    b.Property<Guid>("Guid");

                    b.Property<string>("Tabla")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Consulta");
                });

            modelBuilder.Entity("Pemarsa.Domain.DocumentoAdjunto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Descripcion")
                        .HasMaxLength(250);

                    b.Property<string>("Extension")
                        .IsRequired();

                    b.Property<DateTime?>("FechaModifica");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<int?>("FormatoId");

                    b.Property<Guid>("Guid");

                    b.Property<Guid>("GuidOrganizacion");

                    b.Property<Guid>("GuidUsuarioCrea");

                    b.Property<Guid?>("GuidUsuarioModifica");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(45);

                    b.Property<string>("NombreArchivo")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("NombreUsuarioCrea")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioModifica")
                        .HasMaxLength(60);

                    b.Property<string>("Ruta")
                        .IsRequired();

                    b.Property<int?>("SolicitudOrdenTrabajoId");

                    b.HasKey("Id");

                    b.HasIndex("FormatoId");

                    b.HasIndex("SolicitudOrdenTrabajoId");

                    b.ToTable("DocumentoAdjunto");
                });

            modelBuilder.Entity("Pemarsa.Domain.Formato", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Codigo");

                    b.Property<string>("Especificacion");

                    b.Property<DateTime?>("FechaModifica");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<Guid>("Guid");

                    b.Property<Guid>("GuidOrganizacion");

                    b.Property<Guid>("GuidUsuarioCrea");

                    b.Property<Guid?>("GuidUsuarioModifica");

                    b.Property<int?>("HerramientaId");

                    b.Property<string>("NombreUsuarioCrea")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioModifica")
                        .HasMaxLength(60);

                    b.Property<string>("TPF");

                    b.Property<string>("TPI");

                    b.Property<int>("TipoFormatoId");

                    b.HasKey("Id");

                    b.HasIndex("HerramientaId");

                    b.HasIndex("TipoFormatoId");

                    b.ToTable("Formato");
                });

            modelBuilder.Entity("Pemarsa.Domain.Herramienta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClienteId");

                    b.Property<bool>("EsHerramientaMotor");

                    b.Property<bool>("EsHerramientaPetrolera");

                    b.Property<bool>("EsHerramientaPorCantidad");

                    b.Property<int>("EstadoId");

                    b.Property<int>("EstudioFactibilidadId");

                    b.Property<DateTime?>("FechaModifica");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<Guid>("Guid");

                    b.Property<Guid>("GuidOrganizacion");

                    b.Property<Guid>("GuidUsuarioCrea");

                    b.Property<Guid?>("GuidUsuarioModifica");

                    b.Property<Guid>("GuidUsuarioVerifica");

                    b.Property<int>("LineaId");

                    b.Property<int>("Moc");

                    b.Property<string>("Nombre")
                        .IsRequired();

                    b.Property<string>("NombreUsuarioCrea")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioModifica")
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioVerifica")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.HasIndex("EstadoId");

                    b.HasIndex("LineaId");

                    b.ToTable("Herramienta");
                });

            modelBuilder.Entity("Pemarsa.Domain.HerramientaEstudioFactibilidad", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool?>("Admin");

                    b.Property<DateTime?>("FechaModifica");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<Guid>("Guid");

                    b.Property<Guid>("GuidOrganizacion");

                    b.Property<Guid>("GuidUsuarioCrea");

                    b.Property<Guid?>("GuidUsuarioModifica");

                    b.Property<int>("HerramientaId");

                    b.Property<bool?>("ManoObra");

                    b.Property<bool?>("Mantenimiento");

                    b.Property<bool?>("Maquina");

                    b.Property<bool?>("Material");

                    b.Property<bool?>("Metodo");

                    b.Property<string>("NombreUsuarioCrea")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioModifica")
                        .HasMaxLength(60);

                    b.HasKey("Id");

                    b.HasIndex("HerramientaId")
                        .IsUnique();

                    b.ToTable("HerramientaEstudioFactibilidad");
                });

            modelBuilder.Entity("Pemarsa.Domain.HerramientaMaterial", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Estado");

                    b.Property<DateTime?>("FechaModifica");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<Guid>("Guid");

                    b.Property<Guid>("GuidOrganizacion");

                    b.Property<Guid>("GuidUsuarioCrea");

                    b.Property<Guid?>("GuidUsuarioModifica");

                    b.Property<int>("HerramientaId");

                    b.Property<int>("MaterialId");

                    b.Property<string>("NombreUsuarioCrea")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioModifica")
                        .HasMaxLength(60);

                    b.HasKey("Id");

                    b.HasIndex("HerramientaId");

                    b.HasIndex("MaterialId");

                    b.ToTable("HerramientaMaterial");
                });

            modelBuilder.Entity("Pemarsa.Domain.HerramientaTamano", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Estado");

                    b.Property<DateTime?>("FechaModifica");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<Guid>("Guid");

                    b.Property<Guid>("GuidOrganizacion");

                    b.Property<Guid>("GuidUsuarioCrea");

                    b.Property<Guid?>("GuidUsuarioModifica");

                    b.Property<int>("HerramientaId");

                    b.Property<string>("NombreUsuarioCrea")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioModifica")
                        .HasMaxLength(60);

                    b.Property<string>("Tamano")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("HerramientaId");

                    b.ToTable("HerramientaTamano");
                });

            modelBuilder.Entity("Pemarsa.Domain.HerramientaTamanoMotor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Estado");

                    b.Property<DateTime?>("FechaModifica");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<Guid>("Guid");

                    b.Property<Guid>("GuidOrganizacion");

                    b.Property<Guid>("GuidUsuarioCrea");

                    b.Property<Guid?>("GuidUsuarioModifica");

                    b.Property<int>("HerramientaId");

                    b.Property<string>("NombreUsuarioCrea")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioModifica")
                        .HasMaxLength(60);

                    b.Property<string>("Tamano")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("HerramientaId");

                    b.ToTable("HerramientaTamanoMotor");
                });

            modelBuilder.Entity("Pemarsa.Domain.Parametro", b =>
                {
                    b.Property<string>("Entidad")
                        .ValueGeneratedOnAdd();

                    b.HasKey("Entidad");

                    b.ToTable("Parametro");
                });

            modelBuilder.Entity("Pemarsa.Domain.ParametroCatalogo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CatalogoId");

                    b.Property<string>("Entidad");

                    b.HasKey("Id");

                    b.HasIndex("CatalogoId");

                    b.HasIndex("Entidad");

                    b.ToTable("ParametroCatalogo");
                });

            modelBuilder.Entity("Pemarsa.Domain.ParametroConsulta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ConsultaId");

                    b.Property<string>("Entidad");

                    b.HasKey("Id");

                    b.HasIndex("ConsultaId");

                    b.HasIndex("Entidad");

                    b.ToTable("ParametroConsulta");
                });

            modelBuilder.Entity("Pemarsa.Domain.SolicitudOrdenTrabajo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Cantidad");

                    b.Property<int>("CantidadInspeccionar");

                    b.Property<int>("ClienteId");

                    b.Property<string>("Contacto")
                        .IsRequired();

                    b.Property<int>("Cotizacion");

                    b.Property<string>("DetallesSolicitud")
                        .IsRequired();

                    b.Property<int>("EstadoId");

                    b.Property<DateTime?>("FechaModifica");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<Guid>("Guid");

                    b.Property<Guid>("GuidOrganizacion");

                    b.Property<Guid>("GuidUsuarioCrea");

                    b.Property<Guid?>("GuidUsuarioModifica");

                    b.Property<int>("LineaId");

                    b.Property<string>("NombreUsuarioCrea")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioModifica")
                        .HasMaxLength(60);

                    b.Property<int>("OrigenSolicitudId");

                    b.Property<int>("PrioridadId");

                    b.Property<int>("ResponsableId");

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.HasIndex("EstadoId");

                    b.HasIndex("LineaId");

                    b.HasIndex("OrigenSolicitudId");

                    b.HasIndex("PrioridadId");

                    b.HasIndex("ResponsableId");

                    b.ToTable("SolicitudOrdenTrabajo");
                });

            modelBuilder.Entity("Pemarsa.Domain.SolicitudOrdenTrabajoAnexos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DocumentoAdjuntoId");

                    b.Property<bool>("Estado");

                    b.Property<DateTime?>("FechaModifica");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<Guid>("Guid");

                    b.Property<Guid>("GuidOrganizacion");

                    b.Property<Guid>("GuidUsuarioCrea");

                    b.Property<Guid?>("GuidUsuarioModifica");

                    b.Property<string>("NombreUsuarioCrea")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.Property<string>("NombreUsuarioModifica")
                        .HasMaxLength(60);

                    b.Property<int>("SolicitudOrdenTrabajoId");

                    b.HasKey("Id");

                    b.HasIndex("DocumentoAdjuntoId");

                    b.HasIndex("SolicitudOrdenTrabajoId");

                    b.ToTable("SolicitudOrdenTrabajoAnexos");
                });

            modelBuilder.Entity("Pemarsa.Domain.Catalogo", b =>
                {
                    b.HasOne("Pemarsa.Domain.Catalogo")
                        .WithMany("SubCatalogos")
                        .HasForeignKey("CatalogoId");
                });

            modelBuilder.Entity("Pemarsa.Domain.Cliente", b =>
                {
                    b.HasOne("Pemarsa.Domain.DocumentoAdjunto", "Rut")
                        .WithMany()
                        .HasForeignKey("DocumentoAdjuntoId");

                    b.HasOne("Pemarsa.Domain.Catalogo", "Estado")
                        .WithMany()
                        .HasForeignKey("EstadoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pemarsa.Domain.ClienteLinea", b =>
                {
                    b.HasOne("Pemarsa.Domain.Cliente", "Cliente")
                        .WithMany("Lineas")
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pemarsa.Domain.DocumentoAdjunto", b =>
                {
                    b.HasOne("Pemarsa.Domain.Formato", "Formato")
                        .WithMany("Planos")
                        .HasForeignKey("FormatoId");

                    b.HasOne("Pemarsa.Domain.SolicitudOrdenTrabajo")
                        .WithMany("DocumentoAdjunto")
                        .HasForeignKey("SolicitudOrdenTrabajoId");
                });

            modelBuilder.Entity("Pemarsa.Domain.Formato", b =>
                {
                    b.HasOne("Pemarsa.Domain.Herramienta", "Herramienta")
                        .WithMany()
                        .HasForeignKey("HerramientaId");

                    b.HasOne("Pemarsa.Domain.Catalogo", "TipoFormato")
                        .WithMany()
                        .HasForeignKey("TipoFormatoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pemarsa.Domain.Herramienta", b =>
                {
                    b.HasOne("Pemarsa.Domain.Cliente", "Cliente")
                        .WithMany()
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pemarsa.Domain.Catalogo", "Estado")
                        .WithMany()
                        .HasForeignKey("EstadoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pemarsa.Domain.ClienteLinea", "Linea")
                        .WithMany()
                        .HasForeignKey("LineaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pemarsa.Domain.HerramientaEstudioFactibilidad", b =>
                {
                    b.HasOne("Pemarsa.Domain.Herramienta", "Herramienta")
                        .WithOne("HerramientaEstudioFactibilidad")
                        .HasForeignKey("Pemarsa.Domain.HerramientaEstudioFactibilidad", "HerramientaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pemarsa.Domain.HerramientaMaterial", b =>
                {
                    b.HasOne("Pemarsa.Domain.Herramienta", "Herramienta")
                        .WithMany("Materiales")
                        .HasForeignKey("HerramientaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pemarsa.Domain.Catalogo", "Material")
                        .WithMany()
                        .HasForeignKey("MaterialId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pemarsa.Domain.HerramientaTamano", b =>
                {
                    b.HasOne("Pemarsa.Domain.Herramienta", "Herramienta")
                        .WithMany("TamanosHerramienta")
                        .HasForeignKey("HerramientaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pemarsa.Domain.HerramientaTamanoMotor", b =>
                {
                    b.HasOne("Pemarsa.Domain.Herramienta", "Herramienta")
                        .WithMany("TamanosMotor")
                        .HasForeignKey("HerramientaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pemarsa.Domain.ParametroCatalogo", b =>
                {
                    b.HasOne("Pemarsa.Domain.Catalogo", "Catalogo")
                        .WithMany()
                        .HasForeignKey("CatalogoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pemarsa.Domain.Parametro", "Parametro")
                        .WithMany()
                        .HasForeignKey("Entidad");
                });

            modelBuilder.Entity("Pemarsa.Domain.ParametroConsulta", b =>
                {
                    b.HasOne("Pemarsa.Domain.Consulta", "Consulta")
                        .WithMany()
                        .HasForeignKey("ConsultaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pemarsa.Domain.Parametro", "Parametro")
                        .WithMany()
                        .HasForeignKey("Entidad");
                });

            modelBuilder.Entity("Pemarsa.Domain.SolicitudOrdenTrabajo", b =>
                {
                    b.HasOne("Pemarsa.Domain.Cliente", "Cliente")
                        .WithMany()
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pemarsa.Domain.Catalogo", "Estado")
                        .WithMany()
                        .HasForeignKey("EstadoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pemarsa.Domain.ClienteLinea", "ClienteLinea")
                        .WithMany()
                        .HasForeignKey("LineaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pemarsa.Domain.Catalogo", "OrigenSolicitud")
                        .WithMany()
                        .HasForeignKey("OrigenSolicitudId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pemarsa.Domain.Catalogo", "Prioridad")
                        .WithMany()
                        .HasForeignKey("PrioridadId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pemarsa.Domain.Catalogo", "Responsable")
                        .WithMany()
                        .HasForeignKey("ResponsableId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Pemarsa.Domain.SolicitudOrdenTrabajoAnexos", b =>
                {
                    b.HasOne("Pemarsa.Domain.DocumentoAdjunto", "DocumentoAdjunto")
                        .WithMany()
                        .HasForeignKey("DocumentoAdjuntoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pemarsa.Domain.SolicitudOrdenTrabajo", "SolicitudOrdenTrabajo")
                        .WithMany("Anexos")
                        .HasForeignKey("SolicitudOrdenTrabajoId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}

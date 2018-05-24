using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using Pemarsa.CanonicalModels;
using System.Linq;

namespace Pemarsa.Data.DBInitialize
{
    /// <summary>
    /// Esta clase se encarga de poblar la base de datos 
    /// con los catalogos correspondientes a la aplicación,
    /// (Se 'queman' los guids para que sean los mismos en todas las implementaciones)
    /// </summary>
    public static partial class DBInitializer
    {
        public static void Initialize(PemarsaContext context)
        {
            try
            {
                #region Estados
                var estados = new List<Catalogo>
                {
                    new Catalogo{
                        Id = 1,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Cliente.Activa,
                        Grupo = CanonicalConstants.Grupos.EstadosClientes,
                    },
                    new Catalogo{
                        Id = 2,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Cliente.Inactiva,
                        Grupo = CanonicalConstants.Grupos.EstadosClientes,
                    }
                };
                #endregion

                #region Tipos
                var tipos = new List<Catalogo>
                {
                    new Catalogo{
                        Id = 3,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Prueba,
                        Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 4,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Prueba1,
                        Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 5,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Prueba2,
                        Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    }
                };
                foreach (var tipo in tipos)
                {
                    if (context.Catalogo.Where(c => c.Id == tipo.Id).ToList().Count == 0)
                        context.Catalogo.Add(tipo);
                }
                #endregion


                #region Solicitudes
                var solicitudes = new List<Catalogo>
                {
                    new Catalogo{
                        Id = 6,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Estados.Rechazado,
                        Grupo = CanonicalConstants.Grupos.EstadosSolicitud,
                    },
                    new Catalogo{
                        Id = 7,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Estados.Liberado,
                        Grupo = CanonicalConstants.Grupos.EstadosSolicitud,
                    },
                    new Catalogo{
                        Id = 8,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Estados.Pendiente,
                        Grupo = CanonicalConstants.Grupos.EstadosSolicitud,
                    },
                    new Catalogo{
                        Id = 9,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Origen.Telefonica,
                        Grupo = CanonicalConstants.Grupos.OrigenSolicitud,
                    },
                    new Catalogo{
                        Id = 10,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Origen.CorreoElectronico,
                        Grupo = CanonicalConstants.Grupos.OrigenSolicitud,
                    },
                    new Catalogo{
                        Id = 11,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Origen.Sms,
                        Grupo = CanonicalConstants.Grupos.OrigenSolicitud,
                    },
                    new Catalogo{
                        Id = 12,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Origen.Chat,
                        Grupo = CanonicalConstants.Grupos.OrigenSolicitud,
                    },
                    new Catalogo{
                        Id = 13,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Origen.Remision,
                        Grupo = CanonicalConstants.Grupos.OrigenSolicitud,
                    },
                    new Catalogo{
                        Id = 14,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Prioridad.Inmediato,
                        Grupo = CanonicalConstants.Grupos.PrioridadSolicitud,
                    },
                    new Catalogo{
                        Id = 15,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Prioridad.Mediato,
                        Grupo = CanonicalConstants.Grupos.PrioridadSolicitud,
                    },
                    new Catalogo{
                        Id = 16,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Prioridad.Normal,
                        Grupo = CanonicalConstants.Grupos.PrioridadSolicitud,
                    },
                    new Catalogo{
                        Id = 17,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Solicitud.Prioridad.Standby,
                        Grupo = CanonicalConstants.Grupos.PrioridadSolicitud,
                    }
                };
                foreach (var solicitud in solicitudes)
                {
                    if (context.Catalogo.Where(c => c.Id == solicitud.Id).ToList().Count == 0)
                        context.Catalogo.Add(solicitud);
                }
                #endregion

                if (!context.Catalogo.Any())
                {
                    context.Catalogo.AddRange(estados);
                    context.SaveChanges();
                }

                #region Parametros
                var entidades = new List<Parametro>
                    {
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Cliente},
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Materiales},
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Solicitud}
                    };

                if (!context.Parametro.Any())
                {
                    context.Parametro.AddRange(entidades);
                }

                #endregion

                context.SaveChanges();

                #region ParametrosCatalogo

                // Estados //
                foreach (var estado in estados)
                {
                    switch (estado.Grupo)
                    {
                        case CanonicalConstants.Grupos.EstadosClientes:
                            context.ParametroCatalogo.AddRange
                            (
                                new ParametroCatalogo
                                {
                                    CatalogoId = estado.Id,
                                    Entidad = CanonicalConstants.Entidades.Cliente
                                }
                            );
                            break;
                    }
                }

                // Tipos //
                foreach (var tipo in tipos)
                {
                    switch (tipo.Grupo)
                    {
                        case CanonicalConstants.Grupos.HerramientasMateriales:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Materiales)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Materiales
                                }
                                );
                            }
                            break;
                    }
                }

                // Solicitudes //
                foreach (var solicitud in solicitudes)
                {
                    switch (solicitud.Grupo)
                    {
                        case CanonicalConstants.Grupos.OrigenSolicitud:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == solicitud.Id) && (pc.Entidad == CanonicalConstants.Entidades.Solicitud)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = solicitud.Id,
                                    Entidad = CanonicalConstants.Entidades.Solicitud
                                }
                                );
                            }
                            break;

                        case CanonicalConstants.Grupos.PrioridadSolicitud:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == solicitud.Id) && (pc.Entidad == CanonicalConstants.Entidades.Solicitud)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = solicitud.Id,
                                    Entidad = CanonicalConstants.Entidades.Solicitud
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.EstadosSolicitud:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == solicitud.Id) && (pc.Entidad == CanonicalConstants.Entidades.Solicitud)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = solicitud.Id,
                                    Entidad = CanonicalConstants.Entidades.Solicitud
                                }
                                );
                            }
                            break;
                    }
                }

                #endregion

                context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

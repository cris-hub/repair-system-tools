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
                    },
                    new Catalogo{
                        Id = 30,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.OrdenTrabajo.Inactiva,
                        Grupo = CanonicalConstants.Grupos.EstadosOrdenTrabajo,
                    },
                      new Catalogo{
                        Id = 31,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.OrdenTrabajo.EnProceso,
                        Grupo = CanonicalConstants.Grupos.EstadosOrdenTrabajo,
                    },
                    new Catalogo{
                        Id = 60,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.SolictudOdenTrabjo.Inactiva,
                        Grupo = CanonicalConstants.Grupos.EstadosSolicitud,
                    },
                      new Catalogo{
                        Id = 61,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.SolictudOdenTrabjo.EnProceso,
                        Grupo = CanonicalConstants.Grupos.EstadosSolicitud,
                    },
                      new Catalogo{
                        Id = 38,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Proceso.Pendiente,
                        Grupo = CanonicalConstants.Grupos.EstadosProceso,
                    },
                      new Catalogo{
                        Id = 39,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Proceso.Asignado,
                        Grupo = CanonicalConstants.Grupos.EstadosProceso,
                    },
                      new Catalogo{
                        Id = 62,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Proceso.Completado,
                        Grupo = CanonicalConstants.Grupos.EstadosProceso,
                    },
                      new Catalogo{
                        Id = 63,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Proceso.Liberado,
                        Grupo = CanonicalConstants.Grupos.EstadosProceso,
                    },
                      new Catalogo{
                        Id = 64,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Proceso.Rechazado,
                        Grupo = CanonicalConstants.Grupos.EstadosProceso,
                    },
                      new Catalogo{
                        Id = 110,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Proceso.Procesado,
                        Grupo = CanonicalConstants.Grupos.EstadosProceso,
                    },
                      new Catalogo{
                        Id = 106,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Proceso.EnProceso,
                        Grupo = CanonicalConstants.Grupos.EstadosProceso,
                    },
                      new Catalogo{
                        Id = 107,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Proceso.Inspeccion.Completada,
                        Grupo = CanonicalConstants.Grupos.EstadosInspeccion,
                    },
                      new Catalogo{
                        Id = 77,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Proceso.Inspeccion.EnProceso,
                        Grupo = CanonicalConstants.Grupos.EstadosInspeccion,
                    },
                      new Catalogo{
                        Id = 108,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Proceso.Inspeccion.Pendiente,
                        Grupo = CanonicalConstants.Grupos.EstadosInspeccion,
                    },
                      new Catalogo{
                        Id = 78,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Proceso.Inspeccion.Anulada,
                        Grupo = CanonicalConstants.Grupos.EstadosInspeccion,
                    },
                      new Catalogo{
                        Id = 80,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Conexion_BOX.estado1,
                          Grupo = CanonicalConstants.Grupos.EstadosConexionBOX,
                    },
                      new Catalogo{
                        Id = 81,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Conexion_BOX.estado2,
                          Grupo = CanonicalConstants.Grupos.EstadosConexionBOX,
                    },
                      new Catalogo{
                        Id = 82,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Conexion_BOX.estado1,
                          Grupo = CanonicalConstants.Grupos.EstadosConexionPIN,
                    },
                      new Catalogo{
                        Id = 83,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Conexion_BOX.estado2,
                          Grupo = CanonicalConstants.Grupos.EstadosConexionPIN,
                    }
                };


                foreach (var estado in estados)
                {
                    if (context.Catalogo.Where(c => c.Id == estado.Id).ToList().Count == 0)
                        context.Catalogo.Add(estado);
                }
                #endregion

                #region Tipos
                var tipos = new List<Catalogo>
                {
                    new Catalogo{
                        Id = 3,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Aluminio,
                        Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 4,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Oro,
                        Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 5,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Azufre,
                          Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 71,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Valvula,
                          Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 72,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Motor,
                          Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 73,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.VigaOscilante,
                          Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 74,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Cable,
                          Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 75,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Oleoducto,
                          Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 76,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Tubos,
                          Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    }
                    ,
                    new Catalogo{
                        Id = 18,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Formato.FormatoConexion,
                        Grupo = CanonicalConstants.Grupos.TiposFormatos
                    },
                    new Catalogo{
                        Id = 19,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Formato.FormatoOtros,
                        Grupo = CanonicalConstants.Grupos.TiposFormatos
                    },
                    new Catalogo{
                        Id = 22,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Formato.TipoConexionNC50,
                        Grupo = CanonicalConstants.Grupos.TipoConexion
                    },
                    new Catalogo{
                        Id = 23,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Formato.TipoConexionNK50,
                        Grupo = CanonicalConstants.Grupos.TipoConexion
                    },
                    new Catalogo{
                        Id = 111,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.TipoConexion.NoAplica,
                        Grupo = CanonicalConstants.Grupos.TipoConexion
                    },
                    new Catalogo{
                        Id = 24,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Formato.FormatoConexionPIN,
                        Grupo = CanonicalConstants.Grupos.Conexion
                    },
                    new Catalogo{
                        Id = 25,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Formato.FormatoConexionBOX,
                        Grupo = CanonicalConstants.Grupos.Conexion
                    },
                     new Catalogo{
                        Id = 112,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Conexion.NoAplica,
                        Grupo = CanonicalConstants.Grupos.Conexion
                    },
                     new Catalogo{
                        Id = 26,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.FormatoAdendem.OD,
                        Grupo = CanonicalConstants.Grupos.FormatoAdendum
                    },
                      new Catalogo{
                        Id = 27,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.FormatoAdendem.BEV,
                        Grupo = CanonicalConstants.Grupos.FormatoAdendum
                    },new Catalogo{
                        Id = 36,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.OrdenTrabajo.Reparación,
                        Grupo = CanonicalConstants.Grupos.TipoServicioOrdenTrabajo
                    },new Catalogo{
                        Id = 37,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.OrdenTrabajo.Alquiler,
                        Grupo = CanonicalConstants.Grupos.TipoServicioOrdenTrabajo
                    },new Catalogo{
                        Id = 52,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.OrdenTrabajo.Fabricación,
                        Grupo = CanonicalConstants.Grupos.TipoServicioOrdenTrabajo
                    }, new Catalogo{
                        Id = 53,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.OrdenTrabajo.Otro,
                        Grupo = CanonicalConstants.Grupos.TipoServicioOrdenTrabajo
                    },new Catalogo{
                        Id = 40,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoProceso.InspeccionEntrada,
                        Grupo = CanonicalConstants.Grupos.TipoProceso
                    },new Catalogo{
                        Id = 41,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoProceso.InspeccionSalida,
                        Grupo = CanonicalConstants.Grupos.TipoProceso
                    },new Catalogo{
                        Id = 54,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoProceso.Alistamiento,
                        Grupo = CanonicalConstants.Grupos.TipoProceso
                    },new Catalogo{
                        Id = 55,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoProceso.AprobacionSupervisor,
                        Grupo = CanonicalConstants.Grupos.TipoProceso
                    },new Catalogo{
                        Id = 56,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoProceso.MecanizadoFresa,
                        Grupo = CanonicalConstants.Grupos.TipoProceso
                    },new Catalogo{
                        Id = 57,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoProceso.MecanizadoTorno,
                        Grupo = CanonicalConstants.Grupos.TipoProceso
                    },new Catalogo{
                        Id = 58,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoProceso.Rectificado,
                        Grupo = CanonicalConstants.Grupos.TipoProceso
                    },new Catalogo{
                        Id = 109,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoProceso.Reasignacion,
                        Grupo = CanonicalConstants.Grupos.TipoProceso
                    },new Catalogo{
                        Id = 59,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoProceso.Soldadura,
                        Grupo = CanonicalConstants.Grupos.TipoProceso
                    },new Catalogo{
                        Id = 114,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoProceso.junk,
                        Grupo = CanonicalConstants.Grupos.TipoProceso
                    },new Catalogo{
                        Id = 65,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoInspeccion.VisualDimensional,
                        Grupo = CanonicalConstants.Grupos.TiposInspeccion

                    }
                    ,new Catalogo{
                        Id = 66,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoInspeccion.MPI,
                        Grupo = CanonicalConstants.Grupos.TiposInspeccion
                    }    ,new Catalogo{
                        Id = 67,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoInspeccion.LPI,
                        Grupo = CanonicalConstants.Grupos.TiposInspeccion
                    }    ,new Catalogo{
                        Id = 68,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoInspeccion.UT,
                        Grupo = CanonicalConstants.Grupos.TiposInspeccion
                    }    ,new Catalogo{
                        Id = 69,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoInspeccion.EMI,
                        Grupo = CanonicalConstants.Grupos.TiposInspeccion
                    }    ,new Catalogo{
                        Id = 70,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoInspeccion.VR,
                        Grupo = CanonicalConstants.Grupos.TiposInspeccion
                    },new Catalogo{
                        Id = 79,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoInspeccion.UTA,
                        Grupo = CanonicalConstants.Grupos.TiposInspeccion
                    },new Catalogo{
                        Id = 84,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.TipoFormatoParametro.Aletas,
                        Grupo = CanonicalConstants.Grupos.TipoFormatoParametro
                    },new Catalogo{
                        Id = 85,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.TipoFormatoParametro.Parametro,
                        Grupo = CanonicalConstants.Grupos.TipoFormatoParametro
                    },new Catalogo{
                        Id = 87,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.BloqueEscalonado.Nivel1,
                        Grupo = CanonicalConstants.Grupos.TiposBloqueEscalonadoo
                    },new Catalogo{
                        Id = 88,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.BloqueEscalonado.Nivel2,
                        Grupo = CanonicalConstants.Grupos.TiposBloqueEscalonadoo
                    },new Catalogo{
                        Id = 89,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.BloqueEscalonado.Nivel3,
                        Grupo = CanonicalConstants.Grupos.TiposBloqueEscalonadoo
                    },new Catalogo{
                        Id = 90,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.BloqueEscalonado.Nivel4,
                        Grupo = CanonicalConstants.Grupos.TiposBloqueEscalonadoo
                    },new Catalogo{
                        Id = 91,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.TipoInsumo.SKC_S,
                        Grupo = CanonicalConstants.Grupos.TipoInsumo
                    },new Catalogo{
                        Id = 92,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.TipoInsumo.SKD_S2,
                        Grupo = CanonicalConstants.Grupos.TipoInsumo
                    },new Catalogo{
                        Id = 93,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.TipoInsumo.SKL_SP2,
                        Grupo = CanonicalConstants.Grupos.TipoInsumo
                    },new Catalogo{
                        Id = 94,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.TiposLiquidos.coloreados,
                        Grupo = CanonicalConstants.Grupos.TiposLiquidos
                    },new Catalogo{
                        Id = 95,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.TiposLiquidos.Fluorescentes,
                        Grupo = CanonicalConstants.Grupos.TiposLiquidos
                    }





                    ,new Catalogo{
                        Id = 96,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.TubosPatrones.Pilot,
                        Grupo = CanonicalConstants.Grupos.TubosPatrones
                    } ,new Catalogo{
                        Id = 97,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.TubosPatrones.Venturi,
                        Grupo = CanonicalConstants.Grupos.TubosPatrones
                    }

                    ,new Catalogo{
                        Id = 98,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.EquiposEmi.EquiposEmi1,
                        Grupo = CanonicalConstants.Grupos.EquiposEmi
                    } ,new Catalogo{
                        Id = 99,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.EquiposEmi.EquiposEmi2,
                        Grupo = CanonicalConstants.Grupos.EquiposEmi
                    }

                    ,new Catalogo{
                        Id = 100,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.BobinasMagneticas.XM5,
                        Grupo = CanonicalConstants.Grupos.BobinasMagneticas
                    } ,new Catalogo{
                        Id = 101,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.BobinasMagneticas.MXX,
                        Grupo = CanonicalConstants.Grupos.BobinasMagneticas
                    }
                    ,new Catalogo{
                        Id = 102,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.BobinasMagneticas.M12,
                        Grupo = CanonicalConstants.Grupos.BobinasMagneticas
                    } ,new Catalogo{
                        Id = 103,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.BobinasMagneticas.CM22,
                        Grupo = CanonicalConstants.Grupos.BobinasMagneticas
                    },new Catalogo{
                        Id = 104,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.BobinasMagneticas.C22A,
                        Grupo = CanonicalConstants.Grupos.BobinasMagneticas
                    }


                };
                foreach (var tipo in tipos)
                {
                    if (context.Catalogo.Where(c => c.Id == tipo.Id).ToList().Count == 0)
                        context.Catalogo.Add(tipo);
                }
                #endregion

                #region Especificacion
                var Especificaciones = new List<Catalogo>
                {
                    new Catalogo{
                        Id = 20,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Especificacion.tipo1,
                        Grupo = CanonicalConstants.Grupos.Especificacion
                    },
                    new Catalogo{
                        Id = 21,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Especificacion.tipo2,
                        Grupo = CanonicalConstants.Grupos.Especificacion
                     },new Catalogo{
                        Id = 113,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Especificacion.tipo3,
                        Grupo = CanonicalConstants.Grupos.Especificacion
                     }
                };
                foreach (var Especificacion in Especificaciones)
                {
                    if (context.Catalogo.Where(c => c.Id == Especificacion.Id).ToList().Count == 0)
                        context.Catalogo.Add(Especificacion);
                }

                #endregion

                #region Responsables
                var responsables = new List<Catalogo>
                {
                    new Catalogo{
                        Id = 28,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Responsables.JuanMarquez,
                        Grupo = CanonicalConstants.Grupos.Responsables,
                    },
                     new Catalogo{
                        Id = 29,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Responsables.MiguelAndres,
                        Grupo = CanonicalConstants.Grupos.Responsables,
                    },
                };


                foreach (var responsable in responsables)
                {
                    if (context.Catalogo.Where(c => c.Id == responsable.Id).ToList().Count == 0)
                        context.Catalogo.Add(responsable);
                }
                #endregion

                #region Prioridades
                var prioridades = new List<Catalogo>
                {
                    new Catalogo{
                        Id = 32,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.OrdenTrabajo.Inmediato,
                        Grupo = CanonicalConstants.Grupos.PrioridadOrdenTrabajo,
                    },
                      new Catalogo{
                        Id = 33,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.OrdenTrabajo.Mediato,
                        Grupo = CanonicalConstants.Grupos.PrioridadOrdenTrabajo,
                    },
                      new Catalogo{
                        Id = 34,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.OrdenTrabajo.Normal,
                        Grupo = CanonicalConstants.Grupos.PrioridadOrdenTrabajo,
                    },
                       new Catalogo{
                        Id = 35,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.OrdenTrabajo.Standby,
                        Grupo = CanonicalConstants.Grupos.PrioridadOrdenTrabajo,
                    },

                };


                foreach (var prioridad in prioridades)
                {
                    if (context.Catalogo.Where(c => c.Id == prioridad.Id).ToList().Count == 0)
                        context.Catalogo.Add(prioridad);
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

                #region Proceso
                var procesos = new List<Catalogo>
                {
                    new Catalogo{
                        Id = 44,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.EquipoMedicionUtilizado.Tipo1,
                        Grupo = CanonicalConstants.Grupos.EquipoMedicionUtilizado
                    },
                    new Catalogo{
                        Id = 45,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.EquipoMedicionUtilizado.Tipo2,
                        Grupo = CanonicalConstants.Grupos.EquipoMedicionUtilizado
                     },
                    new Catalogo{
                        Id = 46,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.Instructivo.Tipo1,
                        Grupo = CanonicalConstants.Grupos.Instructivo
                     },
                    new Catalogo{
                        Id = 47,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.Instructivo.Tipo2,
                        Grupo = CanonicalConstants.Grupos.Instructivo
                     },
                    new Catalogo{
                        Id = 48,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.MaquinaAsignada.Tipo1,
                        Grupo = CanonicalConstants.Grupos.MaquinaAsignada
                     },
                    new Catalogo{
                        Id = 49,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.MaquinaAsignada.Tipo2,
                        Grupo = CanonicalConstants.Grupos.MaquinaAsignada
                     },
                    new Catalogo{
                        Id = 50,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.Norma.Tipo2,
                        Grupo = CanonicalConstants.Grupos.Norma
                     },
                    new Catalogo{
                        Id = 51,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.Norma.Tipo1,
                        Grupo = CanonicalConstants.Grupos.Norma
                     },
                    new Catalogo{
                        Id = 115,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.Operario.Operario1,
                        Grupo = CanonicalConstants.Grupos.Operario
                     },
                    new Catalogo{
                        Id = 116,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.Operario.Operario2,
                        Grupo = CanonicalConstants.Grupos.Operario
                     },
                    new Catalogo
                    {
                        Id = 117,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.ProcesoRealizar.Estampado,
                        Grupo = CanonicalConstants.Grupos.ProcesoRealizar
                    },
                    new Catalogo
                    {
                        Id = 122,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.ProcesoRealizar.Pintura,
                        Grupo = CanonicalConstants.Grupos.ProcesoRealizar
                    },
                    new Catalogo
                    {
                        Id = 123,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.ProcesoRealizar.BanoQuimico,
                        Grupo = CanonicalConstants.Grupos.ProcesoRealizar
                    },
                    new Catalogo
                    {
                        Id = 124,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.ProcesoRealizar.ProbarGauge,
                        Grupo = CanonicalConstants.Grupos.ProcesoRealizar
                    },
                    new Catalogo
                    {
                        Id = 125,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.ProcesoRealizar.ShotPeening,
                        Grupo = CanonicalConstants.Grupos.ProcesoRealizar
                    },
                    new Catalogo
                    {
                        Id = 121,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Proceso.ProcesoRealizar.PulirDetalles,
                        Grupo = CanonicalConstants.Grupos.ProcesoRealizar
                    },new Catalogo{

                        Id = 42,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoSoldadura.BaseReconstruccion,
                        Grupo = CanonicalConstants.Grupos.TipoSoldadura
                    },new Catalogo{

                        Id = 43,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoSoldadura.Estructural,
                        Grupo = CanonicalConstants.Grupos.TipoSoldadura
                    },new Catalogo{

                        Id = 126,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoSoldadura.Tungsteno,
                        Grupo = CanonicalConstants.Grupos.TipoSoldadura
                    },new Catalogo{

                        Id = 127,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoSoldadura.PTA,
                        Grupo = CanonicalConstants.Grupos.TipoSoldadura
                    },new Catalogo{

                        Id = 128,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoSoldadura.Brocas,
                        Grupo = CanonicalConstants.Grupos.TipoSoldadura
                    },new Catalogo{

                        Id = 129,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Proceso.TipoSoldadura.Otro,
                        Grupo = CanonicalConstants.Grupos.TipoSoldadura
                    }
                };
                foreach (var proceso in procesos)
                {
                    if (context.Catalogo.Where(c => c.Id == proceso.Id).ToList().Count == 0)
                        context.Catalogo.Add(proceso);
                }

                #endregion



                //if (!context.Catalogo.Any())
                //{
                //    context.Catalogo.AddRange(estados);
                //    context.SaveChanges();
                //}

                #region Parametros
                var entidades = new List<Parametro>
                    {
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Cliente},
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Materiales},
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Solicitud},
                        new Parametro{ Entidad = CanonicalConstants.Entidades.OrdenTrabajo},
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Proceso},
                        new Parametro{ Entidad = CanonicalConstants.Entidades.MecanizadoTorno},
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Formato},
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Inspeccion}

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
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == estado.Id) && (pc.Entidad == CanonicalConstants.Entidades.Cliente)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.AddRange
                           (
                               new ParametroCatalogo
                               {
                                   CatalogoId = estado.Id,
                                   Entidad = CanonicalConstants.Entidades.Cliente
                               }
                           );
                            }
                            break;
                        case CanonicalConstants.Grupos.EstadosOrdenTrabajo:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == estado.Id) && (pc.Entidad == CanonicalConstants.Entidades.OrdenTrabajo)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.AddRange
                           (
                               new ParametroCatalogo
                               {
                                   CatalogoId = estado.Id,
                                   Entidad = CanonicalConstants.Entidades.OrdenTrabajo
                               }
                           );
                            }
                            break;
                        case CanonicalConstants.Grupos.EstadosProceso:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == estado.Id) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.AddRange
                           (
                               new ParametroCatalogo
                               {
                                   CatalogoId = estado.Id,
                                   Entidad = CanonicalConstants.Entidades.Proceso
                               }
                           );
                            }
                            break;
                        case CanonicalConstants.Grupos.EstadosSolicitud:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == estado.Id) && (pc.Entidad == CanonicalConstants.Entidades.Solicitud)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.AddRange
                           (
                               new ParametroCatalogo
                               {
                                   CatalogoId = estado.Id,
                                   Entidad = CanonicalConstants.Entidades.Solicitud
                               }
                           );
                            }
                            break;
                        case CanonicalConstants.Grupos.EstadosInspeccion:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == estado.Id) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.AddRange
                           (
                               new ParametroCatalogo
                               {
                                   CatalogoId = estado.Id,
                                   Entidad = CanonicalConstants.Entidades.Proceso
                               }
                           );
                            }
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
                        case CanonicalConstants.Grupos.TiposFormatos:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Formato)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Formato
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.Conexion:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Formato)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Formato
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.TipoConexion:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Formato)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Formato
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.FormatoAdendum:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Formato)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Formato
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.TipoServicioOrdenTrabajo:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.OrdenTrabajo)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.OrdenTrabajo
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.TipoProceso:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Proceso
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.TiposInspeccion:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Proceso
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.TipoFormatoParametro:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Formato)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Formato
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.TiposBloqueEscalonadoo:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Inspeccion)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Inspeccion
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.TipoInsumo:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Inspeccion)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Inspeccion
                                }
                                );
                            }
                            break;


                        case CanonicalConstants.Grupos.TubosPatrones:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Inspeccion)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Inspeccion
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.EquiposEmi:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Inspeccion)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Inspeccion
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.BobinasMagneticas:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Inspeccion)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Inspeccion
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.TiposLiquidos:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Inspeccion)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Inspeccion
                                }
                                );
                            }
                            break;
                    }
                }
                // Especificaciones //
                foreach (var Especificacione in Especificaciones)
                {
                    switch (Especificacione.Grupo)
                    {
                        case CanonicalConstants.Grupos.Especificacion:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == Especificacione.Id) && (pc.Entidad == CanonicalConstants.Entidades.Formato)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = Especificacione.Id,
                                    Entidad = CanonicalConstants.Entidades.Formato
                                }
                                );
                            }
                            break;
                    }
                }
                //Responsables // 
                foreach (var responsable in responsables)
                {
                    switch (responsable.Grupo)
                    {
                        case CanonicalConstants.Grupos.Responsables:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == responsable.Id) && (pc.Entidad == CanonicalConstants.Entidades.Solicitud)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = responsable.Id,
                                    Entidad = CanonicalConstants.Entidades.Solicitud
                                }
                                );
                            }
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == responsable.Id) && (pc.Entidad == CanonicalConstants.Entidades.OrdenTrabajo)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = responsable.Id,
                                    Entidad = CanonicalConstants.Entidades.OrdenTrabajo
                                }
                                );
                            }
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == responsable.Id) && (pc.Entidad == CanonicalConstants.Entidades.Cliente)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = responsable.Id,
                                    Entidad = CanonicalConstants.Entidades.Cliente
                                }
                                );
                            }
                            break;
                    }
                }

                // Prioridad //
                foreach (var prioridad in prioridades)
                {
                    switch (prioridad.Grupo)
                    {
                        case CanonicalConstants.Grupos.PrioridadOrdenTrabajo:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == prioridad.Id) && (pc.Entidad == CanonicalConstants.Entidades.OrdenTrabajo)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = prioridad.Id,
                                    Entidad = CanonicalConstants.Entidades.OrdenTrabajo
                                }
                                );
                            }
                            break;

                    }
                }

                // procesos //
                foreach (var proceso in procesos)
                {
                    switch (proceso.Grupo)
                    {
                        case CanonicalConstants.Grupos.EquipoMedicionUtilizado:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == proceso.Id) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = proceso.Id,
                                    Entidad = CanonicalConstants.Entidades.Proceso
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.Instructivo:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == proceso.Id) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = proceso.Id,
                                    Entidad = CanonicalConstants.Entidades.Proceso
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.MaquinaAsignada:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == proceso.Id) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = proceso.Id,
                                    Entidad = CanonicalConstants.Entidades.Proceso
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.Norma:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == proceso.Id) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = proceso.Id,
                                    Entidad = CanonicalConstants.Entidades.Proceso
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.Operario:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == proceso.Id) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = proceso.Id,
                                    Entidad = CanonicalConstants.Entidades.Proceso
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.ProcesoRealizar:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == proceso.Id) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = proceso.Id,
                                    Entidad = CanonicalConstants.Entidades.Proceso
                                }
                                );
                            }
                            break;
                        case CanonicalConstants.Grupos.TipoSoldadura:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == proceso.Id) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = proceso.Id,
                                    Entidad = CanonicalConstants.Entidades.Proceso
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

                #region Consultas

                var consultas = new List<Consulta>
                {
                    new Consulta
                    {
                        Id = 1,
                        Guid = Guid.NewGuid(),
                        Campos = "id, Guid, NickName, EstadoId",
                        Tabla = "cliente",
                    },
                    new Consulta
                    {
                        Id = 2,
                        Guid = Guid.NewGuid(),
                        Campos = "id, Guid, Nombre, ClienteId",
                        Tabla = "clientelinea",
                    },
                    new Consulta
                    {
                        Id = 3,
                        Guid = Guid.NewGuid(),
                        Campos = "Id, Guid, Valor, Id",
                        Tabla = "catalogo",
                        Condicion = "Grupo = 'TIPOS_INSPECCION'",
                    },
                    new Consulta
                    {
                        Id = 4,
                        Guid = Guid.NewGuid(),
                        Campos = "Id, Guid, Valor, Id, Grupo",
                        Tabla = "catalogo",
                        Condicion = @"Grupo = 'TIPO_CONEXION ' 
                                    OR Grupo = 'ESTADOS_CONEXION_BOX'  
                                    OR Grupo = 'ESTADOS_CONEXION_PIN'  
                                    OR Grupo = 'CONEXION'
                                    OR Grupo = 'EQUIPO_MEDICION_UTILIZADO_PROCESO'
                                    OR Grupo = 'TIPO_BLOQUEESCALONADO'

",
                    }
                    ,
                    new Consulta
                    {
                        Id = 5,
                        Guid = Guid.NewGuid(),
                        Campos = "Id, Guid, Valor, Id, Grupo",
                        Tabla = "catalogo",
                        Condicion = @"Grupo = 'TUBOS_PATRONES' 
                                    OR Grupo = 'EQUIPOS_EMI'  
                                    OR Grupo = 'BOBINAS_MAGNETICAS'  ",
                    }
                    ,
                    new Consulta
                    {
                        Id = 6,
                        Guid = Guid.NewGuid(),
                        Campos = "id, guid, nombre, clienteId, lineaId",
                        Tabla = "herramienta"
                    } ,
                    new Consulta
                    {
                        Id = 7,
                        Guid = Guid.NewGuid(),
                        Campos = "Id, Guid, Valor, Id, Grupo",
                        Tabla = "catalogo",
                        Condicion = @" Grupo = 'MAQUINA_ASIGNADA_PROCESO'
                                    OR Grupo = 'OPERARIO'  
                                    OR Grupo = 'NORMA_PROCESO'  
                                    OR Grupo = 'EQUIPO_MEDICION_UTILIZADO_PROCESO'  
                                    OR Grupo = 'INSTRUCTIVO_PROCESO'  
                                    OR Grupo = 'OPERARIO' 
                                    OR Grupo = 'PROCESO_REALIZAR' 
                                "
                    }



                };

                foreach (var consulta in consultas)
                {
                    if (context.Consulta.Where(c => c.Id == consulta.Id).ToList().Count == 0)
                        context.Consulta.Add(consulta);
                }


                foreach (var consulta in consultas)
                {
                    switch (consulta.Id)
                    {
                        case 1:
                            if (context.ParametroConsulta.Where(pc => (pc.ConsultaId == 1) && (pc.Entidad == CanonicalConstants.Entidades.Cliente)).ToList().Count == 0)
                            {
                                context.ParametroConsulta.Add
                                (
                                new ParametroConsulta
                                {
                                    ConsultaId = consulta.Id,
                                    Entidad = CanonicalConstants.Entidades.Cliente
                                }
                                );
                            }
                            break;
                        case 2:
                            if (context.ParametroConsulta.Where(pc => (pc.ConsultaId == 2) && (pc.Entidad == CanonicalConstants.Entidades.Cliente)).ToList().Count == 0)
                            {
                                context.ParametroConsulta.Add
                                (
                                new ParametroConsulta
                                {
                                    ConsultaId = consulta.Id,
                                    Entidad = CanonicalConstants.Entidades.Cliente
                                }
                                );
                            }
                            break;
                        case 3:
                            if (context.ParametroConsulta.Where(pc => (pc.ConsultaId == 3) && (pc.Entidad == CanonicalConstants.Entidades.Proceso)).ToList().Count == 0)
                            {
                                context.ParametroConsulta.Add
                                (
                                new ParametroConsulta
                                {
                                    ConsultaId = consulta.Id,
                                    Entidad = CanonicalConstants.Entidades.Proceso
                                }
                                );
                            }
                            break;
                        case 4:
                            if (context.ParametroConsulta.Where(pc => (pc.ConsultaId == 4) && (pc.Entidad == CanonicalConstants.Entidades.Inspeccion)).ToList().Count == 0)
                            {
                                context.ParametroConsulta.Add
                                (
                                new ParametroConsulta
                                {
                                    ConsultaId = consulta.Id,
                                    Entidad = CanonicalConstants.Entidades.Inspeccion
                                }
                                );
                            }
                            break;
                        case 5:
                            if (context.ParametroConsulta.Where(pc => (pc.ConsultaId == 5) && (pc.Entidad == CanonicalConstants.Entidades.Inspeccion)).ToList().Count == 0)
                            {
                                context.ParametroConsulta.Add
                                (
                                new ParametroConsulta
                                {
                                    ConsultaId = consulta.Id,
                                    Entidad = CanonicalConstants.Entidades.Inspeccion
                                }
                                );
                            }
                            break;
                        case 6:
                            if (context.ParametroConsulta.Where(pc => (pc.ConsultaId == 6) && (pc.Entidad == CanonicalConstants.Entidades.Cliente)).ToList().Count == 0)
                            {
                                context.ParametroConsulta.Add
                                (
                                new ParametroConsulta
                                {
                                    ConsultaId = consulta.Id,
                                    Entidad = CanonicalConstants.Entidades.Cliente
                                }
                                );
                            }
                            break;
                        case 7:
                            if (context.ParametroConsulta.Where(pc => (pc.ConsultaId == 7) && (pc.Entidad == CanonicalConstants.Entidades.MecanizadoTorno)).ToList().Count == 0)
                            {
                                context.ParametroConsulta.Add
                                (
                                new ParametroConsulta
                                {
                                    ConsultaId = consulta.Id,
                                    Entidad = CanonicalConstants.Entidades.MecanizadoTorno
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

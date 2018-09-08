using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa.CanonicalModels
{
    public class CanonicalConstants
    {
        public static string Responsable { get; set; }


        public struct Responsables
        {
            public const string JuanMarquez = "Juan Marquez";
            public const string MiguelAndres = "Miguel Andres";

        }

        public struct Especificacion
        {
            public const string tipo1 = "API 7-2";
            public const string tipo2 = "5B";
            public const string tipo3 = "BH";
        }
        public struct MaquinaAsignada
        {
            public const string tipo1 = "Taladro";
            public const string tipo2 = "Maseta";
            public const string tipo3 = "Tijeras";
        }

        public struct Estados
        {


            public struct OrdenTrabajo
            {
                public const string EnProceso = "En proceso";
                public const string Inactiva = "Inactiva";
                public const string Remision = "Remisión";
                public const string RemisionPendiente = "Remisión pendiente";
            }

            public struct Remision
            {
                public const string Pendiente = "Pendiente";
                public const string Anular = "Anular";
                public const string Cerrar = "Cerrar";
            }

            public struct Conexion_BOX
            {
                public const string estado1 = "CounterBore Fuera de medida";
                public const string estado2 = "Diámetro de CounterBore fuera de rango";
            }

            public struct Conexion_PIG
            {
                public const string estado1 = "Diametro de Relieve Groove fuera de medida";
                public const string estado2 = " Longitud de conexión fueda de medida";
            }

            public struct SolictudOdenTrabjo
            {
                public const string EnProceso = "En proceso";
                public const string Inactiva = "Inactiva";
            }

            public struct Cliente
            {
                public const string Activa = "Activo";
                public const string Inactiva = "Inactivo";
            }

            public struct Proceso
            {

                public struct Inspeccion
                {
                    public const string Completada = "Completada";
                    public const string Pendiente = "Pendiente";
                    public const string EnProceso = "En Proceso";
                    public const string Anulada = "Anulada​";

                }
                public const string EnProceso = "En Proceso";
                public const string Procesado = "Procesado";
                public const string Pendiente = "Pendiente";
                public const string Asignado = "Asignado​";
                public const string Completado = "Completado​";
                public const string Liberado = "Liberado";
                public const string Rechazado = "Rechazado​";

            }
        }

        public struct Tipos
        {

            public struct TipoConexion
            {
                public const string NoAplica = "No aplica";

            }
            public struct Conexion
            {
                public const string NoAplica = "No aplica";

            }
            public struct TubosPatrones
            {
                public const string Pilot = "Pilot";
                public const string Venturi = "Venturi";
            }
            public struct EquiposEmi
            {
                public const string EquiposEmi1 = "157-432k";
                public const string EquiposEmi2 = "132-23dY";
            }
            public struct BobinasMagneticas
            {
                public const string XM5 = "XM5";
                public const string MXX = "MXX";
                public const string M12 = "M12";
                public const string CM22 = "CM22";
                public const string C22A = "C22A";
            }



            public struct TipoFormatoParametro
            {
                public const string Parametro = "Parametro";
                public const string Aletas = "Aletas";
            }
            public struct BloqueEscalonado
            {
                public const string Nivel1 = "1 nivel";
                public const string Nivel2 = "2 niveles";
                public const string Nivel3 = "3 niveles";
                public const string Nivel4 = "4 niveles ";

            }
            public struct TipoInsumo
            {

                public const string SKC_S = "SKC – S";
                public const string SKL_SP2 = "SKL – SP2";
                public const string SKD_S2 = "SKD – S2";

            }
            public struct TiposLiquidos
            {

                public const string Fluorescentes = "Fluorescentes ";
                public const string coloreados = "coloreados";


            }


            public struct FormatoAdendem
            {
                public const string OD = "O.D";
                public const string BEV = "BEV";

            }


            public struct Materiales
            {
                public const string Aluminio = "Aluminio";
                public const string Oro = "Oro";
                public const string Azufre = "Azufre";
                public const string Valvula = "Válvula";
                public const string Motor = "Motor";
                public const string VigaOscilante = "Viga Oscilante";
                public const string Cable = "Cable";
                public const string Oleoducto = "Oleoducto";
                public const string Tubos = "Tubos";
            }

            public struct Formato
            {
                public const string FormatoConexion = "Conexión";
                public const string FormatoOtros = "Otros";
                public const string TipoConexionNC50 = "NC50";
                public const string TipoConexionNK50 = "NK50";
                public const string FormatoConexionPIN = "PIN";
                public const string FormatoConexionBOX = "BOX";

            }
            public struct OrdenTrabajo
            {


                public const string Reparación = "Reparación";
                public const string Alquiler = "Alquiler";
                public const string Fabricación = "Fabricación";
                public const string Otro = "Otro";


            }

            public struct Proceso
            {



                public struct TipoProceso
                {
                    public const string InspeccionEntrada = "Inspección entrada";
                    public const string InspeccionSalida = "Inspección salida";
                    public const string Alistamiento = "Alistamiento";
                    public const string AprobacionSupervisor = "Aprobación supervisor";
                    public const string MecanizadoFresa = "Mecanizado fresa";
                    public const string MecanizadoTorno = "Mecanizado Torno";
                    public const string Rectificado = "Rectificado";
                    public const string Soldadura = "Soldadura";
                    public const string Reasignacion = "Reasignacion";
                    public const string junk = "Junk";
                }

                public struct TipoInspeccion
                {
                    public const string VisualDimensional = "Visual dimensional";

                    public const string MPI = "MPI";
                    public const string LPI = "LPI";
                    public const string UT = "UT";
                    public const string EMI = "EMI";
                    public const string VR = "VR";
                    public const string ConexionFormato = "Conexin Formato";
                    public const string UTA = "UTA";

                }

                public struct TipoSoldadura
                {
                    public const string BaseReconstruccion = "Base reconstrucción";
                    public const string Estructural = "Estructural";
                    public const string Tungsteno = "Tungsteno";
                    public const string PTA = "PTA";
                    public const string Brocas = "Brocas";
                    public const string Otro = "Otro";

                }

                public struct ModoAplicacion
                {
                    public const string Tipo1 = "Tipo 1";
                    public const string Tipo2 = "Tipo 2";
                }

                public struct TamanoCortadores
                {
                    public const string Tamano1 = "Tamaño 1";
                    public const string Tamano2 = "Tamaño 2";
                }

                public struct SubTipoSoldadura
                {
                    public const string Tipo1 = "Tipo 1";
                    public const string Tipo2 = "Tipo 2";
                }

                public struct TipoFundente
                {
                    public const string Tipo1 = "Tipo F 1";
                    public const string Tipo2 = "Tipo F 2";
                }
            }

        }

        public struct Proceso
        {
            public struct EquipoMedicionUtilizado
            {
                public const string Tipo1 = "Tipo1";
                public const string Tipo2 = "Tipo2";
            }
            public struct Instructivo
            {
                public const string Tipo1 = "Tipo1";
                public const string Tipo2 = "Tipo2";
            }
            public struct MaquinaAsignada
            {
                public const string Tipo1 = "Tipo1";
                public const string Tipo2 = "Tipo2";
            }
            public struct Norma
            {
                public const string Tipo1 = "Tipo1";
                public const string Tipo2 = "Tipo2";
            }
            public struct Operario
            {
                public const string Operario1 = "Catalina Ochavez";
                public const string Operario2 = "Julian Milan";
            }
            public struct ProcesoRealizar
            {
                public const string Estampado = "Estampado";
                public const string Pintura = "Pintura";
                public const string BanoQuimico = "Baño químico";
                public const string ProbarGauge = "Probar en gauge";
                public const string ShotPeening = "Shot peening";
                public const string PulirDetalles = "Pulir detalles";
            }

        }

        public struct Solicitud
        {
            public struct Origen
            {
                public const string Telefonica = "Teléfonica";
                public const string CorreoElectronico = "Correo Electrónico";
                public const string Sms = "SMS";
                public const string Chat = "Chat";
                public const string Remision = "Remision";
            }

            public struct Prioridad
            {
                public const string Inmediato = "Inmediato";
                public const string Mediato = "Mediato";
                public const string Normal = "Normal";
                public const string Standby = "Standby";
            }

            public struct Estados
            {
                public const string Rechazado = "Rechazado";
                public const string Liberado = "Liberado";
                public const string Pendiente = "Pendiente";
            }
        }



        public struct OrdenTrabajo
        {
            public const string Inmediato = "Inmediato";
            public const string Mediato = "Mediato";
            public const string Normal = "Normal";
            public const string Standby = "Standby";


        }
        public struct Grupos
        {
            public const string EstadosClientes = "ESTADOS_CLIENTES";
            public const string HerramientasMateriales = "HERRAMIENTAS_MATERIALES";
            public const string OrigenSolicitud = "ORIGEN_SOLICITUD";
            public const string PrioridadSolicitud = "PRIORIDAD_SOLICITUD";
            public const string EstadosSolicitud = "ESTADOS_SOLICITUD";
            public const string TiposFormatos = "TIPOS_FORMATOS";
            public const string Especificacion = "ESPECIFICACION";
            public const string TipoConexion = "TIPO_CONEXION";
            public const string Conexion = "CONEXION";
            public const string EstadosConexionBOX = "ESTADOS_CONEXION_BOX";
            public const string EstadosConexionPIN = "ESTADOS_CONEXION_PIN";
            public const string FormatoAdendum = "FORMATO_ADENDUM";
            public const string TipoFormatoParametro = "TIPO_FORMATO_PARAMETRO";
            public const string TiposBloqueEscalonadoo = "TIPO_BLOQUEESCALONADO";
            public const string TipoInsumo = "TIPO_INSUMO";
            public const string TiposLiquidos = "TIPOS_LIQUIDOS";
            public const string Responsables = "RESPONSABLES";
            public const string EstadosOrdenTrabajo = "ESTADOS_ORDENTRABAJO";
            public const string EstatosSolicitudOrdenTrabajo = "ESTATOS_SOLICITUD_ORDENTRABAJO";
            public const string PrioridadOrdenTrabajo = "PRIORIDAD_ORDENTRABAJO";
            public const string TipoServicioOrdenTrabajo = "TIPO_SERVICIO_ORDEN_TRABAJO";
            public const string EstadosProceso = "ESTADOS_PROCESO";
            public const string EstadosInspeccion = "ESTADOS_INSPECCION";
            public const string EquipoMedicionUtilizado = "EQUIPO_MEDICION_UTILIZADO_PROCESO";
            public const string Estado = "ESTADO_PROCESO";
            public const string Instructivo = "INSTRUCTIVO_PROCESO";
            public const string MaquinaAsignada = "MAQUINA_ASIGNADA_PROCESO";
            public const string Operario = "OPERARIO";
            public const string Norma = "NORMA_PROCESO";
            public const string TipoProceso = "TIPO_PROCESO";
            public const string TipoSoldadura = "TIPO_SOLDADURA_PROCESO";
            public const string TiposInspeccion = "TIPOS_INSPECCION";
            public const string ProcesoRealizar = "PROCESO_REALIZAR";
            public const string FLOAT_VALVE = "FLOAT_VALVE";

            public const string TubosPatrones = "TUBOS_PATRONES";
            public const string EquiposEmi = "EQUIPOS_EMI";
            public const string BobinasMagneticas = "BOBINAS_MAGNETICAS";

            public const string SoldaduraTipoSoldadura = "SOLDADURA_TIPO_SOLDADURA";
            public const string SoldaduraModoAplicacion = "SOLDADURA_MODO_APLICACION";
            public const string SoldaduraTamanoCortadores = "SOLDADURA_TAMANO_CORTADORES";
            public const string SoldaduraTipoFundente = "SOLDADURA_TIPO_FUNDENTE";

            public const string EstadosRemision = "ESTADOS_REMISION";

        }

        public struct Entidades
        {
            public const string Cliente = "CLIENTE";
            public const string Materiales = "MATERIALES";
            public const string Formato = "FORMATO";
            public const string Solicitud = "SOLICITUD";
            public const string MecanizadoTorno = "MECANIZADO_TORNO";
            public const string OrdenTrabajo = "ORDEN_TRABAJO";
            public const string Proceso = "PROCESO";
            public const string InspeccionConexion = "INSPECCION_CONEXION";
            public const string Inspeccion = "INSPECCION";
            public const string Remision = "REMISION";

        }

        public struct Excepciones
        {
            public const string EstadoNoEncontrado = "El estado no se ha encontrado";
            public const string MaterialNoEncontrado = "El material no se ha encontrado";
            public const string OrigenSolicitudNoEncontrado = "La origen de la solicitud no se ha encontrado";
            public const string PrioridadSolicitudNoEncontrado = "La prioridad de la solicitud no se ha encontrado";
            public const string EstadoSolicitudNoEncontrado = "El estado no se ha encontrado";
        }
    }
}

﻿using System;
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
            public const string Prueba = "Prueba";
            public const string Prueba1 = "Prueba1";
        }

        public struct Estados
        {


            public struct OrdenTrabajo
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
                public const string Activa = "Activo";
                public const string Inactiva = "Inactivo";
            }
        }

        public struct Tipos
        {
            public struct FormatoAdendem
            {
                public const string Tipo1 = "Tipo1";
                public const string Tipo2 = "Tipo1";

            }


            public struct Materiales
            {
                public const string Prueba = "Prueba";
                public const string Prueba1 = "Prueba1";
                public const string Prueba2 = "Prueba2";
            }

            public struct Formato
            {
                public const string FormatoConexion = "Conexión";
                public const string FormatoOtros = "Otros";
                public const string TipoConexionNC50 = "NC50";
                public const string TipoConexionNK50 = "NK50";
                public const string FormatoConexionPIG = "PIG";
                public const string FormatoConexionBOX = "BOX";

            }
            public struct OrdenTrabajo
            {
                public const string Tipo1 = "Tipo1";
                public const string Tipo2 = "Tipo2";

            }

            public struct Proceso
            {

     
               
                public struct TipoProceso
                {
                    public const string Tipo1 = "Tipo1";
                    public const string Tipo2 = "Tipo2";
                }
               
                
                public struct TipoSoldadura
                {
                    public const string Tipo1 = "Tipo1";
                    public const string Tipo2 = "Tipo2";
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
            public const string FormatoAdendum = "FORMATO_ADENDUM";


            public const string Responsables = "RESPONSABLES";
            public const string EstadosOrdenTrabajo = "ESTADOS_ORDENTRABAJO";
            public const string PrioridadOrdenTrabajo = "PRIORIDAD_ORDENTRABAJO";
            public const string TipoServicioOrdenTrabajo = "TIPO_SERVICIO_ORDEN_TRABAJO";
            public const string EstadosProceso = "ESTADOS_PROCESO";
            public const string EquipoMedicionUtilizado = "EQUIPO_MEDICION_UTILIZADO_PROCESO";
            public const string Estado = "ESTADO_PROCESO";
            public const string Instructivo = "INSTRUCTIVO_PROCESO";
            public const string MaquinaAsignada = "MAQUINA_ASIGNADA_PROCESO";
            public const string Norma = "NORMA_PROCESO";
            public const string TipoProceso = "TIPO_PROCESO";
            public const string TipoSoldadura = "TIPO_SOLDADURA_PROCESO";



        }

        public struct Entidades
        {
            public const string Cliente = "CLIENTE";
            public const string Materiales = "MATERIALES";
            public const string Formato = "FORMATO";
            public const string Solicitud = "SOLICITUD";
            public const string OrdenTrabajo = "ORDEN_TRABAJO";
            public const string Proceso = "PROCESO";

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

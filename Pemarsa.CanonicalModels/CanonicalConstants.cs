using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa.CanonicalModels
{
    public class CanonicalConstants
    {


        public struct Especificacion
        {
            public const string Prueba = "Prueba";
            public const string Prueba1 = "Prueba1";
        }

        public struct Estados
        {
            public struct Cliente
            {
                public const string Activa = "Activo";
                public const string Inactiva = "Inactivo";
            }
        }

        public struct Tipos
        {
            public struct Materiales
            {
                public const string Prueba = "Prueba";
                public const string Prueba1 = "Prueba1";
                public const string Prueba2 = "Prueba2";
            }

            public struct Formato
            {
                public const string Conexion = "Conexión";
                public const string Otros = "Otros";
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

        public struct Grupos
        {
            public const string EstadosClientes = "ESTADOS_CLIENTES";
            public const string HerramientasMateriales = "HERRAMIENTAS_MATERIALES";
            public const string OrigenSolicitud = "ORIGEN_SOLICITUD";
            public const string PrioridadSolicitud = "PRIORIDAD_SOLICITUD";
            public const string EstadosSolicitud = "ESTADOS_SOLICITUD";
            public const string TiposFormatos = "TIPOS_FORMATOS";
            public const string Especificacion = "ESPECIFICACION";

        }

        public struct Entidades
        {
            public const string Cliente = "CLIENTE";
            public const string Materiales = "MATERIALES";
            public const string Solicitud = "SOLICITUD";
            public const string Formato = "FORMATO";
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

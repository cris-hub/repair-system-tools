using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa.CanonicalModels
{
    public class CanonicalConstants
    {
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
        }

        public struct Grupos
        {
            public const string EstadosClientes = "ESTADOS_CLIENTES";
            public const string HerramientasMateriales = "HERRAMIENTAS_MATERIALES";
        }

        public struct Entidades
        {
            public const string Cliente = "CLIENTE";
            public const string Materiales = "MATERIALES";
        }

        public struct Excepciones
        {
            public const string EstadoNoEncontrado = "El estado no se ha encontrado";
            public const string MaterialNoEncontrado = "El material no se ha encontrado";
        }
    }
}

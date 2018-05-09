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

        public struct Grupos
        {
            public const string EstadosClientes = "ESTADOS_CLIENTES";
        }

        public struct Entidades
        {
            public const string Cliente = "CLIENTE";  
        }

        public struct Excepciones
        {
            public const string EstadoNoEncontrado = "El estado no se ha encontrado";
        }
    }
}

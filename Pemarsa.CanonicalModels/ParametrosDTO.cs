using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa.CanonicalModels
{
    public class ParametrosDTO : Paginacion
    {
        public int? IdCliente { get; set; }
        public string RazonSocial { get; set; }
        public string Nit { get; set; }
        public string Telefono { get; set; }
        public string Direccion { get; set; }
        public string Estado { get; set; }
        public string Codigo { get; set; }
        public string FechaCreacion { get; set; }
        public string FormatoAdjunto { get; set; }
        public string HerramientaId { get; set; }
        public string Conexion { get; set; }
        public string TipoConexion { get; set; }
        public string HerramientaGuid { get; set; }
    }
}

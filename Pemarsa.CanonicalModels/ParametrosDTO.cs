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
    }
}

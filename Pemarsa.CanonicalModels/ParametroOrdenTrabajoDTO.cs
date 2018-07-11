using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa.CanonicalModels
{
    public class ParametroOrdenTrabajoDTO : Paginacion
    {
        public string NumeroOIT { get; set; }
        public string FechaCreacion { get; set; }
        public string FechaFinalizacion { get; set; }
        public int Estado { get; set; }
        public int Responsable { get; set; }
        public int TipoServio { get; set; }
        public string Remision { get; set; }

    }
}

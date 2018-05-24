using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa.CanonicalModels
{
    public class ParametrosSolicitudOrdenTrabajoDTO : Paginacion
    {
        public string Responsable { get; set; }
        public string Cliente { get; set; }
        public string ClienteLinea { get; set; }
        public string Prioridad { get; set; }
        public string DetallesSolicitud { get; set; }
        public string Estado { get; set; }
    }
}

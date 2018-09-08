using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa.CanonicalModels
{
    public class RemisionPendienteFiltroDTO : Paginacion
    {
        public string RemisionId { get; set; }
        public Guid GuidRemision { get; set; }
        public string OrdenTrabajoId { get; set; }
        public string Cliente { get; set; }
        public string Linea { get; set; }
        public string Herramienta { get; set; }
        public string Serial { get; set; }
        public string DetalleSolicitud { get; set; }
        public string Estado { get; set; }
        public DateTime Fecha { get; set; }
    }
}

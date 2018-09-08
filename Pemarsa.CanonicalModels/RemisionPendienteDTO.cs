using System;

namespace Pemarsa.CanonicalModels
{
    public class RemisionPendienteDTO 
    {
        public int RemisionId { get; set; }
        public Guid GuidRemision { get; set; }
        public int OrdenTrabajoId { get; set; }
        public string Cliente { get; set; }
        public string Linea { get; set; }
        public string Herramienta { get; set; }
        public string Serial { get; set; }
        public string DetalleSolicitud { get; set; }
        public string Estado { get; set; }
        public DateTime Fecha { get; set; }
    }
}

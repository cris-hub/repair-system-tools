using System;

namespace Pemarsa.CanonicalModels
{
    public class OrdenTrabajoRemisionFiltroDTO : Paginacion
    {
        public string Id { get; set; }
        public Guid Guid { get; set; }
        public string Cliente { get; set; }
        public string Linea { get; set; }
        public string Herramienta { get; set; }
        public string Fecha { get; set; }
    }
}

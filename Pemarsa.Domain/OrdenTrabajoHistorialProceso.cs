using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pemarsa.Domain
{
    public class OrdenTrabajoHistorialProceso
    {
        [Key]
        public int Id { get; set; }
        public int EstadoProceso { get; set; }

        public DateTime FechaProceso { get; set; }

        public int LiberaProcesoAnteriorId { get; set; }

        public string Observaciones { get; set; }

        public int OperarioId { get; set; }

        public int TipoProcesoId { get; set; }

        public int TipoProcesoAnteriorId { get; set; }
    }
}

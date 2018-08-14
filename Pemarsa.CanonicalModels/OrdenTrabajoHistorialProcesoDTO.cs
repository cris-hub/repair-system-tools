using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pemarsa.Domain
{
    public class OrdenTrabajoHistorialProcesoDTO
    {
        
        
        public int EstadoProceso { get; set; }

        public DateTime? FechaFinalizacion { get; set; }

        public Guid LiberaProcesoAnteriorGuid { get; set; }
        public string NombreLiberaProcesoAnterior { get; set; }


        public string Observaciones { get; set; }

        public Guid OperarioId { get; set; }
        public string NombreOperario { get; set; }

        public int? TipoProcesoId { get; set; }

        public int? TipoProcesoAnteriorId { get; set; }
    }
}

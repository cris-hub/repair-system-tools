using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class RemisionDetalle
    {


        [ForeignKey("OrdenTrabajo")]
        public int OrdenTrabajoId { get; set; }
        public virtual OrdenTrabajo OrdenTrabajo { get; set; }

        [ForeignKey("Remision")]
        public int RemisionId { get; set; }
        public virtual Remision Remision { get; set; }
    }
}

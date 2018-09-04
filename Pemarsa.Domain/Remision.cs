using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class Remision : Entity
    {

        [ForeignKey("Estado")]
        public int EstadoId { get; set; }
        public virtual Catalogo Estado { get; set; }

        [ForeignKey("ImagenFactura")]
        public int ImagenFacturaId { get; set; }
        public virtual DocumentoAdjunto ImagenFactura { get; set; }

        [ForeignKey("ImagenRemision")]
        public int ImagenRemisionId { get; set; }
        public virtual DocumentoAdjunto ImagenRemision { get; set; }

        [ForeignKey("OrdenTrabajo")]
        public int OrdenTrabajoId { get; set; }
        public virtual OrdenTrabajo OrdenTrabajo { get; set; }

        public int NumeroFactura { get; set; }
        public int ValorFactura { get; set; }
    }
}

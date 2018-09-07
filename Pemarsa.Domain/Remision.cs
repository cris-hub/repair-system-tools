using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class Remision : Entity
    {

        [ForeignKey("Estado")]
        public int EstadoId { get; set; }
        public virtual Catalogo Estado { get; set; }

        [ForeignKey("ImagenFactura")]
        public int? ImagenFacturaId { get; set; }
        public virtual DocumentoAdjunto ImagenFactura { get; set; }

        [ForeignKey("ImagenRemision")]
        public int? ImagenRemisionId { get; set; }
        public virtual DocumentoAdjunto ImagenRemision { get; set; }

        public int? NumeroFactura { get; set; }
        public int? ValorFactura { get; set; }
        public string UsuarioAnula { get; set; }
        public DateTime? FechaAnulacion { get; set; }
        public string Observacion { get; set; }

        public IEnumerable<RemisionDetalle> RemisionDetalle { get; set; }
    }
}

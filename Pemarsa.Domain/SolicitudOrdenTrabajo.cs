using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class SolicitudOrdenTrabajo : Entity
    {
        [Required]
        public int Cantidad { get; set; }

        [Required]
        public int CantidadInspeccionar { get; set; }

        [Required]
        public string Contacto { get; set; }

        public int Cotizacion { get; set; }

        [Required]
        public string DetallesSolicitud { get; set; }
        
        [ForeignKey("Cliente")]
        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; }

        [ForeignKey("Estado")]
        public int EstadoId { get; set; }
        public virtual Catalogo Estado { get; set; }

        [Required, ForeignKey("ClienteLinea")]
        public int LineaId { get; set; }
        public virtual ClienteLinea ClienteLinea { get; set; }

        [Required, ForeignKey("OrigenSolicitud")]
        public int OrigenSolicitudId { get; set; }
        public virtual Catalogo OrigenSolicitud { get; set; }
        
        [Required, ForeignKey("Prioridad")]
        public int PrioridadId { get; set; }
        public virtual Catalogo Prioridad { get; set; }
        
        [ForeignKey("Responsable")]
        public int? ResponsableId { get; set; }
        public virtual Catalogo Responsable { get; set; }
        
        [ForeignKey("Remision")]
        public int? RemisionId { get; set; }
        public virtual DocumentoAdjunto Remision { get; set; }

        public virtual ICollection<SolicitudOrdenTrabajoAnexos> Anexos { get; set; }

    }
}

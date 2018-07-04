using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class OrdenTrabajoHistorialModificacion
    {
        [Required]
        public string Campo { get; set; }

        [Required]
        public DateTime FechaModificacion { get; set; }

        [Required]
        public Guid Guid { get; set; }

        [Required]
        public Guid GuidUsuarioModifica { get; set; }

        [Required]
        public int Id { get; set; }

        [Required]
        public string UsuarioModifica { get; set; }

        [Required]
        public string ValorAnterior { get; set; }

        [Required, ForeignKey("SolicitudOrdenTrabajo")]
        public int SolicitudOrdenTrabajoId { get; set; }
        
        public virtual SolicitudOrdenTrabajo SolicitudOrdenTrabajo { get; set; }
    }
}

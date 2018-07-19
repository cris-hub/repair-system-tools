using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class OrdenTrabajoAnexos
    {
        [Required]
        public bool Estado { get; set; }

        [Required, ForeignKey("OrdenTrabajo")]
        public int OrdenTrabajoId { get; set; }
        public virtual OrdenTrabajo OrdenTrabajo { get; set; }

        [Required, ForeignKey("DocumentoAdjunto")]
        public int DocumentoAdjuntoId { get; set; }
        public virtual DocumentoAdjunto DocumentoAdjunto { get; set; }
    }
}

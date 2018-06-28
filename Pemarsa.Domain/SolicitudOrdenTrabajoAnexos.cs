using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class SolicitudOrdenTrabajoAnexos
    {
    

        [Required]
        public bool Estado { get; set; }
        public int SolicitudOrdenTrabajoId { get; set; }
        public virtual SolicitudOrdenTrabajo SolicitudOrdenTrabajo { get; set; }
        public int DocumentoAdjuntoId { get; set; }
        public virtual DocumentoAdjunto DocumentoAdjunto { get; set; }
    }
}

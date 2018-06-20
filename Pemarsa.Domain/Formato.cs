using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class Formato : Entity
    {

        [Required]
        public ICollection<DocumentoAdjunto> Planos { get; set; }

        [Required, ForeignKey("TipoFormato")]
        public int TipoFormatoId { get; set; }
        public virtual Catalogo TipoFormato { get; set; }

        public string Codigo { get; set; }

        public string TPI { get; set; }

        public string TPF { get; set; }

        [ForeignKey("Herramienta")]
        public int? HerramientaId { get; set; }
        public virtual Herramienta Herramienta { get; set; }

        public string Especificacion { get; set; }

     

    }
}

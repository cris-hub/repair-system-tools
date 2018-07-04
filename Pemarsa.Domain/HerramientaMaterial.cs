using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class HerramientaMaterial : Entity
    {
        [Required]
        public bool Estado { get; set; }

        [ForeignKey("Herramienta")]
        public int HerramientaId { get; set; }
        public virtual Herramienta Herramienta { get; set; }

        [ForeignKey("Material")]
        public int MaterialId { get; set; }
        public virtual Catalogo Material { get; set; }
    }
}

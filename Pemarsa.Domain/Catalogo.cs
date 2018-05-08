using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class Catalogo
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid Guid { get; set; }

        [Required]
        public string Valor { get; set; }

        [Required]
        public string Grupo { get; set; }
        
        public string Simbolo { get; set; }

        public bool? Estado { get; set; }

        [ForeignKey("Catalogo")]
        public int? CatalogoId { get; set; }        

        public int? Dia { get; set; }

        public virtual IEnumerable<Catalogo> SubCatalogos { get; set; }

    }
}

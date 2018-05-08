using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class ParametroCatalogo
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Parametro")]
        public string Entidad { get; set; }

        [ForeignKey("Catalogo")]
        public int CatalogoId { get; set; }

        public virtual Parametro Parametro { get; set; }
        public virtual Catalogo  Catalogo { get; set; }
    }
}

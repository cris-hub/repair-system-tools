using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class FormatoAdendum
    {
        [Key]
        public int Id { get; set; }

        public int Posicion { get; set; }


        [ForeignKey("Tipo")]
        public int? TipoId { get; set; }

        public virtual Catalogo Tipo { get; set; }

        public string Valor { get; set; }


        [ForeignKey("Formato")]
        public int? FormatoId { get; set; }
        public virtual Formato Formato { get; set; }

    }
}

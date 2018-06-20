using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class FormatoParametro
    {

        public string DimensionEspecifica { get; set; }
        [Key]
        public int Id { get; set; }
        public string Item { get; set; }
        public string Parametro { get; set; }
        public string ToleranciaMax { get; set; }
        public string ToleranciaMin { get; set; }



        [ForeignKey("Formato")]
        public int? FormatoId { get; set; }
        public virtual Formato Formato { get; set; }
    }
}

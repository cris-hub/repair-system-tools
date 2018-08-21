using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class FormatoParametro
    {

        [Key]
        public int Id { get; set; }
        public string DimensionEspecifica { get; set; }
        public string Item { get; set; }
        public string Parametro { get; set; }
        public string ToleranciaMax { get; set; }
        public string ToleranciaMin { get; set; }


        


    }
}

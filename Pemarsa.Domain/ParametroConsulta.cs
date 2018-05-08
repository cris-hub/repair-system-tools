using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class ParametroConsulta
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Parametro")]
        public string Entidad { get; set; }

        [ForeignKey("Consulta")]
        public int ConsultaId { get; set; }

        public virtual Parametro Parametro { get; set; }
        public virtual Consulta  Consulta { get; set; }
    }
}

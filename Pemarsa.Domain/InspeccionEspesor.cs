using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class InspeccionEspesor : Entity
    {
        public int Desviacion { get; set; }

        public int EspesorActual { get; set; }

        public int EspesorNominal { get; set; }

        [Required, ForeignKey("Inspeccion")]
        public int InspeccionId { get; set; }
        public virtual Inspeccion Inspeccion { get; set; }
    }
}

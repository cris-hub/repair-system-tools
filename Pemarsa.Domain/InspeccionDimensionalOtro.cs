using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class InspeccionDimensionalOtro :Entity
    {
        public bool Conformidad { get; set; }

        public string MedidaActual { get; set; }

        public string MedidaNominal { get; set; }

        public string Tolerancia { get; set; }

        [Required, ForeignKey("Inspeccion")]
        public int InspeccionId { get; set; }
        public virtual Inspeccion Inspeccion { get; set; }
    }
}

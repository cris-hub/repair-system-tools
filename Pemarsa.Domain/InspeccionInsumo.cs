using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class InspeccionInsumo : Entity
    {
        public int? NumeroLote { get; set; }


        [ForeignKey("TipoInsumo")]
        public int? TipoInsumoId { get; set; }
        public virtual Catalogo TipoInsumo { get; set; }

        [ForeignKey("Inspeccion")]
        public int InspeccionId { get; set; }
        public virtual Inspeccion Inspeccion { get; set; }
    }
}

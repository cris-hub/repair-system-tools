using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class InspeccionEquipoUtilizado
    {
        [ForeignKey("EquipoUtilizado")]
        public int EquipoUtilizadoId { get; set; }
        public virtual Catalogo EquipoUtilizado { get; set; }

        [ForeignKey("Inspeccion")]
        public int InspeccionId { get; set; }
        public virtual Inspeccion Inspeccion { get; set; }
    }
}
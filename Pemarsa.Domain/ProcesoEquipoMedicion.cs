using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class ProcesoEquipoMedicion
    {
        public string ValorEquipoMedicion { get; set; }

        [Required, ForeignKey("EquipoMedicion")]
        public int IdEquipoMedicion { get; set; }
        public virtual Catalogo EquipoMedicion { get; set; }

        [Required, ForeignKey("Proceso")]
        public int ProcesoId { get; set; }
        public virtual Proceso Proceso { get; set; }
    }
}

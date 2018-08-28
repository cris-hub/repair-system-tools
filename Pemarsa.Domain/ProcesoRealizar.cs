using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class ProcesoRealizar
    {
        [Required]
        public string Valor { get; set; }

        [Required,ForeignKey("TipoProceso")]
        public int TipoProcesoId { get; set; }
        public virtual Catalogo TipoProceso { get; set; }

        [Required, ForeignKey("Proceso")]
        public int ProcesoId { get; set; }
        public virtual Proceso Proceso { get; set; }
    }
}

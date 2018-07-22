using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class InspeccionFotos
    {

        [Required, ForeignKey("DocumentoAdjunto")]
        public int DocumentoAdjuntoId { get; set; }
        public virtual DocumentoAdjunto DocumentoAdjunto { get; set; }

        [Required, ForeignKey("Inspeccion")]
        public int InspeccionId { get; set; }
        public virtual Inspeccion Inspeccion { get; set; }
        [Required]
        public int Pieza { get; set; }

    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class DocumentoAdjunto : Entity
    {
        [Required, MaxLength(45)]
        public string Nombre { get; set; }

        [MaxLength(250)]
        public string Descripcion { get; set; }

        [Required, MaxLength(50)]
        public string NombreArchivo { get; set; }

        [Required]
        public string Ruta { get; set; }

        [Required]
        public string Extension { get; set; }
        
        [NotMapped]
        public string Stream { get; set; }

        [ForeignKey("Formato")]
        public int? FormatoId { get; set; }
        public virtual Formato Formato { get; set; }

    }
}

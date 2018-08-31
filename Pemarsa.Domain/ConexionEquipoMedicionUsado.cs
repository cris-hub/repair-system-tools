using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class ConexionEquipoMedicionUsado
    {
        [ForeignKey("InspeccionConexionFormato")]
        public int? InspeccionConexionFormatoId { get; set; }
        public virtual InspeccionConexionFormato InspeccionConexionFormato { get; set; }

        [ForeignKey("EquipoMedicion")]
        public int? EquipoMedicionId { get; set; }
        public virtual Catalogo EquipoMedicion { get; set; }

    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class Formato : Entity
    {

        [Required]
        public ICollection<DocumentoAdjunto> Planos { get; set; }

        public int? AdjuntoId { get; set; }
        public DocumentoAdjunto Adjunto { get; set; }


        [Required, ForeignKey("TipoFormato")]
        public int TipoFormatoId { get; set; }
        public virtual Catalogo TipoFormato { get; set; }

        public string Codigo { get; set; }

        public string TPI { get; set; }

        public string TPF { get; set; }

        public int Version { get; set; }

        [ForeignKey("Herramienta")]
        public int? HerramientaId { get; set; }
        public virtual Herramienta Herramienta { get; set; }

        public bool? EsFormatoAdjunto { get; set; }

        [ForeignKey("Especificacion")]
        public int? EspecificacionId { get; set; }
        public virtual Catalogo Especificacion { get; set; }

        [ForeignKey("TiposConexiones")]
        public int? TiposConexionesId { get; set; }
        public virtual Catalogo TiposConexiones { get; set; }

        [ForeignKey("Conexion")]
        public int? ConexionId { get; set; }
        public virtual Catalogo Conexion { get; set; }


        public virtual IEnumerable<FormatoAdendum> Adendum { get; set; }


        public virtual IEnumerable<FormatoFormatoParametro> FormatoFormatoParametro { get; set; }







    }
}

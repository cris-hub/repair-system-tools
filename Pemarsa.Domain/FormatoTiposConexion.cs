using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pemarsa.Domain
{
    public class FormatoTiposConexion
    {
        [Key]
        public int Id { get; set; }
        public int? FormatoId { get; set; }
        public virtual Formato Formato { get; set; }
        public int TipoConexionId { get; set; }
        public virtual Catalogo TipoConexion { get; set; }

        public bool Estado { get; set; }

    }
}

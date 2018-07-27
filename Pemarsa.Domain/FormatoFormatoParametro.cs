using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class FormatoFormatoParametro
    {
        [ForeignKey("Formato")]
        public int FormatoId { get; set; }
        public virtual Formato Formato { get; set; }

        [ForeignKey("TipoFormatoParametro")]
        public int TipoFormatoParametroId { get; set; }
        public virtual Catalogo TipoFormatoParametro { get; set; }

        [ForeignKey("FormatoParametro")]
        public int FormatoParametroId { get; set; }
        public virtual FormatoParametro FormatoParametro { get; set; }

    }
}

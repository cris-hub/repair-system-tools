using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class DetalleSoldadura
    {
        public int Amperaje { get; set; }

        public int CantidadSoldadura { get; set; }

        public int Lote { get; set; }

        [Required, ForeignKey("ModoAplicacion")]
        public int ModoAplicacionId { get; set; }

        public int PresionAcetileno { get; set; }

        public int PresionGas1 { get; set; }

        public int PresionGas2 { get; set; }

        public int PresionOxigeno { get; set; }

        [Required, ForeignKey("TamanoCortadores")]
        public int TamañoCortadoresId { get; set; }

        public int TemperaturaDespuesProceso { get; set; }

        public int TemperaturaDuranteProceso { get; set; }

        public int TemperaturaPrecalentamiento { get; set; }

        public int TiempoAplicacion { get; set; }

        public int TiempoPrecalentamiento { get; set; }

        [Required, ForeignKey("TipoFuente")]
        public int TipoFuenteId { get; set; }

        [Required, ForeignKey("TipoSoldadura");]
        public int TipoSoldaduraId { get; set; }

        public int Voltaje { get; set; }

        [Required, ForeignKey("Proceso")]
        public int ProcesoId { get; set; }



        public virtual Catalogo ModoAplicacion { get; set; }

        public virtual Catalogo TamanoCortadores { get; set; }

        public virtual Catalogo TipoFuente { get; set; }

        public virtual Catalogo TipoSoldadura { get; set; }

        public virtual Proceso Proceso { get; set; }
    }
}

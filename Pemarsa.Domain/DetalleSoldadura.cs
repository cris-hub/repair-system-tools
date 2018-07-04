using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class DetalleSoldadura : Entity
    {
        public int Amperaje { get; set; }

        public int CantidadSoldadura { get; set; }

        public int Lote { get; set; }

        public int PresionAcetileno { get; set; }

        public int PresionGas1 { get; set; }

        public int PresionGas2 { get; set; }

        public int PresionOxigeno { get; set; }

        public int TemperaturaDespuesProceso { get; set; }

        public int TemperaturaDuranteProceso { get; set; }

        public int TemperaturaPrecalentamiento { get; set; }

        public int TiempoAplicacion { get; set; }

        public int TiempoPrecalentamiento { get; set; }

        public int Voltaje { get; set; }

        #region Catalogos
        [ForeignKey("ModoAplicacion")]
        public int ModoAplicacionId { get; set; }
        public virtual Catalogo ModoAplicacion { get; set; }

        [ForeignKey("TamanoCortadores")]
        public int TamañoCortadoresId { get; set; }
        public virtual Catalogo TamanoCortadores { get; set; }

        [ForeignKey("TipoFuente")]
        public int TipoFuenteId { get; set; }
        public virtual Catalogo TipoFuente { get; set; }

        [ForeignKey("TipoSoldadura")]
        public int TipoSoldaduraId { get; set; }
        public virtual Catalogo TipoSoldadura { get; set; }

        [ForeignKey("Proceso")]
        public int ProcesoId { get; set; }
        public virtual Proceso Proceso { get; set; }
        #endregion
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class InspeccionConexion : Entity
    {
        public int NumeroConexion { get; set; }

        public string Observaciones { get; set; }

        #region catalogos
        [Required, ForeignKey("Conexion")]
        public int ConexionId { get; set; }
        public virtual Catalogo Conexion { get; set; }

        [Required, ForeignKey("Estado")]
        public int EstadoId { get; set; }
        public virtual Catalogo Estado { get; set; }

        [Required, ForeignKey("TipoConexion")]
        public int TipoConexionId { get; set; }
        public virtual Catalogo TipoConexion { get; set; }
        #endregion


        [Required, ForeignKey("Inspeccion")]
        public int InspeccionId { get; set; }
        public virtual Inspeccion Inspeccion { get; set; }

   

    }
}

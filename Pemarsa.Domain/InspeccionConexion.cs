using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class InspeccionConexion : Entity
    {
        [Required, ForeignKey("Conexion")]
        public int ConexionId { get; set; }

        [Required, ForeignKey("Estado")]
        public int EstadoId { get; set; }

        [Required, ForeignKey("InspeccionConexionFormato")]
        public int FormatoId { get; set; }

        public int NumeroConexion { get; set; }

        public string Observaciones { get; set; }

        [Required, ForeignKey("TipoConexion")]
        public int TipoConexionId { get; set; }



        public virtual Catalogo Conexion { get; set; }

        public virtual Catalogo Estado { get; set; }

        public virtual InspeccionConexionFormato InspeccionConexionFormato;

        public virtual Catalogo TipoConexion { get; set; }
    }
}

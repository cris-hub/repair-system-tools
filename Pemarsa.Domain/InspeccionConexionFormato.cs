using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class InspeccionConexionFormato
    {
        public int AdendumId { get; set; }//falta crear clase InspeccionConexionFormatoAdendum

        [Required, ForeignKey("Estado")]
        public int ClienteId { get; set; }

        [Required, ForeignKey("EquipoUsado")]
        public int EquipoUsadoId { get; set; }

        public bool EsBoreBack { get; set; }

        public bool EsCw { get; set; }

        public bool EsEstampado { get; set; }

        public bool EsStandBlasting { get; set; }

        public bool EstaConforme { get; set; }

        public int FlatBoardId { get; set; }

        public int FlatBoardLongitud { get; set; }

        [Required, ForeignKey("FloatValve")]
        public int FloatValveId { get; set; }

        [Required, ForeignKey("FormatoAdjunto")]
        public int FormatoAdjuntoId { get; set; }

        public Guid GuidUsuarioElabora { get; set; }

        [Required, ForeignKey("Herramienta")]
        public int HerramientaId { get; set; }

        public int Id { get; set; }

        public string NombreUsuarioElabora { get; set; }

        public int Od { get; set; }

        public int OIT { get; set; }

        public int Parametros { get; set; }//falta crear clase InspeccionConexionFormatoParametro

        public string Serial { get; set; }



        public virtual Cliente Cliente { get; set; }

        public virtual Catalogo EquipoUsado { get; set; }

        public virtual Catalogo FloatValve { get; set; }

        public virtual DocumentoAdjunto FormatoAdjunto { get; set; }

        public virtual Herramienta Herramienta { get; set; }
    }
}

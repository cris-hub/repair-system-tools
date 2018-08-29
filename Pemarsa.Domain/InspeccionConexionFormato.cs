using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class InspeccionConexionFormato
    {


        [Key]
        public int Id { get; set; }

        public bool EsBoreBack { get; set; }

        public bool EsCw { get; set; }

        public bool EsEstampado { get; set; }

        public bool EsStandBlasting { get; set; }

        public bool EstaConforme { get; set; }

        public int FloatBoardId { get; set; }

        public int FloatBoardLongitud { get; set; }

        public Guid GuidUsuarioElabora { get; set; }

        public int Od { get; set; }

        public int OIT { get; set; }

        public string NombreUsuarioElabora { get; set; }

        public string Serial { get; set; }

        public int IdAsignaUsuario { get; set; }

        [ForeignKey("FloatValve")]
        public int FloatValveId { get; set; }
        public virtual Catalogo FloatValve { get; set; }

        [ForeignKey("EquipoUsado")]
        public int EquipoUsadoId { get; set; }
        public virtual Catalogo EquipoUsado { get; set; }



        
        

        
     



        [ForeignKey("Cliente")]
        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; }

        [ForeignKey("FormatoAdjunto")]
        public int FormatoAdjuntoId { get; set; }
        public virtual DocumentoAdjunto FormatoAdjunto { get; set; }

        [ForeignKey("Herramienta")]
        public int HerramientaId { get; set; }
        public virtual Herramienta Herramienta { get; set; }


        public virtual IEnumerable<InspeccionConexionFormatoParametros> InspeccionConexionFormatoParametros { get; set; }
        public virtual IEnumerable<InspeccionConexionFormatoAdendum> InspeccionConexionFormatoAdendum { get; set; }

    }
}

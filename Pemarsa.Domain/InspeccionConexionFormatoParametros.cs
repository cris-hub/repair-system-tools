using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class InspeccionConexionFormatoParametros
    {
        public int Id { get; set; }
        public bool EstaConforme { get; set; }

        [ForeignKey("FormatoParametro")]
        public int FormatoParametroId { get; set; }
        public FormatoParametro FormatoParametro { get; set; }
    }
}
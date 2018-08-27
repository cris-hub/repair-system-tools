using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class InspeccionConexionFormatoAdendum
    {
        public int Id { get; set; }

        [ForeignKey("FormatoAdendum")]

        public int FormatoAdendumId { get; set; }
        public FormatoAdendum FormatoAdendum { get; set; }
        
    }
}
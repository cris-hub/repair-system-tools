using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class ClienteLinea : Entity
    {
        [Required]
        public string Nombre { get; set; }
        [Required, ForeignKey("Cliente")]
        public int ClienteId { get; set; }
        public List<ClienteLinea> Direcciones { get; set; }
        public virtual Cliente Cliente { get; set; }
    }
}

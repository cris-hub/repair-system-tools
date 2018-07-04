using System;
using System.ComponentModel.DataAnnotations;

namespace Pemarsa.Domain
{
    public class Entity
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public Guid Guid { get; set; } = Guid.NewGuid();

        [Required]
        public Guid GuidUsuarioCrea { get; set; } = Guid.NewGuid();

        public Guid? GuidUsuarioModifica { get; set; } = Guid.NewGuid();

        [Required]
        public Guid GuidOrganizacion { get; set; } = Guid.NewGuid();

        [Required]
        public DateTime FechaRegistro { get; set; } = DateTime.Now;

        public DateTime? FechaModifica { get; set; }

        [Required, MaxLength(60)]
        public string NombreUsuarioCrea { get; set; } = "admin";

        [MaxLength(60)]
        public string NombreUsuarioModifica { get; set; } 
    }
}

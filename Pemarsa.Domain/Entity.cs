using System;
using System.ComponentModel.DataAnnotations;

namespace Pemarsa.Domain
{
    public class Entity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid Guid { get; set; }

        [Required]
        public Guid GuidUsuarioCrea { get; set; }

        public Guid? GuidUsuarioModifica { get; set; }

        [Required]
        public Guid GuidOrganizacion { get; set; }

        [Required]
        public DateTime FechaRegistro { get; set; }

        public DateTime? FechaModifica { get; set; }

        [Required, MaxLength(60)]
        public string NombreUsuarioCrea { get; set; }

        [MaxLength(60)]
        public string NombreUsuarioModifica { get; set; }

        public Entity()
        {
            this.Guid = Guid.NewGuid();
            this.FechaRegistro = DateTime.Now;
        }
    }
}

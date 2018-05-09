using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class Cliente : Entity
    {
        [Required]
        public string ContactoCorreo { get; set; }

        [Required, MinLength(400)]
        public string ContactoNombre { get; set; }

        [Required]
        public string ContactoTelefono { get; set; }

        [Required]
        public string Direccion { get; set; }

        [Required, ForeignKey("Estado")]
        public int EstadoId { get; set; }

        [Required]
        public Guid GuidResponsable { get; set; }

        [Required]
        public IEnumerable<ClienteLinea> Lineas { get; set; }

        [Required]
        public string NickName { get; set; }

        [Required]
        public string Nit { get; set; }

        [Required]
        public string NombreResponsable { get; set; }

        [Required]
        public string RazonSocial { get; set; }

        [Required]
        public string Telefono { get; set; }

        [ForeignKey("Rut")]
        public int? DocumentoAdjuntoId { get; set; }


        public virtual Catalogo Estado { get; set; }
        public virtual DocumentoAdjunto Rut { get; set; }
    }
}

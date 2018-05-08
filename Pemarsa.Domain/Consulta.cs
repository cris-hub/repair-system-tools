using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pemarsa.Domain
{
    public class Consulta
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid Guid { get; set; }

        [Required]
        public string Campos { get; set; }

        [Required]
        public string Tabla { get; set; }


        public string CampoPadre { get; set; }

        public string CamposBusqueda { get; set; }

        public string Condicion { get; set; }
    }
}

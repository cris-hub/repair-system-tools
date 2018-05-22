using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class HerramientaEstudioFactibilidad : Entity
    {
        public bool? Admin { get; set; }

        public bool? ManoObra { get; set; }

        public bool? Mantenimiento { get; set; }

        public bool? Maquina { get; set; }

        public bool? Material { get; set; }

        public bool? Metodo { get; set; }

        [ForeignKey("Herramienta")]
        public int HerramientaId { get; set; }


        public virtual Herramienta Herramienta { get; set; }
    }
}

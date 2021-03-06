﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class ProcesoInspeccion 
    {

        [Required, ForeignKey("Inspeccion")]
        public int InspeccionId { get; set; }
        public virtual Inspeccion Inspeccion { get; set; }

        public bool Activa  { get; set; }

        [Required, ForeignKey("Proceso")]
        public int ProcesoId { get; set; }
        public virtual Proceso Proceso { get; set; }
    }
}

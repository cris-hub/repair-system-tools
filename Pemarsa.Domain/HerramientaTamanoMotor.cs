﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class HerramientaTamanoMotor : Entity
    {
        [Required]
        public string Tamano { get; set; }

        [ForeignKey("Herramienta")]
        public int HerramientaId { get; set; }

        public virtual Herramienta Herramienta { get; set; }
    }
}

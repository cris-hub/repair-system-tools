﻿using System;

namespace Pemarsa.CanonicalModels
{
    public class OrdenTrabajoRemisionDTO
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public string Cliente { get; set; }
        public string Linea { get; set; }
        public string Herramienta { get; set; }
        public DateTime Fecha { get; set; }
        public string ObservacionRemision { get; set; }
    }
}

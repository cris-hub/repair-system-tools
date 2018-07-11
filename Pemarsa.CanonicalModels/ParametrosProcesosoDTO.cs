using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa.CanonicalModels
{
    public class ParametrosProcesosoDTO : Paginacion
    {
        public int OrdenTrabajoPrioridad { get; set; }
        public int Estado { get; set; }
        public int TipoProceso { get; set; }
        public string NumeroOIT { get; set; }
        public string HerraminetaNombre { get; set; }
        public string ClienteNickname { get; set; }
        public string SerialHerramienta { get; set; }
        public string Fecha { get; set; }

    }
}


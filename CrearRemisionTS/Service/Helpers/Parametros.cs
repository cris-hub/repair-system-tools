using CrearRemisionTS.Service.Interface;
using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;

namespace CrearRemisionTS.Service.Helpers
{
    internal class Parametros : IParams
    {
        public List<Guid> guidsOrdenTrabajo { get; set; }
        public UsuarioDTO usuario { get; set; }
        public string guidOrdenTrabajo { get; set; }
        public List<OrdenTrabajo> OrdenTrabajo { get; set; }
        public Remision remision { get; set; }
        public Guid guidRemision { get; set; }
        public string estadoOIT { get; set; }

    }
}

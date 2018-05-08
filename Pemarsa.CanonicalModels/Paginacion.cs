using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa.CanonicalModels
{
    public class Paginacion
    {
        public int CantidadRegistros { get; set; }
        public int PaginaActual { get; set; }
        public int RegistrosOmitir() => (PaginaActual - 1) * CantidadRegistros;
    }
}

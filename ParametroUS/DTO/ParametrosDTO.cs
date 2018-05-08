using System;
using System.Collections.Generic;
using Pemarsa.Domain;

namespace ParametroUS.DTO
{
    public class ParametrosDTO
    {
        public List<Catalogo> Catalogos { get; set; }
        public List<Catalogo> Consultas { get; set; }        
    }

    public class EntidadDTO
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public string Valor { get; set; }
        public string Grupo { get; set; }
        public string Simbolo { get; set; }
        public bool Estado { get; set; }        
    }
}

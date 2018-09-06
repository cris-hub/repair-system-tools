using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa.CanonicalModels
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public string Nombre { get; set; }
        public Guid GuidOrganizacion { get; set; }
    }
}

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

        public UsuarioDTO()
        {
            this.Nombre = "admin";
            this.Guid = Guid.NewGuid();
            this.GuidOrganizacion = Guid.NewGuid();


        }
    }
}

using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa_EntityTest.ClienteTest.Data
{
    internal static class ClienteESData
    {
        public static Cliente GenerarDatosCliente()
        {
            try
            {
                Cliente cli = new Cliente();
                cli.ContactoCorreo = "";
                cli.ContactoNombre = "";
                return cli;
            }
            catch (Exception) { throw; }
        }
    }
}

using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Pemarsa_EntityTest.ClienteTest.Data
{
    public static class ClienteESData
    {
        public static Cliente GenerarDatosCliente()
        {
            try
            {
                ClienteLinea clienteLinea = new ClienteLinea()
                {
                    ContactoCorreo = "contactoLiena@prueba.com",
                    ContactoNombre = "nombreCOntacto",
                    ContactoTelefono = "154564861",
                    Direccion = "calle 2 n2 -2",
                    Nombre = "NombrePrueba",
                    GuidUsuarioCrea = Guid.Parse("00000000-0000-0000-0000-000000000000"),
                    GuidOrganizacion = Guid.Parse("00000000-0000-0000-0000-000000000000"),
                    NombreUsuarioCrea = "Admin"
                };

                List<ClienteLinea> ClientesLienas = new List<ClienteLinea>();
                ClientesLienas.Add(clienteLinea);

                Cliente cli = new Cliente() {
                    ContactoCorreo = "PruebaTest@prueba.com",
                    ContactoNombre = "PruebaTest",
                    ContactoTelefono = "9638527410",
                    Direccion = "calle 1 n 1 -1 ",
                    EstadoId = 1,
                    NickName = "NickPrueba",
                    Nit = "147852369",
                    NombreResponsable = "responPrueba",
                    RazonSocial = "RazonPRueba",
                    Telefono = "8529637410",
                    GuidUsuarioCrea = Guid.Parse("00000000-0000-0000-0000-000000000000"),
                    GuidOrganizacion = Guid.Parse("00000000-0000-0000-0000-000000000000"),
                    NombreUsuarioCrea = "Admin",
                    Lineas = ClientesLienas

                };
      
                return cli;
            }
            catch (Exception) { throw; }
        }

        public static string RutaServer()
        {
            try
            {
                return "~/PemarsaFiles/";
            }
            catch (Exception) { throw; }
        }
    }
}

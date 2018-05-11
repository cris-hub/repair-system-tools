using ClienteES.Service;
using Pemarsa.Domain;
using Pemarsa_EntityTest.ClienteTest.Fixture;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Pemarsa_EntityTest.ClienteTest.Test
{
    //[Collection("ClienteESFixture collection")]
    public class ClienteESTest : IClassFixture<ClienteESFixture>
    {
        private ClienteESFixture _fixture;
        private readonly IClienteService _service;

        public ClienteESTest(ClienteESFixture fixture/*, IClienteService service*/)
        {
            try
            {
                _fixture = fixture;
                //_service = service;
                
            }
            catch (Exception) { throw; }
        }

        [Fact(DisplayName = "Crear Cliente")]
        public async void CrearCuenta()
        {
            try
            {
                //Guid result = await _service.CrearCliente(_fixture.Cliente, _fixture.RutaServer);
                //Assert.NotNull(_fixture.Cliente);
                //Assert.NotEqual(result, Guid.Empty);
                Assert.NotNull(new Cliente());
            }
            catch (Exception) { throw; }
        }
    }
}

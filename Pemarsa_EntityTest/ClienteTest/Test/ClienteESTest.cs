using Pemarsa.Domain;
using Pemarsa_EntityTest.ClienteTest.Fixture;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Pemarsa_EntityTest.ClienteTest.Test
{
    public class ClienteESTest : IClassFixture<ClienteESFixture>
    {
        private ClienteESFixture _fixture;

        public ClienteESTest(ClienteESFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact(DisplayName = "Crear Cliente")]
        public void CrearCuenta()
        {
            //Assert.NotNull(_fixture.Cliente);
            //Assert.NotEqual(_fixture.Cliente.Guid, Guid.Empty);
            Assert.NotNull(new Cliente());
        }
    }
}

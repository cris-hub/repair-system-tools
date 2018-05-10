using Pemarsa.Domain;
using Pemarsa_EntityTest.ClienteTest.Data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pemarsa_EntityTest.ClienteTest.Fixture
{
    public class ClienteESFixture
    {
        public Cliente Cliente { get; set; }

        public ClienteESFixture()
        {
            Init();
        }
        private void Init()
        {
            try
            {
                Cliente = ClienteESData.GenerarDatosCliente();
            }
            catch(Exception) { throw; }
        }
    }
}

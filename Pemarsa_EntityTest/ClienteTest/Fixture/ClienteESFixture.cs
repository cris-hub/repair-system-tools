using Pemarsa.Domain;
using Pemarsa_EntityTest.ClienteTest.Data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pemarsa_EntityTest.ClienteTest.Fixture
{
    public class ClienteESFixture //: IDisposable
    {
        public Cliente Cliente { get; set; }
        public string RutaServer { get; set; }
        //private bool _disposed = false;

        public ClienteESFixture()
        {
            Init();
        }
        private void Init()
        {
            try
            {
                Cliente = ClienteESData.GenerarDatosCliente();
                RutaServer = ClienteESData.RutaServer();
            }
            catch(Exception) { throw; }
        }

        //public void Dispose()
        //{
        //    Dispose(true);
        //}
        //protected virtual void Dispose(bool disposing)
        //{
        //    if (!this._disposed)
        //    {
        //        if (disposing)
        //        {
        //            Cliente = null;
        //        }
        //        this._disposed = true;
        //    }
        //}
    }
}

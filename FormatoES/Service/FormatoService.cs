using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using DocumentoAdjuntoUS.Service;
using FormatoES.Repository;
using Pemarsa.Data;
using Pemarsa.Domain;

namespace FormatoES.Service
{
    public class FormatoService : IFormatoService
    {
        private readonly IFormatoRepository _repository;
        private readonly IDocumentoAdjuntoService _serviceDocumentoAdjunto;
        private PemarsaContext _context;
        private List<int> idsDocumentos;

        public FormatoService(PemarsaContext context, IDocumentoAdjuntoService serviceDocumentoAdjunto)
        {
            _repository = new FormatoRepository(context);
            _serviceDocumentoAdjunto = serviceDocumentoAdjunto;
            _context = context;
        }

        public async Task<Guid> CrearFormato(Formato formato, string RutaServer)
        {
            try
            {

                

                foreach (var plano in formato.Planos)
                {
                    //Se combierte el stream del documento adjutno en butes
                    Byte[] bytes = Convert.FromBase64String(plano.Stream);

                    //Se valida si existe la carpeta en el servidor
                    if (!Directory.Exists($"{RutaServer}"))
                        Directory.CreateDirectory($"{RutaServer}");

                    //se guarda la ruta en el documentoAfjunto para registrarla en la base de datos
                    string nameSystem = $"{Guid.NewGuid().ToString()}.{plano.NombreArchivo.Split('.')[1]}";
                    plano.Ruta = $"{RutaServer}{nameSystem}";
                    plano.Nombre = nameSystem;

                    await File.WriteAllBytesAsync(plano.Ruta, bytes);

                }

                return await _repository.CrearFormato(formato);
            }
            catch (Exception e )
            {

                throw e;
            }
            
        }
    }
}

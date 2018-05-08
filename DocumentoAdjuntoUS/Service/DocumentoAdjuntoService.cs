using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using DocumentoAdjuntoUS.Repository;
using Microsoft.Extensions.Configuration;
using Pemarsa.Domain;
using Pemarsa.Data;

namespace DocumentoAdjuntoUS.Service
{
    public class DocumentoAdjuntoService : IDocumentoAdjuntoService
    {
        private readonly IDocumentoAdjuntoRepository _repository;

        public DocumentoAdjuntoService(PemarsaContext _context)
        {
            _repository = new DocumentoAdjuntoRepository(_context);
        }

        public async Task<bool> ActualizarDocumentoAdjunto(DocumentoAdjunto documentoAdjunto, string RutaServer)
        {
            try
            {
                //Se combierte el stream del documento adjutno en butes
                Byte[] bytes = Convert.FromBase64String(documentoAdjunto.Stream);

                //Se valida si existe la carpeta en el servidor
                if (!Directory.Exists($"{RutaServer}Documento"))
                    Directory.CreateDirectory($"{RutaServer}Documento");

                //se guarda la ruta en el documentoAfjunto para registrarla en la base de datos
                string nameSystem = $"{Guid.NewGuid().ToString()}.{documentoAdjunto.NombreArchivo.Split('.')[1]}";
                documentoAdjunto.Ruta = $"{RutaServer}Documento/{nameSystem}";
                documentoAdjunto.Nombre = nameSystem;

                await File.WriteAllBytesAsync(documentoAdjunto.Ruta, bytes);

                //Se elimina el archivo actual registrado para este documento
                string path = await _repository.ConsultarRutaActualPapelTrabajo(documentoAdjunto.Id);
                File.Delete(path);

                return await _repository.ActualizarDocumentoAdjunto(documentoAdjunto); 
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<int> CrearDocumentoAdjunto(DocumentoAdjunto documentoAdjunto, string RutaServer)
        {
            try
            {
                //Se combierte el stream del documento adjutno en butes
                Byte[] bytes = Convert.FromBase64String(documentoAdjunto.Stream);

                //Se valida si existe la carpeta en el servidor
                if (!Directory.Exists($"{RutaServer}"))
                        Directory.CreateDirectory($"{RutaServer}");

                //se guarda la ruta en el documentoAfjunto para registrarla en la base de datos
                string nameSystem = $"{Guid.NewGuid().ToString()}.{documentoAdjunto.NombreArchivo.Split('.')[1]}";
                documentoAdjunto.Ruta = $"{RutaServer}{nameSystem}";
                documentoAdjunto.Nombre = nameSystem;

                await File.WriteAllBytesAsync(documentoAdjunto.Ruta, bytes);
                

                return await _repository.CrearDocumentoAdjunto(documentoAdjunto);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

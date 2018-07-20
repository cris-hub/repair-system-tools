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
        private IConfiguration _configuratio;

        public DocumentoAdjuntoService(PemarsaContext _context, IConfiguration config)
        {
            _repository = new DocumentoAdjuntoRepository(_context);
            _configuratio = config;
        }

        public async Task<bool> ActualizarDocumentoAdjunto(DocumentoAdjunto documentoAdjunto)
        {
            try
            {
                string RutaServer = ObtenerRutaServidor();


                

                //Se valida si existe la carpeta en el servidor
                if (!Directory.Exists($"{RutaServer}"))
                    Directory.CreateDirectory($"{RutaServer}");

                //se guarda la ruta en el documentoAfjunto para registrarla en la base de datos
                if (documentoAdjunto.Nombre==null)
                {
                    string nameSystem = $"{Guid.NewGuid().ToString()}.{documentoAdjunto.NombreArchivo.Split('.')[1]}";
                    documentoAdjunto.Ruta = $"{RutaServer}/{nameSystem}";
                    documentoAdjunto.Nombre = nameSystem;

                }
            


                //Se combierte el stream del documento adjutno en butes

                if (documentoAdjunto.Stream != null)
                {
                    Byte[] bytes = Convert.FromBase64String(documentoAdjunto.Stream);
                    await File.WriteAllBytesAsync(documentoAdjunto.Ruta, bytes);
                }

       

                //Se elimina el archivo actual registrado para este documento
                string path = await _repository.ConsultarRutaActualPapelTrabajo(documentoAdjunto.Id);
                //File.Delete(path);

                return await _repository.ActualizarDocumentoAdjunto(documentoAdjunto);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DocumentoAdjunto> ConsultarDocumentoAdjuntoPorId(int documentoAdjuntoId)
        {

            try
            {
                string RutaServer = ObtenerRutaServidor();

                DocumentoAdjunto doc =  await _repository.ConsultarDocumentoAdjuntoPorId(documentoAdjuntoId);
                byte[] readText = File.ReadAllBytes(doc.Ruta);
                doc.Stream = Convert.ToBase64String(readText);
                    
                return  doc;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<int> CrearDocumentoAdjunto(DocumentoAdjunto documentoAdjunto)
        {
            try
            {
                string RutaServer = ObtenerRutaServidor();


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
                documentoAdjunto.NombreUsuarioCrea = "admin";

                return await _repository.CrearDocumentoAdjunto(documentoAdjunto);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private string ObtenerRutaServidor()
        {
            return _configuratio.GetSection("FileServer:VirtualPath").Value;
        }
    }
}

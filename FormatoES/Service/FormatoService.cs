using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using DocumentoAdjuntoUS.Service;
using FormatoES.Repository;
using HerramientaES.Service;
using Pemarsa.CanonicalModels;
using Pemarsa.Data;
using Pemarsa.Domain;

namespace FormatoES.Service
{
    public class FormatoService : IFormatoService
    {
        private readonly IFormatoRepository _repository;
        private readonly IDocumentoAdjuntoService _serviceDocumentoAdjunto;
        private readonly IHerramientaService _serviceHerramientaService;

        private PemarsaContext _context;

        public FormatoService(PemarsaContext context, 
            IDocumentoAdjuntoService serviceDocumentoAdjunto, 
            IHerramientaService serviceHerramientaService)
        {
            _repository = new FormatoRepository(context);
            _serviceHerramientaService = serviceHerramientaService;
            _serviceDocumentoAdjunto = serviceDocumentoAdjunto;
            _context = context;
        }

        public async Task<bool> ActualizarFormato(Formato formato, string RutaServer, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ActualizarFormato(formato,usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<Guid> CrearFormato(Formato formato, string RutaServer, UsuarioDTO usuario)
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
                if (formato.Herramienta != null)
                {
                    formato.Herramienta = await _serviceHerramientaService.ConsultarHerramientaPorId(formato.Herramienta.Id,usuario);

                }


                return await _repository.CrearFormato(formato,usuario);
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        public async Task<Formato> ConsultarFormatoPorGuid(Guid guidFormato, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarFormatoPorGuid(guidFormato,usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, ICollection<Formato>>> ConsultarFormatos(Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarFormatos(paginacion,usuario);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<Tuple<int, ICollection<Formato>>> ConsultarFormatosPorFiltro(ParametrosDTO parametrosDTO, UsuarioDTO usuario)
        {

            try
            {
                return await _repository.ConsultarFormatosPorFiltro(parametrosDTO,usuario);
            }
            catch (Exception) { throw; }

        }

        public async Task<Formato> ConsultarFormatoPorGuidHerramienta(Guid GuidHerramienta, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarFormatoPorGuidHerramienta(GuidHerramienta,usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<ICollection<Formato>> ConsultarFormatoPorTipoConexion(int tipoConexion, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarFormatoPorTipoConexion(tipoConexion,usuario);
            }
            catch (Exception) { throw; }
        }
    }
}

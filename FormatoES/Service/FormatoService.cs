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

        public async Task<bool> ActualizarFormato(Formato formato, UsuarioDTO usuario)
        {
            try
            {
                if (formato.Adjunto != null)
                {
                    await _serviceDocumentoAdjunto.ActualizarDocumentoAdjunto(formato.Adjunto);

                }

                if (formato.Planos != null)
                {

                    foreach (var plano in formato.Planos)
                    {

                        await _serviceDocumentoAdjunto.ActualizarDocumentoAdjunto(plano);

                    }
                }


                return await _repository.ActualizarFormato(formato, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<Guid> CrearFormato(Formato formato, UsuarioDTO usuario)
        {
            try
            {
                if (formato.Adjunto != null)
                {
                    await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(formato.Adjunto);

                }

                if (formato.Planos != null)
                {

                    foreach (var plano in formato.Planos)
                    {

                        await _serviceDocumentoAdjunto.CrearDocumentoAdjunto(plano);

                    }
                }
                if (formato.Herramienta != null)
                {
                    formato.Herramienta = await _serviceHerramientaService.ConsultarHerramientaPorId(formato.Herramienta.Id, usuario);

                }


                return await _repository.CrearFormato(formato, usuario);
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
                return await _repository.ConsultarFormatoPorGuid(guidFormato, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<Tuple<int, ICollection<Formato>>> ConsultarFormatos(Paginacion paginacion, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarFormatos(paginacion, usuario);
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
                return await _repository.ConsultarFormatosPorFiltro(parametrosDTO, usuario);
            }
            catch (Exception) { throw; }

        }

        public async Task<Formato> ConsultarFormatoPorGuidHerramienta(Guid GuidHerramienta, UsuarioDTO usuario)
        {
            try
            {
                return await _repository.ConsultarFormatoPorGuidHerramienta(GuidHerramienta, usuario);
            }
            catch (Exception) { throw; }
        }

        public async Task<ICollection<Formato>> ConsultarFormatoPorTipoConexion(int tipoConexion, UsuarioDTO usuario)
        {
            try
            {
                var query = await _repository.ConsultarFormatoPorTipoConexion(tipoConexion, usuario);
                return query;
            }
            catch (Exception) { throw; }
        }

        public async Task<Formato> ConsultarFormatoPorInspeccionConexion(InspeccionConexion inspeccionConexion, UsuarioDTO usuarioDTO)
        {
            try
            {
                Formato formato = await _repository.ConsultarFormatoPorInspeccionConexion(inspeccionConexion, usuarioDTO);
                return formato;
                throw new NotImplementedException();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

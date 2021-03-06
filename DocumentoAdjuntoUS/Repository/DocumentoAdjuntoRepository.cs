﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pemarsa.Data;
using Pemarsa.Domain;

namespace DocumentoAdjuntoUS.Repository
{
    internal class DocumentoAdjuntoRepository : IDocumentoAdjuntoRepository
    {
        private PemarsaContext _context;

        public DocumentoAdjuntoRepository(DbContext dbContext)
        {
            _context = (PemarsaContext)dbContext;
        }


        public async Task<bool> ActualizarDocumentoAdjunto(DocumentoAdjunto documentoAdjunto)
        {
            try
            {
                var dbAttachment = await _context.DocumentoAdjunto.Where(att => att.Id == documentoAdjunto.Id).FirstOrDefaultAsync();
                
                documentoAdjunto.FechaModifica = DateTime.Now;
                documentoAdjunto.Guid = dbAttachment.Guid;
                documentoAdjunto.NombreUsuarioCrea = dbAttachment.NombreUsuarioCrea;
                documentoAdjunto.FechaRegistro = dbAttachment.FechaRegistro;

                _context.Entry(dbAttachment).Property(x => x.Id).IsModified = false;

                //Update attachment
                _context.Entry(dbAttachment).CurrentValues.SetValues(documentoAdjunto);

                _context.Entry(dbAttachment).State = EntityState.Detached;
                _context.Entry(documentoAdjunto).State = EntityState.Modified;

                return await _context.SaveChangesAsync() > 0;
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
                return await _context.DocumentoAdjunto.FirstOrDefaultAsync(c => c.Id == documentoAdjuntoId);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<string> ConsultarRutaActualPapelTrabajo(int AdjuntoId)
        {
            try
            {
                return (await _context.DocumentoAdjunto.SingleAsync(x => x.Id == AdjuntoId)).Ruta;
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
                if (documentoAdjunto.Guid != null)
                {
                    documentoAdjunto.Guid = Guid.NewGuid();

                }
               
                documentoAdjunto.FechaRegistro = DateTime.Now;
                documentoAdjunto.Descripcion = "DocumentoAdjunto";

                _context.Entry(documentoAdjunto).State = EntityState.Added;
                await _context.SaveChangesAsync();

                return (await _context.DocumentoAdjunto.SingleAsync(a => a.Guid == documentoAdjunto.Guid)).Id;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}

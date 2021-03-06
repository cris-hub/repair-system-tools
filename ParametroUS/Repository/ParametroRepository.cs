﻿using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pemarsa.Data;
using Pemarsa.Domain;
using ParametroUS.DTO;

namespace ParametroUS.Repository
{
    internal class ParametroRepository : IParametroRepository
    {
        private readonly PemarsaContext _context;
        public ParametroRepository(PemarsaContext context)
        {
            _context = context;
        }

        public async Task<ParametrosDTO> ConsultarParametrosPorEntidad(string entidad)
        {
            try
            {
                var parametros = new ParametrosDTO();
                var pCatalogo = await _context.ParametroCatalogo
                    .Where(p => p.Entidad == entidad)
                    .Include(p => p.Catalogo)
                    .Select(p => p.Catalogo)
                    .ToListAsync();

                var pConsulta = await _context.ParametroConsulta
                    .Where(p => p.Entidad == entidad)
                    .Include(p => p.Consulta)
                    .Select(p => p.Consulta)
                    .ToListAsync();


                if (pCatalogo != null)
                    parametros.Catalogos = pCatalogo;
                if (pConsulta != null)
                    parametros.Consultas = await ConsultarEntidades(pConsulta);

                return parametros;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Consulta las tablas que son catalogo para otra entidad
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        private async Task<List<Catalogo>> ConsultarEntidades(List<Consulta> consultas)
        {
            var conn = _context.Database.GetDbConnection();
            var catalogos = new List<Catalogo>();
            try
            {
                await conn.OpenAsync();
                using (var command = conn.CreateCommand())
                {
                    foreach (var consulta in consultas)
                    {
                        command.CommandText =
                            $@"Select { consulta.Campos }    
                               From   { consulta.Tabla }
                               Where  ({ consulta.Condicion ?? "1 = 1" });";

                        DbDataReader reader = await command.ExecuteReaderAsync();

                            if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                Catalogo row = new Catalogo();

                                if (reader.FieldCount == 4)
                                {
                                    row = new Catalogo
                                    {
                                        Id = reader.GetInt32(0),
                                        Guid = reader.GetGuid(1),
                                        Valor = reader.GetString(2),
                                        Grupo = consulta.Tabla,
                                        Estado = false,
                                        CatalogoId = reader.GetInt32(3)
                                    };

                                }

                                if (reader.FieldCount == 5)
                                {
                                    row = new Catalogo
                                    {
                                        Id = reader.GetInt32(0),
                                        Guid = reader.GetGuid(1),
                                        Valor = reader.GetString(2),
                                        Grupo = reader.GetValue(4).ToString(),
                                        Simbolo = consulta.Tabla,
                                        Estado = false,
                                        CatalogoId = reader.GetInt32(3)
                                    };
                                }
                                catalogos.Add(row);
                            }
                        }
                        reader.Dispose();
                    }
                }
                return catalogos;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                conn.Close();
            }
        }
    }
}

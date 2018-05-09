using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using Pemarsa.CanonicalModels;
using System.Linq;

namespace Pemarsa.Data.DBInitialize
{
    /// <summary>
    /// Esta clase se encarga de poblar la base de datos 
    /// con los catalogos correspondientes a la aplicación,
    /// (Se 'queman' los guids para que sean los mismos en todas las implementaciones)
    /// </summary>
    public static partial class DBInitializer
    {
        public static void Initialize(PemarsaContext context)
        {
            try
            {
                #region Estados
                var estados = new List<Catalogo>
                {
                    new Catalogo{
                        Id = 1,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Cliente.Activa,
                        Grupo = CanonicalConstants.Grupos.EstadosClientes,
                    },
                    new Catalogo{
                        Id = 2,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Estados.Cliente.Inactiva,
                        Grupo = CanonicalConstants.Grupos.EstadosClientes,
                    }
                };
                #endregion

                if (!context.Catalogo.Any())
                {
                    context.Catalogo.AddRange(estados);
                    context.SaveChanges();
                }

                #region Parametros
                var entidades = new List<Parametro>
                    {
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Cliente}
                    };

                if (!context.Parametro.Any())
                {
                    context.Parametro.AddRange(entidades);
                }

                #endregion

                context.SaveChanges();

                #region ParametrosCatalogo

                // Estados //
                foreach (var estado in estados)
                {
                    switch (estado.Grupo)
                    {
                        case CanonicalConstants.Grupos.EstadosClientes:
                            context.ParametroCatalogo.AddRange
                            (
                                new ParametroCatalogo
                                {
                                    CatalogoId = estado.Id,
                                    Entidad = CanonicalConstants.Entidades.Cliente
                                }
                            );
                            break;
                    }
                }

                #endregion

                context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

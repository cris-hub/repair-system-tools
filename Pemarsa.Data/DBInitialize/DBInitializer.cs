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

                #region Tipos
                var tipos = new List<Catalogo>
                {
                    new Catalogo{
                        Id = 3,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Prueba,
                        Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 4,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Prueba1,
                        Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    },
                    new Catalogo{
                        Id = 5,
                        Guid = Guid.NewGuid(),
                        Valor = CanonicalConstants.Tipos.Materiales.Prueba2,
                        Grupo = CanonicalConstants.Grupos.HerramientasMateriales,
                    }
                };
                foreach (var tipo in tipos)
                {
                    if (context.Catalogo.Where(c => c.Id == tipo.Id).ToList().Count == 0)
                        context.Catalogo.Add(tipo);
                }
                #endregion
                if (!context.Catalogo.Any())
                {
                    context.Catalogo.AddRange(estados);
                    context.SaveChanges();
                }

                #region Parametros
                var entidades = new List<Parametro>
                    {
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Cliente},
                        new Parametro{ Entidad = CanonicalConstants.Entidades.Materiales}
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

                // Tipos //
                foreach (var tipo in tipos)
                {
                    switch (tipo.Grupo)
                    {
                        case CanonicalConstants.Grupos.HerramientasMateriales:
                            if (context.ParametroCatalogo.Where(pc => (pc.CatalogoId == tipo.Id) && (pc.Entidad == CanonicalConstants.Entidades.Materiales)).ToList().Count == 0)
                            {
                                context.ParametroCatalogo.Add
                                (
                                new ParametroCatalogo
                                {
                                    CatalogoId = tipo.Id,
                                    Entidad = CanonicalConstants.Entidades.Materiales
                                }
                                );
                            }
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

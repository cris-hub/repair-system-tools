using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class Inspeccion : Entity
    {
        public decimal? Amperaje { get; set; }
        
        public int? ConcentracionUtilizada { get; set; }
        
        public bool? EstaConforme { get; set; }

        public DateTime? FechaDePreparacion { get; set; }
        
        public bool? InspeccionLuzNegra { get; set; }

        public bool? InspeccionParticulasMagneticas { get; set; }

        public bool InspeccionYoke { get; set; }

        public int? IntensidadLuzBlanca { get; set; }

        public int? IntensidadLuzNegra { get; set; }

        public int? Lote { get; set; }

        public int Pieza { get; set; }

        public int? Lumens { get; set; }

        public int? Luxes { get; set; }

        public string Observaciones { get; set; }

        public string ObservacionesInspeccion { get; set; }

        public bool? SeIdentificaDefecto { get; set; }

        public bool? SeRealizoCalibracionEquipo { get; set; }

        public int? TemperaturaAmbiente { get; set; }

        public int? TemperaturaDePieza { get; set; }

     
        public decimal? VelocidadBuggyDrive { get; set; }

        #region catalogos
        [ForeignKey("BloqueEscalonadoUsado")]
        public int? BloqueEscalonadoUsadoId { get; set; }
        public virtual Catalogo BloqueEscalonadoUsado { get; set; }

        [ForeignKey("BobinaMagnetica")]
        public int? BobinaMagneticaId { get; set; }
        public virtual Catalogo BobinaMagnetica { get; set; }

        [ForeignKey("EquipoEmi")]
        public int? EquipoEmiId { get; set; }
        public virtual Catalogo EquipoEmi { get; set; }

        [ForeignKey("Estado")]
        public int? EstadoId { get; set; }
        public virtual Catalogo Estado { get; set; }

       

        [ForeignKey("TipoDeLiquidos")]
        public int? TipoDeLiquidosId { get; set; }
        public virtual Catalogo TipoDeLiquidos { get; set; }

        [ForeignKey("TipoInspeccion")]
        public int TipoInspeccionId { get; set; }
        public virtual Catalogo TipoInspeccion { get; set; }


        [ForeignKey("TurboPatron")]
        public int? TuboPatronId { get; set; }
        public virtual Catalogo TuboPatron { get; set; } 
        #endregion
        
        #region DocumentosAdjuntos


        [ForeignKey("ImagenMedicionEspesores")]
        public int? ImagenMedicionEspesoresId { get; set; }
        public virtual DocumentoAdjunto ImagenMedicionEspesores { get; set; }

        [ForeignKey("ImagenMfl")]
        public int? ImagenMflId { get; set; }
        public virtual DocumentoAdjunto ImagenMfl { get; set; }

        [ForeignKey("ImagenPantallaUltrasonido")]
        public int? ImagenPantallaUltrasonidoId { get; set; }
        public virtual DocumentoAdjunto ImagenPantallaUltrasonido { get; set; }

        [ForeignKey("ImagenUltrasonidoDespues")]
        public int? ImagenUltrasonidoDespuesId { get; set; }
        public virtual DocumentoAdjunto ImagenUltrasonidoDespues { get; set; }

        [ForeignKey("ImagenUltrasonidoDurante")]
        public int? ImagenUltrasonidoDuranteId { get; set; }
        public virtual DocumentoAdjunto ImagenUltrasonidoDurante { get; set; }

        [ForeignKey("ImagenUltrasonidoPrevia")]
        public int? ImagenUltrasonidoPreviaId { get; set; }
        public virtual DocumentoAdjunto ImagenUltrasonidoPrevia { get; set; }
        #endregion


        public virtual IEnumerable<InspeccionEquipoUtilizado> InspeccionEquipoUtilizado { get; set; }

        public virtual IEnumerable<InspeccionFotos> InspeccionFotos { get; set; }

        public IEnumerable<InspeccionInsumo> Insumos { get; set; }

        public IEnumerable<InspeccionConexion> Conexiones { get; set; }

        public IEnumerable<InspeccionDimensionalOtro> Dimensionales { get; set; }

        public IEnumerable<InspeccionEspesor> Espesores { get; set; }
              
        public IEnumerable<ProcesoInspeccionSalida> ProcesoInspeccionSalida { get; set; }

        public IEnumerable<ProcesoInspeccionEntrada> ProcesoInspeccionEntrada { get; set; }



    }
}
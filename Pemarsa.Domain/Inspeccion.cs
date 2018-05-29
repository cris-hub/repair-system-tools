using System;
using System.Collections.Generic;
using System.Text;

namespace Pemarsa.Domain
{
    public class Inspeccion : Entity
    {
        public int Amperaje { get; set; }

        public int BloqueEscalonadoUsadoId { get; set; }//falta la relacion

        public int BobinaMagneticaId { get; set; }//falta la relacion

        public int ConcentracionUtilizada { get; set; }

        public IEnumerable<InspeccionConexion> Conexiones { get; set; }//falta crear la clase

        public IEnumerable<InspeccionDimensionalOtro> Dimensionales { get; set; }//falta crear la clase

        public int EquipoEmiId { get; set; }//falta la relacion

        public int EquipoUtilizadoId { get; set; }//falta la relacion

        public IEnumerable<InspeccionEspesor> Espesores { get; set; }//falta crear la clase

        public bool EstaConforme { get; set; }

        public int EstadoId { get; set; }//falta la relacion

        public DateTime FechaDePreparacion { get; set; }

        public IEnumerable<DocumentoAdjunto> FotosId { get; set; }//falta la relacion

        public int ImagenMedicionEspesoresId { get; set; }//falta la relacion

        public int ImagenMflId { get; set; }//falta la relacion

        public int ImagenPantallaUltrasonidoId { get; set; }//falta la relacion

        public int ImagenUltrasonidoDespuesId { get; set; }//falta la relacion

        public int ImagenUltrasonidoDuranteId { get; set; }//falta la relacion

        public int ImagenUltrasonidoPreviaId { get; set; }//falta la relacion

        public bool InspeccionLuzNegra { get; set; }

        public bool InspeccionParticulasMagneticas { get; set; }

        public IEnumerable<InspeccionInsumo> Insumos { get; set; }

        public int IntensidadLuzBlanca { get; set; }

        public int IntensidadLuzNegra { get; set; }

        public int Lote { get; set; }

        public int Lumens { get; set; }

        public int Luxes { get; set; }

        public string Observaciones { get; set; }

        public string ObservacionesInspeccion { get; set; }

        public bool SeIdentificaDefecto { get; set; }

        public bool SeRealizoCalibracionEquipo { get; set; }

        public int TemperaturaAmbiente { get; set; }

        public int TemperaturaDePieza { get; set; }

        public int TipoDeLiquidosId { get; set; }

        public int TipoInspeccionId { get; set; }

        public int TurboPatronId { get; set; }

        public int VelocidadBuggyDrive { get; set; }
    }
}

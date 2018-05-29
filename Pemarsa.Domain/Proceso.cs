using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class Proceso
    {
        [Required]
        public int CantidadInspeccion { get; set; }

        [ForeignKey("DetalleSoldadura")]
        public int? DetalleSoldaduraId { get; set; }

        [ForeignKey("EquipoMedicionUtilizado")]
        public int? EquipoMedicionUtilizadoId { get; set; }

        public bool? EsPruebaConGauge { get; set; }

        [Required, ForeignKey("Estado")]
        public int EstadoId { get; set; }

        [Required]
        public Guid GuidOperario { get; set; }

        [ForeignKey("Inspeccion")]
        public int? InspeccionId { get; set; }

        public IEnumerable<ProcesoInspeccionEntrada> InspeccionEntrada { get; set; }//falta crear la clase

        public int InspeccionSalida { get; set; }//consultar porque esta en null

        public int InstructivoId { get; set; }//falta la relacion

        public int MaquinaAsignadaId { get; set; }//falta la relacion

        public string NombreOperario { get; set; }

        public int NormaId { get; set; }//falta la relacion

        public int ProcesoAnteriorId { get; set; }//consultar

        public int ProcesoSiguienteId { get; set; }//consultar

        public int ProcesosRealizarId { get; set; }//falta la relacion

        public int TipoProcesoId { get; set; }//falta la relacion

        public int TipoProcesoAnteriorId { get; set; }//falta la relacion

        public int TipoProcesoSiguienteId { get; set; }//falta la relacion

        public int TipoProcesoSiguienteSugeridoId { get; set; }//falta la relacion

        public int TipoSoldaduraId { get; set; }//falta la relacion

        public string TrabajoRealizadoId { get; set; }

        public string TrabajoRealizar { get; set; }



        public virtual DetalleSoldadura DetalleSoldadura { get; set; }

        public virtual Catalogo EquipoMedicionUtilizado { get; set; }

        public virtual Catalogo Estado { get; set; }

        public virtual Inspeccion Inspeccion { get; set; }
    }
}

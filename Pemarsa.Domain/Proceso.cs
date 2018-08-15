using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class Proceso : Entity
    {
        [Required]
        public int CantidadInspeccion { get; set; }

        public bool? EsPruebaConGauge { get; set; }

        [Required]
        public Guid GuidOperario { get; set; }
        public string NombreOperario { get; set; }

        public Guid GuidPersonaAsignaOperario { get; set; }
        public string NombrePersonaAsignaOperario { get; set; }

        public Guid GuidPersonaCompleta { get; set; }
        public string NombrePersonaCompleta { get; set; }

        public Guid GuidPersonaLibera { get; set; }
        public string NombrePersonaLibera { get; set; }

        public string TrabajoRealizado { get; set; }

        public string ObservacionRechazo { get; set; }

        public string TrabajoRealizar { get; set; }
        public bool? Reasignado { get; set; }

        public DateTime? FechaFinalizacion { get; set; }

        #region Catalogos canonnicas

        [ForeignKey("Estado")]
        public int? EstadoId { get; set; }
        public virtual Catalogo Estado { get; set; }

        [ForeignKey("TipoProcesoAnterior")]
        public int? TipoProcesoAnteriorId { get; set; }
        public virtual Catalogo TipoProcesoAnterior { get; set; }

        [ForeignKey("TipoProceso")]
        public int? TipoProcesoId { get; set; }
        public virtual Catalogo TipoProceso { get; set; }

        [ForeignKey("TipoProcesoSiguiente")]
        public int? TipoProcesoSiguienteId { get; set; }
        public virtual Catalogo TipoProcesoSiguiente { get; set; }

        [ForeignKey("TipoProcesoSiguienteSugerido")]
        public int? TipoProcesoSiguienteSugeridoId { get; set; }
        public virtual Catalogo TipoProcesoSiguienteSugerido { get; set; }

        [ForeignKey("TipoSoldadura")]
        public int? TipoSoldaduraId { get; set; }
        public virtual Catalogo TipoSoldadura { get; set; }

        [ForeignKey("EquipoMedicionUtilizado")]
        public int? EquipoMedicionUtilizadoId { get; set; }
        public virtual Catalogo EquipoMedicionUtilizado { get; set; }

        [ForeignKey("Norma")]
        public int? NormaId { get; set; }
        public virtual Catalogo Norma { get; set; }

        [ForeignKey("MaquinaAsignada")]
        public int? MaquinaAsignadaId { get; set; }
        public virtual Catalogo MaquinaAsignada { get; set; }

        [ForeignKey("Instructivo")]
        public int? InstructivoId { get; set; }
        public virtual Catalogo Instructivo { get; set; }

        #endregion

        [ForeignKey("ProcesosRealizar")]
        public int? ProcesosRealizarId { get; set; }
        public virtual Proceso ProcesosRealizar { get; set; }

        [ForeignKey("ProcesoSiguiente")]
        public int? ProcesoSiguienteId { get; set; }
        public virtual Proceso ProcesoSiguiente { get; set; }

        [ForeignKey("ProcesoAnterior")]
        public int? ProcesoAnteriorId { get; set; }
        public virtual Proceso ProcesoAnterior { get; set; }

        [ForeignKey("OrdenTrabajo")]
        public int OrdenTrabajoId { get; set; }
        public virtual OrdenTrabajo OrdenTrabajo { get; set; }

        [ForeignKey("DetalleSoldadura")]
        public int? DetalleSoldaduraId { get; set; }
        public virtual DetalleSoldadura DetalleSoldadura { get; set; }

        public IEnumerable<ProcesoInspeccionSalida> ProcesoInspeccionSalida { get; set; }
        public IEnumerable<ProcesoInspeccionEntrada> InspeccionEntrada { get; set; }

    }
}

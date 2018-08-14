using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class OrdenTrabajo : Entity
    {
        public int Cantidad { get; set; }

        public int CantidadInspeccionar { get; set; }

        public int Cotizacion { get; set; }

        public string DetallesSolicitud { get; set; }

        public string ObservacionRemision { get; set; }

        public int? OrdenCompra { get; set; }

        public bool ProvieneDeSolicitud { get; set; }

        public int RemisionCliente { get; set; }

        public string SerialHerramienta { get; set; }

        public string SerialMaterial { get; set; }

        #region Catalogos

        [ForeignKey("Estado")]
        public int EstadoId { get; set; }
        public virtual Catalogo Estado { get; set; }

        [ForeignKey("TipoServicio")]
        public int TipoServicioId { get; set; }
        public virtual Catalogo TipoServicio { get; set; }

        [ForeignKey("Responsable")]
        public int? ResponsableId { get; set; } //Cambia con el api de seguridad, esta propiedad no deberia ser de tipo catalogo, esta propieda viene dada por el api de seguridad
        public virtual Catalogo Responsable { get; set; }

        [Required, ForeignKey("Prioridad")]
        public int PrioridadId { get; set; }
        public virtual Catalogo Prioridad { get; set; }

        #endregion

        [ForeignKey("Material")]
        public int? MaterialId { get; set; }
        public virtual HerramientaMaterial Material { get; set; }

        [ForeignKey("TamanoHerramienta")]
        public int? TamanoHerramientaId { get; set; }
        public virtual HerramientaTamano TamanoHerramienta { get; set; }

        [ForeignKey("Herramienta")]
        public int? HerramientaId { get; set; }
        public virtual Herramienta Herramienta { get; set; }

        [ForeignKey("ClienteLinea")]
        public int LineaId { get; set; }
        public virtual ClienteLinea Linea { get; set; }

        [ForeignKey("Cliente")]
        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; }

        [ForeignKey("RemisionInicial")]
        public int? RemisionInicialId { get; set; }
        public virtual DocumentoAdjunto RemisionInicial { get; set; }

        [ForeignKey("SolicitudOrdenTrabajo")]
        public int? SolicitudOrdenTrabajoId { get; set; }
        public virtual SolicitudOrdenTrabajo SolicitudOrdenTrabajo { get; set; }

        public virtual ICollection<OrdenTrabajoHistorialModificacion> HistorialModificaciones { get; set; }
        public virtual ICollection<Proceso> Procesos { get; set; }
        public virtual ICollection<OrdenTrabajoAnexos> Anexos { get; set; }


    }
}

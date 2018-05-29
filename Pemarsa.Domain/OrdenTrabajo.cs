using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pemarsa.Domain
{
    public class OrdenTrabajo : Entity
    {
        //public IEnumerable<> Anexos { get; set; }

        public int Cantidad { get; set; }

        public int CantidadInspeccionar { get; set; }

        [ForeignKey("Cliente")]
        public int ClienteId { get; set; }

        public int Cotizacion { get; set; }

        public string DetallesSolicitud { get; set; }

        [ForeignKey("Estado")]
        public int EstadoId { get; set; }

        public Guid GuidSolicitudOrdenTraslado { get; set; }

        [ForeignKey("Herramienta")]
        public int HerramientaId { get; set; }

        public IEnumerable<OrdenTrabajoHistorialModificacion> HistorialModificaciones { get; set; }

        //public IEnumerable<> HistorialProcesos { get; set; }

        [ForeignKey("ClienteLinea")]
        public int LineaID { get; set; }

        [ForeignKey("Material")]
        public int MaterialId { get; set; }

        public string ObservacionRemision { get; set; }

        public int OrdenCompra { get; set; }

        [Required, ForeignKey("Prioridad")]
        public int PrioridadId { get; set; }

        public bool ProvieneDeSolicitud { get; set; }

        public int RemisionCliente { get; set; }

        [ForeignKey("RemisionInicial")]
        public int RemisionInicialId { get; set; }

        [ForeignKey("Responsable")]
        public int ResponsableId { get; set; }

        public string SerialHerramienta { get; set; }

        public string SerialMaterial { get; set; }

        public int TamanoHerramientaId { get; set; }

        public int TipoServicioId { get; set; }


        public virtual Cliente Cliente { get; set; }

        public virtual Catalogo Estado { get; set; }

        public virtual Herramienta Herramienta { get; set; }

        public virtual ClienteLinea ClienteLinea { get; set; }

        public virtual Catalogo Material { get; set; }

        public virtual Catalogo Prioridad { get; set; }

        public virtual DocumentoAdjunto RemisionInicial { get; set; }

        public virtual Catalogo Responsable { get; set; }
    }
}

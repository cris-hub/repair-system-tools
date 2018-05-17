using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pemarsa.Domain
{
    public class Herramienta : Entity
    {
        [ForeignKey("Cliente")]
        public int ClienteId { get; set; }

        public bool EsHerramientaMotor { get; set; }

        [Required]
        public bool EsHerramientaPetrolera { get; set; }

        public bool EsHerramientaPorCantidad { get; set; }

        [ForeignKey("Estado")]
        public int EstadoId { get; set; }

        [ForeignKey("EstudioFactibilidad")]
        public int EstudioFactibilidadId { get; set; }

        [Required]
        public Guid GuidUsuarioVerifica { get; set; }

        [Required]
        public string NombreUsuarioVerifica { get; set; }

        [ForeignKey("Linea")]
        public int LineaId { get; set; }

        [ForeignKey("Materiales")]
        public int MaterialesId { get; set; }

        public int Moc { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public IEnumerable<HerramientaTamano> TamanosHerramienta { get; set; }

        [Required]
        public IEnumerable<HerramientaTamanoMotor> TamanosMotor { get; set; }



        public virtual Cliente Cliente { get; set; }

        public virtual Catalogo Estado { get; set; }

        public virtual HerramientaEstudioFactibilidad HerramientaEstudioFactibilidad { get; set; }

        public virtual ClienteLinea Linea { get; set; }

        public virtual Catalogo Materiales { get; set; }
    }
}

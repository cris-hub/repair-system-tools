import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { TIPO_PROCESO, ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';
import { CatalogoModel } from '../../../common/models/CatalogoModel';
import { PaginacionModel } from '../../../common/models/PaginacionModel';
import { ProcesoModel } from '../../../common/models/ProcesoModel';
import { ParametrosModel } from '../../../common/models/ParametrosModel';

@Component({
  selector: 'app-listar-mecanizado',
  templateUrl: './listar-mecanizado.component.html',
  styleUrls: ['./listar-mecanizado.component.css']
})
export class ListarMecanizadoComponent implements OnInit {
  public paginacion: PaginacionModel = new PaginacionModel(1, 10);
  public tipoProcesoActual: CatalogoModel = new CatalogoModel();
  public Paramtros: ParametrosModel;
  public tipoProcesos: CatalogoModel[];
  public Procesos: Array<ProcesoModel>;
  public filter: string;

  constructor(
    private procesoService: ProcesoService,
    private parametroService: ParametroService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private datePipe: DatePipe

  ) {

  }



  ngOnInit() {
    this.consultarParemtros();
  }




  consultarParemtros() {
    this.parametroService.consultarParametrosPorEntidad('PROCESO').subscribe(response => {
      this.tipoProcesos = response.Catalogos.filter(catalogo => { return catalogo.Grupo == "TIPO_PROCESO" });
      this.Paramtros = response;
      this.obtenerTipoProceso(this.tipoProcesos);
    }, error => {
      console.log(error)
      this.toastrService.error(error.message)
    }, () => {
      this.consultarProcesos();
    });
  }

  obtenerTipoProceso(tiposProcesos: CatalogoModel[]) {
    this.tipoProcesoActual = tiposProcesos.find(proceso => { return proceso.Id == TIPO_PROCESO.MECANIZADOTORNO });
  }

  consultarProcesos() {
    if (this.tipoProcesoActual) {
      this.procesoService.consultarProcesosPorTipo(this.tipoProcesoActual, this.paginacion).subscribe(response => {
        this.Procesos = response.Listado.filter(d => d.EstadoId != ESTADOS_PROCESOS.Procesado)
        this.paginacion.CantidadRegistros = this.Procesos.length
        this.Procesos = response.Listado.filter(d => d.EstadoId != ESTADOS_PROCESOS.Procesado);
        this.Procesos.forEach((p) => {
          p.FechaRegistroVista = this.datePipe.transform(p.FechaRegistro, "dd/MM/yyyy, h:mm a");
          p.OrdenTrabajoId = p.OrdenTrabajo.Id;
          p.OrdenTrabajoHerramientaNombre = p.OrdenTrabajo.Herramienta.Nombre;
          p.OrdenTrabajoClienteNickName = p.OrdenTrabajo.Cliente.NickName;
          p.OrdenTrabajoSerialHerramienta = p.OrdenTrabajo.SerialHerramienta;
          p.OrdenTrabajoPrioridadValor = p.OrdenTrabajo.Prioridad.Valor;
          p.EstadoValor = p.Estado.Valor;
          p.TipoProcesoAnteriorValor = p.TipoProcesoAnterior.Valor;
        });
      }, error => {
        console.log(error)
        this.toastrService.error(error.message)
      });
    }
  }
  obtenerEstilos(proceso: ProcesoModel) {
    switch (proceso.EstadoId) {
      case ESTADOS_PROCESOS.Rechazado: return "rechadado";
    }
  }

  actualizarObservacionRechazo(event) {
    console.log(event)
    this.consultarProcesos();
  }

  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);

  }
  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;

  }

  primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }//convertir en pipe este metrodo
}

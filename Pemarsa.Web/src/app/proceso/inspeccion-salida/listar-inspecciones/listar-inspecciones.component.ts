import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity/index';
import { ActivatedRoute, Router } from '@angular/router';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { error } from 'util';
import { ToastrService } from 'ngx-toastr';
import { ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';
import { DatePipe } from '@angular/common';
import { CatalogoModel } from '../../../common/models/CatalogoModel';
import { PaginacionModel } from '../../../common/models/PaginacionModel';
import { ProcesoModel } from '../../../common/models/ProcesoModel';
import { ParametrosModel } from '../../../common/models/ParametrosModel';
import { FiltroParametrosProcesosoModel } from '../../../common/models/FiltroModel';


@Component({
  selector: 'app-listar-inspecciones',
  templateUrl: './listar-inspecciones.component.html',
  styleUrls: ['./listar-inspecciones.component.css']
})
export class ListarInspeccionesSalidaComponent implements OnInit {

  public  paginacion: PaginacionModel = new PaginacionModel(1, 20);
  public  tipoProcesoActual: CatalogoModel = new CatalogoModel();
  public  Paramtros: ParametrosModel;
  public  tipoProcesos: CatalogoModel[];
  public  Procesos: Array<ProcesoModel>;
  public filter: string
  constructor(
    private procesoService: ProcesoService,
    private parametroService: ParametroService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
  ) {

  }



  ngOnInit() {
    this.consultarParemtros();
  }




  consultarParemtros() {
    this.parametroService.consultarParametrosPorEntidad('PROCESO').subscribe(response => {
      this.tipoProcesos = response.Catalogos.filter(catalogo => { return catalogo.Grupo == "TIPO_PROCESO" });
      this.Paramtros = response;
      this.obtenerTipoProceso(this.tipoProcesos, 'salida');
    }, error => {
      console.log(error)
      this.toastrService.error(error.message)
    }, () => {
      this.consultarProcesos();
    });
  }



  obtenerTipoProceso(tiposProcesos: CatalogoModel[], procesoDesdeUrl: string) {
    this.tipoProcesoActual = tiposProcesos.find(proceso => { return proceso.Valor.toLowerCase().includes(procesoDesdeUrl) });
  }

  consultarProcesos() {
    if (this.tipoProcesoActual) {
      this.procesoService.consultarProcesosPorTipo(this.tipoProcesoActual, this.paginacion).subscribe(response => {
        this.Procesos = response.Listado.filter(d => d.EstadoId != ESTADOS_PROCESOS.Procesado);
        
        this.paginacion.CantidadRegistros = this.Procesos.length;
        this.Procesos.forEach((p) => {
          p.FechaRegistroVista = this.datePipe.transform(p.FechaRegistro, "dd/MM/yyyy, h:mm a");
          p.OrdenTrabajoId = p.OrdenTrabajo.Id;
          p.OrdenTrabajoHerramientaNombre = p.OrdenTrabajo.Herramienta.Nombre;
          p.OrdenTrabajoClienteNickName = p.OrdenTrabajo.Cliente.NickName;
          p.OrdenTrabajoSerialHerramienta = p.OrdenTrabajo.SerialHerramienta;
          p.EstadoValor = p.Estado.Valor;
          p.OrdenTrabajoPrioridadValor = p.OrdenTrabajo.Prioridad.Valor;
          p.TipoProcesoAnteriorValor = p.TipoProcesoAnterior.Valor;
        });
      }, error => {
        console.log(error)
        this.toastrService.error(error.message)
      });
    }
  }
  consultarProcesoPorFiltro(filtro: FiltroParametrosProcesosoModel) {
    filtro.PaginaActual = this.paginacion.PaginaActual;
    filtro.CantidadRegistros = this.paginacion.CantidadRegistros;
    filtro.TipoProceso = this.tipoProcesoActual.Valor;

    this.procesoService.consultarProcesosPorTipoPorFiltro(filtro)
      .subscribe(response => {
        this.Procesos = response.Listado.filter(d => d.EstadoId != ESTADOS_PROCESOS.Procesado);
        this.Procesos.forEach((p) => {
          p.FechaRegistroVista = this.datePipe.transform(p.FechaRegistro, "dd/MM/yyyy, h:mm a");
          p.OrdenTrabajoId = p.OrdenTrabajo.Id;
          p.OrdenTrabajoHerramientaNombre = p.OrdenTrabajo.Herramienta.Nombre;
          p.OrdenTrabajoClienteNickName = p.OrdenTrabajo.Cliente.NickName;
          p.OrdenTrabajoSerialHerramienta = p.OrdenTrabajo.SerialHerramienta;
          p.EstadoValor = p.Estado.Valor;
          p.OrdenTrabajoPrioridadValor = p.OrdenTrabajo.Prioridad.Valor;
          p.TipoProcesoAnteriorValor = p.TipoProcesoAnterior.Valor;
        });
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      });
  }


  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    this.consultarProcesos();
  }

  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;
    this.consultarProcesos();
  }
  primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

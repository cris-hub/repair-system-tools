import { Component, OnInit } from '@angular/core';
import { PaginacionModel, CatalogoModel, ProcesoModel, ParametrosModel } from 'src/app/common/models/Index';
import { ProcesoService } from 'src/app/common/services/entity';
import { ParametroService } from 'src/app/common/services/entity/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ESTADOS_PROCESOS } from 'src/app/proceso/inspeccion-enum/inspeccion.enum';
import { FiltroParametrosProcesosoModel } from 'src/app/common/models/FiltroModel';

@Component({
  selector: 'app-soldadura-listar',
  templateUrl: './soldadura-listar.component.html',
  styleUrls: ['./soldadura-listar.component.css']
})
export class SoldaduraListarComponent implements OnInit {


  public paginacion: PaginacionModel = new PaginacionModel(1, 20);
  public tipoProcesoActual: CatalogoModel = new CatalogoModel();
  public tipoProcesos: CatalogoModel[];
  public Procesos: Array<ProcesoModel>;
  public Paramtros: ParametrosModel;
  public filter: string

  constructor(
    private procesoService: ProcesoService,
    private parametroService: ParametroService,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.consultarParemtros();
  }



  consultarParemtros() {
    this.parametroService.consultarParametrosPorEntidad('PROCESO').subscribe(response => {
      this.tipoProcesos = response.Catalogos.filter(catalogo => { return catalogo.Grupo == "TIPO_PROCESO" });
      this.Paramtros = response;
      this.obtenerTipoProceso(this.tipoProcesos, 'soldadura');
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
        this.Procesos = response.Listado.filter(d => d.EstadoId != ESTADOS_PROCESOS.Procesado && d.Reasignado != false);
        this.Procesos.forEach((p) => {
          p.FechaRegistroVista = this.datePipe.transform(p.FechaRegistro, "dd/MM/yyyy, h:mm a");
          p.OrdenTrabajoId = p.OrdenTrabajo.Id;
          p.OrdenTrabajoHerramientaNombre = p.OrdenTrabajo.Herramienta.Nombre;
          p.OrdenTrabajoClienteNickName = p.OrdenTrabajo.Cliente.NickName;
          p.OrdenTrabajoSerialHerramienta = p.OrdenTrabajo.SerialHerramienta;
          p.EstadoValor = p.Estado.Valor;
          p.OrdenTrabajoPrioridadValor = p.OrdenTrabajo.Prioridad.Valor;
          if (p.TipoProcesoAnterior != null) {
            p.TipoProcesoAnteriorValor = p.TipoProcesoAnterior.Valor;
          }
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
  }//convertir en pipe este metrodo



}

import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProcesoModel, ParametrosModel, CatalogoModel, AttachmentModel, InspeccionModel } from '../../../common/models/Index';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { error } from 'protractor';
import { isNullOrUndefined } from 'util';
import { TIPO_PROCESO, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE, ALERTAS_ERROR_MENSAJE } from '../../inspeccion-enum/inspeccion.enum';
import { ProcesoInspeccionSalidaModel } from '../../../common/models/ProcesoInspeccionSalidaModel';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { create } from 'domain';
import { parse } from 'url';
import { LoaderService } from '../../../common/services/entity/loaderService';

@Component({
  selector: 'app-inspeccion-herramienta',
  templateUrl: './inspeccion-herramienta.component.html',
  styleUrls: ['./inspeccion-herramienta.component.css']
})
export class InspeccionHerramientaComponent implements OnInit {

  private Proceso: ProcesoModel = new ProcesoModel();
  private Parametros: ParametrosModel;
  private tipoProcesoActual: CatalogoModel = new CatalogoModel();
  private anexos: AttachmentModel[] = new Array<AttachmentModel>();
  private tiposProcesos: CatalogoModel[];
  private tiposInspecciones: CatalogoModel[];
  private tipoInspeccion: number;
  private tiposInspeccionesSeleccionadas: CatalogoModel[] = new Array<CatalogoModel>();
  private esPieza: boolean = false;
  private PiezaId: any;
  private esPorCantidad: boolean;
  private loading: boolean = false;
  private accion: string;

  constructor(
    private procesoService: ProcesoService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private loaderService: LoaderService,
    private parametrosService: ParametroService
  ) {
  }

  ngOnInit() {

    this.consultarParametros()

    this.consultarProceso();

  }


  //Consultar
  consultarProceso() {
    this.loaderService.display(true)
    this.procesoService.consultarProcesoPorGuid(this.obtenerProcesoDesdeUrl().get('proceso')).subscribe(response => {
      this.Proceso = response;


      this.esPorCantidad = this.Proceso.OrdenTrabajo.CantidadInspeccionar > 1;
      this.loaderService.display(false)


    }, error => {
      this.toastrService.error(error.message)
      this.loaderService.display(false)

    },
      () => {
        this.AgregarElemntosUI(this.tipoInspeccion);
        this.loading = false;
        this.loaderService.display(false)
      }
    );
  }
  obtenerTipoProceso(tiposProcesos: CatalogoModel[], procesoDesdeUrl: string) {
    this.tipoProcesoActual = tiposProcesos.find(proceso => { return proceso.Valor.toLowerCase().includes(procesoDesdeUrl) });
  }

  //Obtener Parametros uri
  consultarParametros() {
    this.parametrosService.consultarParametrosPorEntidad('PROCESO').subscribe(
      response => {
        this.Parametros = response;
        this.tiposInspecciones = response.Consultas;

        this.tiposProcesos = response.Catalogos.filter(catalogo => {
          return catalogo.Grupo ==
            "TIPO_PROCESO"
        });
        this.obtenerTipoProceso(this.tiposProcesos, this.obtenerTipoInspeccionDesdeUrl());

      }, error => {
        this.toastrService.error(error.message)
      }, () => {
      })
  }
  obtenerTipoInspeccionDesdeUrl(): string {
    return this.activedRoute.snapshot.url[1].path;
  }
  obtenerProcesoDesdeUrl(): Map<string, string> {
    let parametrosUlr: Map<string, string> = new Map<string, string>();
    this.PiezaId = this.obtenerPiezadesdeUrl()
    this.accionRealizar();

    parametrosUlr.set('proceso', this.ObtenerPtroceso());
    parametrosUlr.set('pieza', this.PiezaId);
    parametrosUlr.set('accion', this.accion);
    return parametrosUlr;
  }
  obtenerPiezadesdeUrl(): string {
    let index = this.activedRoute.snapshot.paramMap.get('index')
    if (!isNullOrUndefined(index)) {
      if ((!index.indexOf('procesar') && !index.indexOf('editar') && !index.indexOf('ver'))) {
        this.PiezaId = this.activedRoute.snapshot.paramMap.get('index')
      } else {
        this.PiezaId = this.activedRoute.snapshot.paramMap.get('index')
      }
    }
    return this.PiezaId
  }
  private ObtenerPtroceso(): string {
    return this.activedRoute.snapshot.paramMap.get('id');
  }
  private accionRealizar() {
    this.activedRoute.snapshot.url.forEach(url => url.path == 'procesar' || url.path == 'editar' || url.path == 'ver' ? this.accion = url.path : this.accion = undefined);
  }

  //Validaciones
  esPiezaPorCantidad() {

  }
  validacionVerFormularioPorCantidad() {
    if (this.Proceso.CantidadInspeccion > 1 && this.obtenerPiezadesdeUrl()) {
      return true
    }
  }




  //Herramientas Inspeccionar Rango Por cantidad inpeccionar De la orden de trabajo
  rangoHerramientasInspeccionar(cantidadInspeccionar) {
    var items: number[] = [];
    for (var i = 1; i <= cantidadInspeccionar; i++) {
      items.push(i);
    }
    return items;
  }


  //persistir
  procesar() {

  }
  persistirNuevaInspeccionSelecionada(guidProceso, tipoInspeccion) {
    this.loaderService.display(true)

    this.procesoService.crearInspeccion(guidProceso, tipoInspeccion, this.PiezaId).subscribe(
      response => {
        response ?
          this.toastrService.success(ALERTAS_OK_MENSAJE.InspeccionCreada) :
          this.toastrService.error(ALERTAS_ERROR_MENSAJE.InspeccionERRORcrear);
        this.loaderService.display(false)

      },
      error => {
        this.toastrService.error(error);
        this.loaderService.display(false)

      },
      () => {
        this.consultarProceso();
        this.loaderService.display(false)
      }
    )
  }
  quitarDeLaListaDeSeleccionDeInspecciones(inspecion) {
    

    let inspeccionEntrada: ProcesoInspeccionEntradaModel = this.Proceso.InspeccionEntrada.find(c => { return c.Inspeccion.TipoInspeccionId == inspecion.Id && c.Inspeccion.EstadoId == ESTADOS_INSPECCION.ENPROCESO })

    this.procesoService.actualizarEstadoInspeccion(inspeccionEntrada.Inspeccion.Guid, ESTADOS_INSPECCION.ANULADA).subscribe(response => {
      

      if (response) {
        let indexElementoSeleccionado = this.tiposInspeccionesSeleccionadas.findIndex(c => c.Id == inspecion.Id);
        this.tiposInspecciones.push(inspecion);
        this.tiposInspeccionesSeleccionadas.splice(indexElementoSeleccionado, 1);
        
        this.toastrService.success(ALERTAS_OK_MENSAJE.InspeccionEliminar)
      } else {

        this.toastrService.error(ALERTAS_ERROR_MENSAJE.InspeccionEliminar);
      }

    }, error => {
      this.toastrService.error(error);
       }, () => {
      this.consultarProceso();
      

    });


  }
  agregarAInspecccionesSeleccionadas(event) {
    this.tipoInspeccion = event.target.value;
    this.persistirNuevaInspeccionSelecionada(this.Proceso.Guid, this.tipoInspeccion);

    this.procesarInspeccionesSeleccionadas();

  }



  //inspecciones seleccionadas
  private AgregarElemntosUI(idInspeccionSeleccionada) {


    this.Proceso.InspeccionEntrada.forEach(inspecion => {
      this.tiposInspecciones.forEach(c => {
        if (c.Id == inspecion.Inspeccion.TipoInspeccionId && inspecion.Inspeccion.EstadoId == ESTADOS_INSPECCION.ENPROCESO && inspecion.Inspeccion.Pieza == this.PiezaId) {
          let indixe = this.tiposInspecciones.findIndex(c => c.Id == inspecion.Inspeccion.TipoInspeccionId)
          this.tiposInspecciones.splice(indixe, 1)
          this.tiposInspeccionesSeleccionadas.push(c)
        }
      })

    })





  }
  private procesarInspeccionesSeleccionadas() {
    if (this.tipoProcesoActual.Id == TIPO_PROCESO.INSPECCIONENTRADA) {
      let inspeccionEntrada: ProcesoInspeccionEntradaModel = new ProcesoInspeccionEntradaModel();
      this.Proceso.InspeccionEntrada = this.crearInspecciones<ProcesoInspeccionEntradaModel>(inspeccionEntrada);
    }
    else if (this.tipoProcesoActual.Id == TIPO_PROCESO.INSPECCIONSALIDA) {
      let inspeccionsalida: ProcesoInspeccionSalidaModel = new ProcesoInspeccionSalidaModel();
      this.Proceso.ProcesoInspeccionSalida = this.crearInspecciones<ProcesoInspeccionSalidaModel>(inspeccionsalida);
    }
  }
  crearInspecciones<Inspeccion>(Inspeccion: Inspeccion): Array<Inspeccion> {
    let inspeciones = new Array<Inspeccion>();
    this.tiposInspeccionesSeleccionadas.forEach(tipoInspeccion => {
      Inspeccion["Inspeccion"]["TipoInspeccionId"] = tipoInspeccion.Id
      Inspeccion["Inspeccion"]["TipoInspeccion"] = tipoInspeccion
      inspeciones.push(Inspeccion);
    })
    return inspeciones;
  }






}

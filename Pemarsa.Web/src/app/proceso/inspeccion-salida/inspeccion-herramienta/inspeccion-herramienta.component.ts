import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { error } from 'protractor';
import { isNullOrUndefined } from 'util';
import { TIPO_PROCESO, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE, ALERTAS_ERROR_MENSAJE, ESTADOS_PROCESOS, TIPO_INSPECCION } from '../../inspeccion-enum/inspeccion.enum';
import { create } from 'domain';
import { parse } from 'url';
import { LoaderService } from '../../../common/services/entity/loaderService';

import { escape } from 'querystring';
import { SugerirProcesoComponent } from '../../coordinador/sugerir-proceso/sugerir-proceso.component';
import { ProcesoModel } from '../../../common/models/ProcesoModel';
import { ProcesoInspeccion } from '../../../common/models/ProcesoInspeccionModel';
import { ParametrosModel } from '../../../common/models/ParametrosModel';
import { AttachmentModel } from '../../../common/models/AttachmentModel';
import { CatalogoModel } from '../../../common/models/CatalogoModel';
import { InspeccionModel } from '../../../common/models/InspeccionModel';

@Component({
  selector: 'app-inspeccion-herramienta',
  templateUrl: './inspeccion-herramienta.component.html',
  styleUrls: ['./inspeccion-herramienta.component.css']
})
export class InspeccionHerramientaComponent implements OnInit {
  @ViewChild(SugerirProcesoComponent) public sugerir: SugerirProcesoComponent;

  //Proceso
  private Proceso: ProcesoModel = new ProcesoModel();
  private Inspeccion: InspeccionModel = new InspeccionModel();
  public estadoProceso: string;
  public Iniciar: boolean = false;
  public ModalOcultar: boolean = false;
  //catalogo
  private Parametros: ParametrosModel;
  private tipoProcesoActual: CatalogoModel = new CatalogoModel();
  private anexos: AttachmentModel[] = new Array<AttachmentModel>();
  private tiposProcesos: CatalogoModel[];
  private tiposInspecciones: CatalogoModel[] = new Array<CatalogoModel>();
  private tipoInspeccion: number;
  private tiposInspeccionesSeleccionadas: CatalogoModel[] = new Array<CatalogoModel>();

  //validaciones
  public tieneProcesoSugerido: boolean = false;
  private esPieza: boolean = false;
  private inspeccionesEnProceso: boolean = false;
  private iniciarProcesar = false;
  private inspeccionesTerminada: boolean = false;
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
    this.loaderService.display(this.loading = true)
    this.procesoService.consultarProcesoPorGuid(this.obtenerProcesoDesdeUrl().get('proceso')).subscribe(response => {
      this.Proceso = response;
      this.estadoProceso = ESTADOS_PROCESOS[this.Proceso.EstadoId];
      this.esPorCantidad = this.Proceso.OrdenTrabajo.CantidadInspeccionar > 1;
      console.log(this.accion)
      this.obtenerEstadosDeLaInspeccion();


      this.loaderService.display(this.loading = false)

    }, error => {
      this.toastrService.error(error.message)
      this.loaderService.display(this.loading = false)


    },
      () => {
        this.loaderService.display(this.loading = false)

        this.AgregarElemntosUI(this.tipoInspeccion);

        this.consultarSiguienteInspeccion(this.Proceso.Guid);


      }
    );
  }

  obtenerTipoProceso(tiposProcesos: CatalogoModel[], procesoDesdeUrl: string) {
    this.tipoProcesoActual = tiposProcesos.find(proceso => { return proceso.Valor.toLowerCase().includes(procesoDesdeUrl) });

  }

  obtenerEstadosDeLaInspeccion() {
    if (this.tiposInspeccionesSeleccionadas.length > 0) {
      if (this.Proceso.TipoProcesoSiguienteSugeridoId) {
        this.tieneProcesoSugerido = true
      }
      console.log(this.tieneProcesoSugerido)

      if (this.Proceso.ProcesoInspeccion.filter(d => d.Inspeccion.EstadoId != ESTADOS_INSPECCION.ANULADA).every(d => d.Inspeccion.EstadoId == ESTADOS_INSPECCION.COMPLETADA)) {
        this.inspeccionesTerminada = true;
        this.ModalOcultar = true;
        this.abrirmodal();
      }
      else {
        this.inspeccionesTerminada = false

      }
      if (this.tiposInspeccionesSeleccionadas.some(t => t['estado'] == ESTADOS_INSPECCION[77] || t['estado'] == ESTADOS_INSPECCION[108] && this.procesoService.iniciarProcesar == true && this.Iniciar)
      ) {
        this.inspeccionesEnProceso = true
      } else { this.inspeccionesEnProceso = false }

    }
  }

  abrirmodal() {
    if (this.ModalOcultar) {
      setTimeout(function () {
        var element = document.getElementById("modalSugerir");
        if (element != null) {
          element.click();
        }
        this.ModalOcultar = false;
      }, 800);
    }
  }

  completarProcesoInspeccion(guidProceso: string) {
    if (this.Proceso.ProcesoInspeccion.filter(d => d.Inspeccion.EstadoId != ESTADOS_INSPECCION.ANULADA).every(d => d.Inspeccion.EstadoId == ESTADOS_INSPECCION.COMPLETADA) && this.Proceso.TipoProcesoSiguienteSugeridoId) {
      this.procesoService.actualizarEstadoProceso(this.Proceso.Guid, ESTADOS_PROCESOS.Procesado).subscribe(response => {
        if (response == true) {
          this.router.navigate(['inspeccion/salida'])
        };
      });
    }
    else if ((this.Proceso.ProcesoInspeccion.filter(d => d.Inspeccion.EstadoId != ESTADOS_INSPECCION.ANULADA)
      .every(d => d.Inspeccion.EstadoId == ESTADOS_INSPECCION.COMPLETADA)) && (!this.Proceso.TipoProcesoSiguienteSugeridoId)) {
      if (!this.ModalOcultar && this.inspeccionesTerminada) {
        this.ModalOcultar = false;
        this.procesoService.actualizarEstadoProceso(this.Proceso.Guid, ESTADOS_PROCESOS.Procesado).subscribe(response => {
          if (response == true) {
            this.ModalOcultar = false;
            this.router.navigate(['inspeccion/entrada'])
          };
        });
      }
    }
    else {
      this.router.navigate([
        'inspeccion/salida/' +
        this.obtenerProcesoDesdeUrl().get('proceso') + '/' +
        this.obtenerProcesoDesdeUrl().get('accion')]);
    }
  }

  consultarSiguienteInspeccion(guidProceso: string) {

    console.log(this.obtenerProcesoDesdeUrl().get('pieza'), this.inspeccionesEnProceso, this.inspeccionesTerminada, this.procesoService.iniciarProcesar)
    if (this.inspeccionesEnProceso) {

      this.procesoService.consultarSiguienteInspeccion(guidProceso, this.obtenerProcesoDesdeUrl().get('pieza')).subscribe(response => {
        this.Inspeccion = response;

        if (response == null) {
          this.completarProcesoInspeccion(guidProceso);
          this.procesoService.iniciarProcesar = false;
          this.router.navigate(['inspeccion/salida/']);

          return
        }
        if ((!this.Proceso.OrdenTrabajo.Herramienta.EsHerramientaMotor) && this.Inspeccion.TipoInspeccionId == TIPO_INSPECCION.visualdimensional) {
          this.router.navigate([
            'inspeccion/salida/visualdimensional/' +
            this.obtenerProcesoDesdeUrl().get('proceso') + '/' +
            this.obtenerProcesoDesdeUrl().get('pieza') + '/' +
            this.obtenerProcesoDesdeUrl().get('accion')]);

        } else {
          this.router.navigate([
            'inspeccion/salida/' +
            TIPO_INSPECCION[this.Inspeccion.TipoInspeccionId] + '/' +
            this.obtenerProcesoDesdeUrl().get('proceso') + '/' +
            this.obtenerProcesoDesdeUrl().get('pieza') + '/' +
            this.obtenerProcesoDesdeUrl().get('accion')]);
        }

        
      });
    }
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
  obtenerProcesoDesdeUrl(): Map<string, string> {
    let parametrosUlr: Map<string, string> = new Map<string, string>();
    this.Proceso.CantidadInspeccion == 1 ? this.PiezaId = 1 : this.PiezaId = this.obtenerPiezadesdeUrl()
    this.accionRealizar();

    parametrosUlr.set('proceso', this.ObtenerPtroceso());
    parametrosUlr.set('pieza', this.PiezaId);
    parametrosUlr.set('accion', this.accion);
    return parametrosUlr;
  }
  private accionRealizar() {
    this.activedRoute.snapshot.url.forEach(url => url.path == 'procesar' || url.path == 'editar' || url.path == 'ver' ? this.accion = url.path : this.accion = undefined);
  }
  obtenerTipoInspeccionDesdeUrl(): string {
    return 'salida'
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


  //Validaciones
  esListaPieza() {
    if (this.Proceso.CantidadInspeccion > 1 && !this.obtenerPiezadesdeUrl()) {
      return true
    } else {


      return false
    }
  }
  esPiezaUnica() {
    if (this.obtenerPiezadesdeUrl() || this.Proceso.CantidadInspeccion == 1) {
      return true
    } else {
      console.log('o')
      return false
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

    this.procesoService.iniciarProcesar = true
    this.Iniciar = true
    this.completarProcesoInspeccion(this.Proceso.Guid);
    this.actualizarEstadoProceso();
    this.actualizarEstadoInpeccionPieza();

    this.consultarSiguienteInspeccion(this.Proceso.Guid);
  }
  actualizarEstadoProceso() {
    if (this.Proceso.EstadoId == ESTADOS_PROCESOS.Pendiente) {
      this.procesoService.actualizarEstadoProceso(this.Proceso.Guid, 'En Proceso').subscribe(
        response => response, errorResponse => errorResponse, () => { })
    }
  }
  actualizarEstadoInpeccionPieza() {
    if (this.tiposInspeccionesSeleccionadas.length > 0) {
      if (this.tiposInspeccionesSeleccionadas.some(t => t['estado'] == ESTADOS_INSPECCION[108])) {
        this.procesoService.actualizarEstadoInspeccionPieza(this.Proceso.Guid, this.obtenerProcesoDesdeUrl().get('pieza'), ESTADOS_INSPECCION.ENPROCESO).subscribe(response => {
          if (response) {
            this.procesoService.iniciarProcesar = response
          }
        }, errorResponse => errorResponse, () => {
          this.consultarProceso()
        });
      } else if ((this.tiposInspeccionesSeleccionadas.every(t => t['estado'] == ESTADOS_INSPECCION[107]))) {
        this.router.navigate([
          'inspeccion/salida/']);
      }
    }
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


    let ProcesoInspeccionSalida: ProcesoInspeccion = this.Proceso.ProcesoInspeccion.find(c => { return c.Inspeccion.TipoInspeccionId == inspecion.Id && c.Inspeccion.EstadoId == ESTADOS_INSPECCION.PENDIENTE })

    this.procesoService.actualizarEstadoInspeccion(ProcesoInspeccionSalida.Inspeccion.Guid, ESTADOS_INSPECCION.ANULADA).subscribe(response => {


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

    this.Proceso.ProcesoInspeccion.forEach(inspecion => {
      this.tiposInspecciones.forEach(c => {
        if (c.Id == inspecion.Inspeccion.TipoInspeccionId
          && (inspecion.Inspeccion.EstadoId != ESTADOS_INSPECCION.ANULADA)
          && inspecion.Inspeccion.Pieza.toString() == this.obtenerProcesoDesdeUrl().get('pieza')) {
          let indixe = this.tiposInspecciones.findIndex(c => c.Id == inspecion.Inspeccion.TipoInspeccionId)
          this.tiposInspecciones.splice(indixe, 1)
          c['estado'] = ESTADOS_INSPECCION[inspecion.Inspeccion.EstadoId].toString();
          if (inspecion.Inspeccion.EstadoId == ESTADOS_INSPECCION.PENDIENTE) {
            this.inspeccionesEnProceso = false
          }
          console.log(c['estado'])

          this.tiposInspeccionesSeleccionadas.push(c)

        }
      })

    })
    this.obtenerEstadosDeLaInspeccion()

  }
  private procesarInspeccionesSeleccionadas() {
    if (this.tipoProcesoActual.Id == TIPO_PROCESO.INSPECCIONENTRADA) {
      let inspeccionEntrada: ProcesoInspeccion = new ProcesoInspeccion();
      this.Proceso.ProcesoInspeccion = this.crearInspecciones<ProcesoInspeccion>(inspeccionEntrada);
    }
    else if (this.tipoProcesoActual.Id == TIPO_PROCESO.INSPECCIONSALIDA) {
      let inspeccionsalida: ProcesoInspeccion = new ProcesoInspeccion();
      this.Proceso.ProcesoInspeccion = this.crearInspecciones<ProcesoInspeccion>(inspeccionsalida);
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


  // sugerir

  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {
    this.sugerir.llenarObjectoData(titulo, Mensaje, Cancelar, objData);
  }




  responseSugerenciaProceso(event) {
    if (event) {
      this.ModalOcultar = false;
      this.completarProcesoInspeccion(this.Proceso.Guid)

    }
  }

  regresar() {
    if (this.Proceso.CantidadInspeccion == 1) {
      this.router.navigate([
        'inspeccion/salida/'
      ]);
      return
    }
    this.router.navigate([
      'inspeccion/salida/' +
      this.obtenerProcesoDesdeUrl().get('proceso') + '/' +
      this.obtenerProcesoDesdeUrl().get('accion')]);

  }

  estanInpeccionesEnProceso(): boolean {
    let c = this.tiposInspeccionesSeleccionadas.every(d => d['estado'] == ESTADOS_INSPECCION[107] || d['estado'] == ESTADOS_INSPECCION[108]);
    return c
  }

  esEditar() {
    return !(this.accion == 'ver' || this.accion == 'procesar')
  }
  esVer() {
    return !(this.accion == 'editar' || this.accion == 'procesar')
  }

  esProcesar() {
    return !(this.accion == 'ver' || this.accion == 'editar')

  }


  estadoCompleta(pieza) {
    let inspecciones = this.Proceso.ProcesoInspeccion
      .filter(i => i.Inspeccion.Pieza == pieza)
      .filter(t => t.Inspeccion.EstadoId != ESTADOS_INSPECCION.ANULADA)
    if (inspecciones.length <= 0) {
      return false
    }
    let estado = inspecciones
      .every(i => i.Inspeccion.EstadoId == ESTADOS_INSPECCION.COMPLETADA);

    if (estado)
      return estado
    return estado
  }
}

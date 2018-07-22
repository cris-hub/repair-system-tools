import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProcesoModel, ParametrosModel, CatalogoModel, AttachmentModel, InspeccionModel } from '../../../common/models/Index';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { error } from 'protractor';
import { isNullOrUndefined } from 'util';
import { TIPO_PROCESO, ESTADOS_INSPECCION } from '../../inspeccion-enum/inspeccion.enum';
import { ProcesoInspeccionSalidaModel } from '../../../common/models/ProcesoInspeccionSalidaModel';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { create } from 'domain';

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
  private PiezaId:any ;
  private esPorCantidad: boolean = true;
  private loading: boolean = false;


  constructor(
    private procesoService: ProcesoService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private parametrosService: ParametroService
  ) {
  }

  ngOnInit() {
    
      this.consultarParametros() 
    
    this.consultarProceso();

  }

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

  esPiezaPorCantidad() {

  }

  obtenerTipoInspeccionDesdeUrl(): string {
    return this.activedRoute.snapshot.url[1].path;
  }

  obtenerProcesoDesdeUrl(): string[] {
    let parametrosUlr: string[] = new Array<string>();
    parametrosUlr.push(this.activedRoute.snapshot.paramMap.get('id'));
    this.PiezaId = 1;
    if (!isNullOrUndefined(this.activedRoute.snapshot.paramMap.get('index'))) {
      this.PiezaId = this.activedRoute.snapshot.paramMap.get('index')
      parametrosUlr.push(this.activedRoute.snapshot.paramMap.get('index'));
    }
    this.esPieza = !isNullOrUndefined(this.activedRoute.snapshot.paramMap.get('index'));
    return parametrosUlr;
  }

  obtenerTipoProceso(tiposProcesos: CatalogoModel[], procesoDesdeUrl: string) {
    this.tipoProcesoActual = tiposProcesos.find(proceso => { return proceso.Valor.toLowerCase().includes(procesoDesdeUrl) });
  }

  consultarProceso() {
    this.procesoService.consultarProcesoPorGuid(this.obtenerProcesoDesdeUrl()[0]).subscribe(response => {
      this.Proceso = response;


      this.esPorCantidad = this.Proceso.OrdenTrabajo.CantidadInspeccionar > 1; // cambiar por indice 1
    }, error => {
      this.toastrService.error(error.message)
    },
      () => {
        this.AgregarElemntosUI(this.tipoInspeccion);
        this.loading = false;

      }
    );
  }



  rangoHerramientasInspeccionar(cantidadInspeccionar) {
    var items: number[] = [];
    for (var i = 1; i <= cantidadInspeccionar; i++) {
      items.push(i);
    }
    return items;
  }



  quitarDeLaListaDeSeleccionDeInspecciones(inspecion) {
    this.loading = true;

    let inspeccionEntrada: ProcesoInspeccionEntradaModel = this.Proceso.InspeccionEntrada.find(c =>
    { return c.Inspeccion.TipoInspeccionId == inspecion.Id && c.Inspeccion.EstadoId == ESTADOS_INSPECCION.ENPROCESO})

    this.procesoService.actualizarEstadoInspeccion(inspeccionEntrada.Inspeccion.Guid, ESTADOS_INSPECCION.ANULADA).subscribe(response => {
      if (response) {
        let indexElementoSeleccionado = this.tiposInspeccionesSeleccionadas.findIndex(c => c.Id == inspecion.Id);
        this.tiposInspecciones.push(inspecion);
        this.tiposInspeccionesSeleccionadas.splice(indexElementoSeleccionado, 1);
        this.loading = false;

      }

    }, error => { console.log(error); }, () => {
      this.consultarProceso();

    });


  }

  agregarAInspecccionesSeleccionadas(event) {
    this.tipoInspeccion = event.target.value;
    this.persistirNuevaInspeccionSelecionada(this.Proceso.Guid, this.tipoInspeccion);

    this.procesarInspeccionesSeleccionadas();

  }

  persistirNuevaInspeccionSelecionada(guidProceso, tipoInspeccion) {
    this.loading = true;
    
    this.procesoService.crearInspeccion(guidProceso, tipoInspeccion,this.PiezaId).subscribe(
      response => { },
      error => { },
      () => {
        this.consultarProceso();

      }
    )
  }


  private AgregarElemntosUI(idInspeccionSeleccionada) {


    this.Proceso.InspeccionEntrada.forEach(inspecion => {
      this.tiposInspecciones.forEach(c => {
        if (c.Id == inspecion.Inspeccion.TipoInspeccionId && inspecion.Inspeccion.EstadoId == ESTADOS_INSPECCION.ENPROCESO && inspecion.Inspeccion.Pieza == this.PiezaId ) {
          let indixe = this.tiposInspecciones.findIndex(c => c.Id == inspecion.Inspeccion.TipoInspeccionId)
          this.tiposInspecciones.splice(indixe, 1)
          this.tiposInspeccionesSeleccionadas.push(c)
        }
      })

    })





  }

  procesar() {

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

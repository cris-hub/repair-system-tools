import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { InspeccionModel, EntidadModel, ProcesoModel, InspeccionEspesorModel } from '../../../common/models/Index';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION, ESTADOS_INSPECCION, ALERTAS_OK_MENSAJE, ALERTAS_ERROR_MENSAJE, ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';
import { Location } from '@angular/common';
import { ProcesoInspeccionSalidaModel } from '../../../common/models/ProcesoInspeccionSalidaModel';

@Component({
  selector: 'app-ut',
  templateUrl: './ut.component.html',
  styleUrls: ['./ut.component.css']
})
export class UTComponent implements OnInit {


  //catalogos
  public  BloquesEscalonados: EntidadModel[] = new Array<EntidadModel>();

  //procesoInpeccion
  public  proceso: ProcesoModel;
  public  inspeccion: InspeccionModel = new InspeccionModel();
  public  InspeccionEspesores: Array<InspeccionEspesorModel> = new Array<InspeccionEspesorModel>();

  //form
  public  formulario: FormGroup;
  public  FormularioEspesores: FormArray;
  public  esFormularioValido: Boolean = false;
  public  esVer: Boolean = false;

  //validaciones
  public  tieneCalibracion: boolean;


  constructor(
    private location: Location,
    private procesoService: ProcesoService,
    private parametroService: ParametroService,
    private toastrService: ToastrService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private formBuider: FormBuilder,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {

    this.consultarProceso();
  }

  listarBloquesEvent(event) {
    if (event == 'true') {
      this.parametroService.consultarParametrosPorEntidad(ENTIDADES.INSPECCION).subscribe(response => {
        this.BloquesEscalonados = response.Catalogos.filter(equpo => equpo.Grupo == GRUPOS.TIPOSBLOQUEESCALONADOO);
      })
      this.formulario.controls['BloqueEscalonadoUsadoId'].setValidators(Validators.required)
      this.formulario.controls['BloqueEscalonadoUsadoId'].updateValueAndValidity()
    } else {
      this.formulario.controls['BloqueEscalonadoUsadoId'].setValidators(null);
      this.formulario.controls['BloqueEscalonadoUsadoId'].reset(null);
      this.formulario.controls['BloqueEscalonadoUsadoId'].updateValueAndValidity()
    }

  }

  obtenerParametrosRuta() {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('procesoId', this.activedRoute.snapshot.paramMap.get('id'));
    parametrosUlrMap.set('pieza', this.activedRoute.snapshot.paramMap.get('index'));
    parametrosUlrMap.set('tipoInspeccion', this.activedRoute.snapshot.url[0].path);
    parametrosUlrMap.set('accion', this.activedRoute.snapshot.url[3].path);

    return parametrosUlrMap;
  }
  consultarProceso() {
    this.iniciarFormulario(new InspeccionModel());
    this.loaderService.display(true)
    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {
        this.proceso = response
        let ProcesoInspeccionSalida: ProcesoInspeccionSalidaModel = response.ProcesoInspeccionSalida.find(c => {
          return (
            c.Inspeccion.TipoInspeccionId
            == TIPO_INSPECCION[this.obtenerParametrosRuta().get('tipoInspeccion')]
            && c.Inspeccion.EstadoId == ESTADOS_INSPECCION.ENPROCESO)
          
        });

        this.inspeccion = ProcesoInspeccionSalida.Inspeccion;
        
        console.log(this.inspeccion)
        this.loaderService.display(false)
      }, error => {

      }, () => {


        this.inspeccion ? this.iniciarFormulario(this.inspeccion) : this.iniciarFormulario(new InspeccionModel());
        if (this.proceso.OrdenTrabajo.Herramienta.EsHerramientaMotor) {

          this.initFormularioEspesores();
        }
      });
  }



  //actualizaciones
  procesar() {
    this.procesoService.iniciarProcesar = true
    this.asignarDataDesdeElFormulario();
    this.esFormularioValido = this.sonValidosLosDatosIngresadosPorElUsuario(this.formulario);
    if (this.esFormularioValido) {
      this.actualizarDatos()
    }

  }

  sonValidosLosDatosIngresadosPorElUsuario(formulario: FormGroup) {
    let valido: boolean;

    valido = this.formularioValido(formulario, valido);

    return valido
  }
  private formularioValido(formulario: FormGroup, valido: boolean) {
    formulario.status
      == 'VALID'
      ? valido = true
      : valido = false;
    return valido;
  }

  actualizarDatos() {
    this.loaderService.display(true)
    this.procesoService.actualizarInspección(this.inspeccion).subscribe(
      response => {
        if (response) {
          this.toastrService.success(ALERTAS_OK_MENSAJE.InspeccionActualizada)
        } else
          this.toastrService.error(ALERTAS_ERROR_MENSAJE.InspeccionERRORactualizar);

        this.loaderService.display(false)

      }, error => {
        this.toastrService.error(error.messge);
        this.loaderService.display(false)
      }, () => {
        this.consultarSiguienteInspeccion(this.proceso.Guid);

        this.loaderService.display(false)
      })
  }

  consultarSiguienteInspeccion(guidProceso: string) {

    console.log(this.obtenerParametrosRuta().get('pieza'), this.procesoService.iniciarProcesar)
    if (this.proceso.EstadoId == ESTADOS_PROCESOS["En Proceso"] && this.obtenerParametrosRuta().get('pieza') && this.procesoService.iniciarProcesar) {

      this.procesoService.consultarSiguienteInspeccion(guidProceso, this.obtenerParametrosRuta().get('pieza')).subscribe(response => {
        this.inspeccion = response;

        if (response == null) {
          this.completarProcesoInspeccion(guidProceso);
          this.procesoService.iniciarProcesar = false;
          this.router.navigate([
            'inspeccion/salida/' +
            this.obtenerParametrosRuta().get('procesoId') + '/' +
            this.obtenerParametrosRuta().get('pieza') + '/' +
            this.obtenerParametrosRuta().get('accion')]);
          return
        }
        this.router.navigate([
          'inspeccion/salida/' +
          TIPO_INSPECCION[this.inspeccion.TipoInspeccionId] + '/' +
          this.obtenerParametrosRuta().get('procesoId') + '/' +
          this.obtenerParametrosRuta().get('pieza') + '/' +
          this.obtenerParametrosRuta().get('accion')]);
      });
    }
  }
  completarProcesoInspeccion(guidProceso: string) {
    debugger
    if (this.proceso.ProcesoInspeccionSalida.filter(d => d.Inspeccion.EstadoId != ESTADOS_INSPECCION.ANULADA).every(d => d.Inspeccion.EstadoId == ESTADOS_INSPECCION.COMPLETADA)) {
      this.procesoService.actualizarEstadoProceso(this.proceso.Guid, ESTADOS_PROCESOS.Procesado).subscribe(response => {
        if (response) {
          this.router.navigate(['inspeccion/salida'])
        };
      });
    }
  }

  private asignarDataDesdeElFormulario() {

    Object.assign(this.inspeccion, this.formulario.value);
  }

  //forms
  //form esperos
  iniciarFormulario(inspeccion: InspeccionModel) {
    this.formulario = this.formBuider.group({
      tieneCalibracion: [this.tieneCalibracion, Validators.required],
      BloqueEscalonadoUsadoId: [inspeccion.BloqueEscalonadoUsadoId],
      Espesores: this.formBuider.array([])
    });
  }

  initFormularioEspesores() {
    this.FormularioEspesores = this.formulario.get('Espesores') as FormArray;
    console.log(this.FormularioEspesores);
    console.log(this.InspeccionEspesores);

    this.FormularioEspesores.push(this.crearNuevoFormGroupFormuarilEspesoor());

    if ((this.InspeccionEspesores.length > 0)) {
      this.InspeccionEspesores.forEach(f => {
        let form = this.formBuider.group({
          Desviacion: [f.Desviacion, Validators.required],
          EspesorActual: [f.EspesorActual, Validators.required],
          EspesorNominal: [f.EspesorNominal, Validators.required]
        });
        this.FormularioEspesores.push(form)
      });
    }

  }

  agregarItem(): void {
    this.FormularioEspesores = this.formulario.get('Espesores') as FormArray;
    this.FormularioEspesores.push(this.crearNuevoFormGroupFormuarilEspesoor());
    console.log(this.FormularioEspesores);
  }

  crearNuevoFormGroupFormuarilEspesoor(): any {
    let formatoParametrosModel = this.formBuider.group({
      Desviacion: '',
      EspesorActual: '',
      EspesorNominal: ''
    });


    return formatoParametrosModel;
  }

  removerItem(i) {
    this.FormularioEspesores.removeAt(i);
  }



}

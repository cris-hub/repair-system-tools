import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SiguienteProcesoComponent } from 'src/app/proceso/coordinador/siguiente-proceso/siguiente-proceso.component';
import { ProcesoService } from 'src/app/common/services/entity';
import { LoaderService } from 'src/app/common/services/entity/loaderService';
import { ToastrService } from 'ngx-toastr';
import { ProcesoModel, EntidadModel } from 'src/app/common/models/Index';
import { ESTADOS_PROCESOS, ALERTAS_OK_MENSAJE, ALERTAS_ERROR_MENSAJE } from 'src/app/proceso/inspeccion-enum/inspeccion.enum';
import { Location } from '@angular/common';
import { ProcesoRealizarModel } from 'src/app/common/models/ProcesoRealizarModel';
import { SugerirProcesoComponent } from 'src/app/proceso/coordinador/sugerir-proceso/sugerir-proceso.component';
import { EquipoMedicionComponent } from 'src/app/proceso/common-proceso/equipo-medicion/equipo-medicion.component';

@Component({
  selector: 'app-alistamiento-procesar',
  templateUrl: './alistamiento-procesar.component.html',
  styleUrls: ['./alistamiento-procesar.component.css']
})
export class AlistamientoProcesarComponent implements OnInit {

  @ViewChild(SiguienteProcesoComponent) public siguienteProceso: SiguienteProcesoComponent;
  @ViewChild(SugerirProcesoComponent) public sugerir: SugerirProcesoComponent;
  //proceso
  public proceso: ProcesoModel = new ProcesoModel();
  public procesoRealizar: ProcesoRealizarModel[] = new Array<ProcesoRealizarModel>();

  //formulario
  public formularioAsignacion: FormGroup
  public formularioTrabajoRealizado: FormGroup
  public esFormularioValido: Boolean = false;

  //accion
  public accion: string;

  constructor(
    private location: Location,
    private procesoService: ProcesoService,
    private toastrService: ToastrService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private formBuider: FormBuilder,
    private loaderService: LoaderService
  ) {

  }

  ngOnInit() {
    this.consultarProceso();

  }


  //consultas
  consultarProceso() {
    this.loaderService.display(true)
    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {
        this.proceso = response;
        this.procesoRealizar = response.ProcesoRealizar;
        this.accionRealizar(this.proceso.EstadoId)
        console.log(this.proceso)
      }, error => {

      }, () => {
        this.loaderService.display(false)
      });
  }

  //parametrosUri
  obtenerParametrosRuta() {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('procesoId', this.activedRoute.snapshot.paramMap.get('id'));
    return parametrosUlrMap;
  }

  //iniciar formulario
  iniciarformularioAsignacion(formularioAsignacion: FormGroup) {
    this.formularioAsignacion = formularioAsignacion;
  }
  iniciarformularioTrabajoRealizado(formularioTrabajoRealizado: FormGroup) {
    this.formularioTrabajoRealizado = formularioTrabajoRealizado;
  }

  //accionRealizar
  accionRealizar(estadoId: number) {
    switch (estadoId) {
      case ESTADOS_PROCESOS.Pendiente:
        this.accion = 'Asignar'
        break;
      case ESTADOS_PROCESOS.Asignado:
        this.accion = 'Completar'
        break;
      case ESTADOS_PROCESOS.Completado:
        this.accion = 'Liberar'
        break;
      default:
    }
  }

  //procesar
  //procesar
  procesar() {
    if ((!this.formularioAsignacion.valid || !this.formularioTrabajoRealizado.valid)) {
      this.toastrService.error('Faltan datos por diligenciar');
      this.esFormularioValido = false;
      return;
    }
    this.asignarDatosProceso()
    this.actualizarDatos();

  }
  asignarDatosProceso() {
    if (this.accion == 'Asignar') {

      Object.assign(this.proceso, this.formularioAsignacion.value)
    } else {
      Object.assign(this.proceso, this.formularioTrabajoRealizado.value)
    }
  }

  //persistir
  actualizarDatos() {

    this.loaderService.display(true);
    this.procesoService.actualizarProceso(this.proceso).subscribe(
      response => {
        response ?
          this.toastrService.success(ALERTAS_OK_MENSAJE.InspeccionActualizada) :
          this.toastrService.error(ALERTAS_ERROR_MENSAJE.InspeccionERRORactualizar);
        this.location.back();
      }, error => {
        this.toastrService.error(error);
        this.loaderService.display(false)

      }, () => {
        this.loaderService.display(false)

      })
  }

  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {
    this.sugerir.llenarObjectoData(titulo, Mensaje, Cancelar, objData);
  }

  responseSugerenciaProceso(event) {
    if (event) {
      this.procesoService.actualizarEstadoProceso(this.proceso.Guid, ESTADOS_PROCESOS.Procesado).subscribe(response => {
        if (response == true) {
          this.router.navigate(['alistamiento'])
        };
      });

    }
  }


}

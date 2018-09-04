import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroProcesoComponent } from '../../filtro-proceso/filtro-proceso.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ProcesoService } from '../../../common/services/entity';
import { OrdenTrabajoService } from '../../../common/services/entity/orden-trabajo.service';
import { SiguienteProcesoComponent } from 'src/app/proceso/coordinador/siguiente-proceso/siguiente-proceso.component';
import { SugerirProcesoComponent } from 'src/app/proceso/coordinador/sugerir-proceso/sugerir-proceso.component';
import { EquipoMedicionComponent } from 'src/app/proceso/common-proceso/equipo-medicion/equipo-medicion.component';
import { FormGroup } from '@angular/forms';
import { ESTADOS_PROCESOS, ALERTAS_OK_MENSAJE, ALERTAS_ERROR_MENSAJE } from 'src/app/proceso/inspeccion-enum/inspeccion.enum';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ProcesoModel } from '../../../common/models/ProcesoModel';

@Component({
  selector: 'app-mecanizado-fresa-procesar',
  templateUrl: './mecanizado-fresa-procesar.component.html',
  styleUrls: ['./mecanizado-fresa-procesar.component.css']
})
export class MecanizadoFresaProcesarComponent implements OnInit {

  @ViewChild(SiguienteProcesoComponent) public siguienteProceso: SiguienteProcesoComponent;
  @ViewChild(SugerirProcesoComponent) public sugerir: SugerirProcesoComponent;
  @ViewChild(EquipoMedicionComponent) public equipoMedicion: EquipoMedicionComponent;


  public proceso: ProcesoModel;


  public formularioAsignacion: FormGroup
  public formularioTrabajoRealizado: FormGroup
  public formularioEquipoMedicion: FormGroup
  public esFormularioValido: Boolean = false;

  public accion: string;

  constructor(
    private activedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private toastrService: ToastrService,
    private location: Location,
    private procesoService: ProcesoService,
    private router: Router,
    private ordenTrabajoService: OrdenTrabajoService,
  ) { }

  ngOnInit() {
    this.consultarProceso();
  }

  obtenerParametrosRuta() {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('procesoId', this.activedRoute.snapshot.paramMap.get('id'));
    return parametrosUlrMap;
  }


  consultarProceso() {
    this.loaderService.display(true)
    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {
        this.proceso = response;
        this.accionRealizar(this.proceso.EstadoId)
        console.log(this.proceso)
      }, error => {

      }, () => {
        this.loaderService.display(false)
      });
  }



  //iniciar formulario
  iniciarformularioAsignacion(formularioAsignacion: FormGroup) {
    this.formularioAsignacion = formularioAsignacion;
  }
  iniciarformularioTrabajoRealizado(formularioTrabajoRealizado: FormGroup) {
    this.formularioTrabajoRealizado = formularioTrabajoRealizado;
  }
  iniciarformularioEquipoMedicion(formularioEquipoMedicion: FormGroup) {
    this.formularioEquipoMedicion = formularioEquipoMedicion;
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

  ///
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
          this.location.back();
        };
      });

    }
  }

}







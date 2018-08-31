import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { SiguienteProcesoComponent } from 'src/app/proceso/coordinador/siguiente-proceso/siguiente-proceso.component';
import { SugerirProcesoComponent } from 'src/app/proceso/coordinador/sugerir-proceso/sugerir-proceso.component';
import { ProcesoModel, ParametrosModel, CatalogoModel, DetalleSoldaduraModel } from 'src/app/common/models/Index';
import { ProcesoRealizarModel } from 'src/app/common/models/ProcesoRealizarModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcesoService } from 'src/app/common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/common/services/entity/loaderService';
import { ESTADOS_PROCESOS, ALERTAS_OK_MENSAJE, ALERTAS_ERROR_MENSAJE } from 'src/app/proceso/inspeccion-enum/inspeccion.enum';
import { Location } from '@angular/common';
import { ParametroService } from 'src/app/common/services/entity/parametro.service';
import { ValidacionDirective } from '../../../common/directivas/validacion/validacion.directive';

@Component({
  selector: 'app-soldadura-procesar',
  templateUrl: './soldadura-procesar.component.html',
  styleUrls: ['./soldadura-procesar.component.css']
})
export class SoldaduraProcesarComponent implements OnInit {

  @ViewChild(SiguienteProcesoComponent) public siguienteProceso: SiguienteProcesoComponent;
  @ViewChild(SugerirProcesoComponent) public sugerir: SugerirProcesoComponent;
  //proceso
  public proceso: ProcesoModel = new ProcesoModel();
  public detalleSoldadura: DetalleSoldaduraModel = new DetalleSoldaduraModel();
  public procesoRealizar: ProcesoRealizarModel[] = new Array<ProcesoRealizarModel>();

  //formulario
  public formularioAsignacion: FormGroup
  public formularioTrabajoRealizado: FormGroup
  public formularioTrazabilidadProceso: FormGroup
  public formularioTipoSoldadura: FormGroup
  public esFormularioValido: Boolean = false;

  public ocultar: boolean = true;
  public volverConsultar: boolean = false;
  public guidDetalleSoldadura: string;


  public parametros: ParametrosModel;
  public tipoSoldadura: CatalogoModel[] = new Array<CatalogoModel>();

  //accion
  public accion: string;

  constructor(
    private location: Location,
    private procesoService: ProcesoService,
    private toastrService: ToastrService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private formBuider: FormBuilder,
    private loaderService: LoaderService,
    private parametroSrv: ParametroService
  ) {
    this.detalleSoldadura = new DetalleSoldaduraModel();
  }

  ngOnInit() {
    this.consultarProceso();
    this.consultarParametros();
    this.iniciarFormulario(this.proceso);
  }


  //consultas
  consultarProceso() {
    this.loaderService.display(true)
    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {
        this.proceso = response;
        this.procesoRealizar = response.ProcesoRealizar;
        this.accionRealizar(this.proceso.EstadoId);
        this.validarSoldadura(this.proceso.TipoSoldaduraId);
        this.iniciarFormulario(this.proceso);
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
  iniciarformularioSoldadura(formularioTrazabilidadProceso: FormGroup) {
    this.formularioTrazabilidadProceso = formularioTrazabilidadProceso;
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


  validarSoldadura(idTipoldadura: number) {
    if (idTipoldadura != null) {
      this.ocultar = false;
      this.volverConsultar = false;
    }
  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad("PROCESO")
      .subscribe(response => {
        this.parametros = response;
        this.tipoSoldadura = response.Catalogos.filter(e => e.Grupo == "TIPO_SOLDADURA_PROCESO");
      });
  }

  iniciarFormulario(proceso: ProcesoModel) {
    this.formularioTipoSoldadura = this.formBuider.group({
      TipoSoldaduraId: [this.proceso.TipoSoldaduraId, Validators.required]
    })
  }

  procesar() {
    //debugger;
    if (this.formularioAsignacion != undefined && this.formularioTrabajoRealizado != undefined) {

      if ((!this.formularioAsignacion.valid || !this.formularioTrabajoRealizado.valid || !this.formularioTrazabilidadProceso.valid)) {
        this.toastrService.error('Faltan datos por diligenciar');
        this.esFormularioValido = false;
        return;
      }
      this.detalleSoldadura = new DetalleSoldaduraModel();
      this.asignarDatosProceso();
      if (this.accion == 'Asignar') {
        this.actualizarDatos();
      } else {
        this.crearDetalleSoldadura();
      }
    } else {
      if (this.formularioTipoSoldadura.valid) {
        Object.assign(this.proceso, this.formularioTipoSoldadura.value)
        this.volverConsultar = true;
        this.actualizarDatos();
      }
    }

  }
  asignarDatosProceso() {
    if (this.accion == 'Asignar') {
      Object.assign(this.proceso, this.formularioAsignacion.value)
    } else {
      Object.assign(this.proceso, this.formularioTrabajoRealizado.value)
      Object.assign(this.detalleSoldadura, this.formularioTrazabilidadProceso.value)
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

      }, error => {
        this.toastrService.error(error);
        this.loaderService.display(false)

      }, () => {
        this.loaderService.display(false)
        this.ocultar = false;
        if (this.volverConsultar) {
          this.consultarProceso();
        }
        else {
          this.location.back();
        }
      })
  }

  crearDetalleSoldadura() {
    this.procesoService.crearDetalleSoldadura(this.detalleSoldadura).subscribe(
      response => {
        this.guidDetalleSoldadura = response;
      }, error => {

      }, () => {
        this.consultarDetalleSoldaduraPorGuid(this.guidDetalleSoldadura);
      }

    );
  }


  consultarDetalleSoldaduraPorGuid(guid: string) {
    this.procesoService.consultarDetalleSoldaduraPorGuid(guid).subscribe(
      response => {
        this.proceso.DetalleSoldaduraId = response.Id;
      }, error => {

      }, () => {
        this.actualizarDatos();
      }
);
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

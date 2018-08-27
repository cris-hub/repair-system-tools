import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, } from '@angular/router';
import { Location } from '@angular/common';
import { SiguienteProcesoComponent } from '../siguiente-proceso/siguiente-proceso.component';
import { ProcesoModel } from '../../../common/models/Index';
import { ProcesoService } from '../../../common/services/entity';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ALERTAS_OK_MENSAJE, ALERTAS_ERROR_MENSAJE } from '../../inspeccion-enum/inspeccion.enum';


@Component({
  selector: 'app-procesar-oit',
  templateUrl: './procesar-oit.component.html',
  styleUrls: ['./procesar-oit.component.css']
})
export class ProcesarOitComponent implements OnInit {
  @ViewChild(SiguienteProcesoComponent) public siguienteProceso: SiguienteProcesoComponent;



  //procesoInpeccion
  public proceso: ProcesoModel = new ProcesoModel();


  //form

  public esFormularioValido: Boolean = false;

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

  actualizarDatos() {
    this.loaderService.display(true)
    this.procesoService.crearProceso(this.proceso).subscribe(
      response => {
        response ?
          this.toastrService.success(ALERTAS_OK_MENSAJE.InspeccionActualizada) :
          this.toastrService.error(ALERTAS_ERROR_MENSAJE.InspeccionERRORactualizar);
        this.location.back();
      }, error => {
        this.toastrService.info(error);
      }, () => {
        this.loaderService.display(true)

      })
  }


  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {
    this.siguienteProceso.llenarObjectoData(titulo, Mensaje, Cancelar, objData);
  }


}

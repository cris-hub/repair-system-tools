import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProcesoModel, ParametrosModel, CatalogoModel } from '../../../common/models/Index';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { error } from 'protractor';

@Component({
  selector: 'app-inspeccion-herramienta',
  templateUrl: './inspeccion-herramienta.component.html',
  styleUrls: ['./inspeccion-herramienta.component.css']
})
export class InspeccionHerramientaComponent implements OnInit {

  private Proceso: ProcesoModel

  private Parametros: ParametrosModel;

  private tiposInspecciones: CatalogoModel;

  constructor(
    private procesoService: ProcesoService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private parametrosService: ParametroService
  ) {
    this.obtenerProcesoDesdeUrl()
  }



  ngOnInit() {
  }

  obtenerProcesoDesdeUrl(): string {
    return this.activedRoute.snapshot.paramMap.get('id');
  }

  consultarParametros() {
    this.parametrosService.consultarParametrosPorEntidad('PROCESO').subscribe(
      response => {
        this.Parametros = response;
        
      }, error => {
        this.toastrService.error(error.message)
      }, () => {
        this.consultarProceso();
      })
  }

  consultarProceso() {
    this.procesoService.consultarProcesoPorGuid(this.obtenerProcesoDesdeUrl()).subscribe(response => {
      this.Proceso = response
    }, error => {
      this.toastrService.error(error.message)
    });
  }

}

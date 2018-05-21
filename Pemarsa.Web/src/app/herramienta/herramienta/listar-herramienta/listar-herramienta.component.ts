import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";

import { HerramientaService } from '../../../common/services/entity/index';
import { PaginacionModel } from '../../../common/models/PaginacionModel';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ParametrosModel } from '../../../common/models/ParametrosModel';
import { ConfirmacionComponent } from '../../../common/directivas/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';
import { HerramientaModel } from "../../../common/models/Index";
@Component({
  selector: 'app-listar-herramienta',
  templateUrl: './listar-herramienta.component.html'
})
export class ListarHerramientaComponent implements OnInit {
  private registroSeleccionado: string;
  private herramientas: HerramientaModel[];
  // paginacion
  private paginacion: PaginacionModel;
  private parametros: ParametrosModel;
  private esFiltrar: boolean = false;

  constructor(
    public herramientaSrv: HerramientaService,
    public parametroSrv: ParametroService,
    private toastr: ToastrService) {
    this.paginacion = new PaginacionModel(1, 30);
    this.parametros = new ParametrosModel();
  }

  ngOnInit() {
    this.ConsultarHerramientas();
  }

  ConsultarHerramientas() {
    this.herramientaSrv.ConsultarHerramientas(this.paginacion)
      .subscribe(response => {
        this.herramientas = response.Listado;
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      });
    
  }

  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    this.ConsultarHerramientas();
  }

  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;
    this.ConsultarHerramientas();
  }
}

import { Component, OnInit, Output, HostListener, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ParametroService } from '../../common/services/entity/parametro.service';
import { FiltroOrdenTrabajoModel, CatalogoModel, ParametrosModel } from '../../common/models/Index';

@Component({
  selector: 'app-filtro-orden-trabajo',
  templateUrl: './filtro-orden-trabajo.component.html',
  styleUrls: ['./filtro-orden-trabajo.component.css']
})
export class FiltroOrdenTrabajoComponent  {

  public frmFiltroOit: FormGroup;
  public filtro: any;

  public NumeroOIT: string;
  public FechaCreacion: string;
  public FechaFinalizacion: string;
  public Remision: string;
  public Estado: number;
  public Responsable: number;
  public TipoServio: number;


  public TipoServicios: CatalogoModel[] = new Array<CatalogoModel>();
  public Estados: CatalogoModel[] = new Array<CatalogoModel>();
  public Responsables: CatalogoModel[] = new Array<CatalogoModel>();
  private parametros: ParametrosModel;
  @Output() paramsFiltro = new EventEmitter();



  constructor(private frmBuilder: FormBuilder, public parametroSrv: ParametroService) {
    this.filtro = new FiltroOrdenTrabajoModel(1, 30);
    this.initForm();
    this.consultarParametros();
  }

  initForm() {
    this.frmFiltroOit = this.frmBuilder.group({
      NumeroOIT: [this.filtro.NumeroOIT],
      FechaCreacion: [this.filtro.FechaCreacion],
      Remision: [this.filtro.Remision],
      Estado: [this.filtro.Estado],
      Responsable: [this.filtro.Responsable],
      TipoServio: [this.filtro.TipoServio]
    });
  }
  submitFiltro(filtroGroup: any) {
    this.filtro = <FiltroOrdenTrabajoModel>filtroGroup;
    this.paramsFiltro.emit(this.filtro);
  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad("ORDEN_TRABAJO")
      .subscribe(response => {
        this.parametros = response;
        this.TipoServicios = this.parametros.Catalogos.filter(e => e.Grupo == "TIPO_SERVICIO_ORDEN_TRABAJO");
        this.Estados = this.parametros.Catalogos.filter(e => e.Grupo == "ESTADOS_ORDENTRABAJO");
        this.Responsables = this.parametros.Catalogos.filter(e => e.Grupo == "RESPONSABLES");
      });
  }

  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    if (event.target.tagName == "SELECT") {
      event.stopPropagation();
    }
  }

}

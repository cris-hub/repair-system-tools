import { Component, OnInit } from '@angular/core';
import { InspeccionModel, ProcesoModel, PaginacionModel, ParametrosModel, CatalogoModel } from '../../../common/models/Index';
import { ProcesoService } from '../../../common/services/entity/index';
import { ActivatedRoute, Router } from '@angular/router';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { error } from 'util';
import { ToastrService } from 'ngx-toastr';
import { ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';


@Component({
  selector: 'app-listar-inspecciones',
  templateUrl: './listar-inspecciones.component.html',
  styleUrls: ['./listar-inspecciones.component.css']
})
export class ListarInspeccionesEntradaComponent implements OnInit {

  public  paginacion: PaginacionModel = new PaginacionModel(1, 10);
  public  tipoProcesoActual: CatalogoModel = new CatalogoModel();
  public  Paramtros: ParametrosModel;
  public  tipoProcesos: CatalogoModel[];
  public  Procesos: Array<ProcesoModel>;

  constructor(
    private procesoService: ProcesoService,
    private parametroService: ParametroService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastrService: ToastrService

  ) {

  }



  ngOnInit() {
    this.consultarParemtros();
  }




  consultarParemtros() {
    this.parametroService.consultarParametrosPorEntidad('PROCESO').subscribe(response => {
      this.tipoProcesos = response.Catalogos.filter(catalogo => { return catalogo.Grupo == "TIPO_PROCESO" });
      this.Paramtros = response;
      this.obtenerTipoProceso(this.tipoProcesos,'entrada');
    }, error => {
      console.log(error)
      this.toastrService.error(error.message)
    }, () => {
      this.consultarProcesos();
    });
  }



  obtenerTipoProceso(tiposProcesos: CatalogoModel[], procesoDesdeUrl: string) {
    this.tipoProcesoActual = tiposProcesos.find(proceso => { return proceso.Valor.toLowerCase().includes(procesoDesdeUrl) });
  }

  consultarProcesos() {
    if (this.tipoProcesoActual) {
      this.procesoService.consultarProcesosPorTipo(this.tipoProcesoActual, this.paginacion).subscribe(response => {
        this.Procesos = response.Listado.filter(d => d.EstadoId != ESTADOS_PROCESOS.Procesado);
        
        this.paginacion.CantidadRegistros = response.CantidadRegistros
      }, error => {
        console.log(error)
        this.toastrService.error(error.message)
      });
    }
  }


  primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }//convertir en pipe este metrodo
}

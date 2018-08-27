import { Component, OnInit } from '@angular/core';
import { PaginacionModel, CatalogoModel, ParametrosModel, ProcesoModel } from 'src/app/common/models/Index';
import { ParametroService } from 'src/app/common/services/entity/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { ProcesoService } from 'src/app/common/services/entity';
import { ESTADOS_PROCESOS } from '../../inspeccion-enum/inspeccion.enum';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-mecanizado-fresa-listar',
  templateUrl: './mecanizado-fresa-listar.component.html',
  styleUrls: ['./mecanizado-fresa-listar.component.css']
})
export class MecanizadoFresaListarComponent implements OnInit {

  public paginacion: PaginacionModel = new PaginacionModel(1, 20);
  public tipoProcesoActual: CatalogoModel = new CatalogoModel();
  public tipoProcesos: CatalogoModel[];
  public Procesos: Array<ProcesoModel>;
  public Paramtros: ParametrosModel;

  constructor(
    private procesoService: ProcesoService,
    private parametroService: ParametroService,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.consultarParemtros();
  }




  consultarParemtros() {
    this.parametroService.consultarParametrosPorEntidad('PROCESO').subscribe(response => {
      this.tipoProcesos = response.Catalogos.filter(catalogo => { return catalogo.Grupo == "TIPO_PROCESO" });
      this.Paramtros = response;
      this.obtenerTipoProceso(this.tipoProcesos, 'fresa');
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

        this.paginacion.CantidadRegistros = this.Procesos.length;
        this.Procesos.forEach((p) => {
          p.FechaRegistroVista = this.datePipe.transform(p.FechaRegistro, "dd/MM/yyyy, h:mm a");
          p.OrdenTrabajoId = p.OrdenTrabajo.Id;
          p.OrdenTrabajoHerramientaNombre = p.OrdenTrabajo.Herramienta.Nombre;
          p.OrdenTrabajoClienteNickName = p.OrdenTrabajo.Cliente.NickName;
          p.OrdenTrabajoSerialHerramienta = p.OrdenTrabajo.SerialHerramienta;
          p.EstadoValor = p.Estado.Valor;
          p.OrdenTrabajoPrioridadValor = p.OrdenTrabajo.Prioridad.Valor;
          p.TipoProcesoAnteriorValor = p.TipoProcesoAnterior.Valor;
        });
      }, error => {
        console.log(error)
        this.toastrService.error(error.message)
      });
    }
  }




}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProcesoService } from 'src/app/common/services/entity';
import { ToastrService } from 'ngx-toastr';
import { ProcesoModel } from 'src/app/common/models/Index';
import { ESTADOS_PROCESOS } from 'src/app/proceso/inspeccion-enum/inspeccion.enum';
import { OrdenTrabajoService } from 'src/app/common/services/entity/orden-trabajo.service';
import { LoaderService } from 'src/app/common/services/entity/loaderService';

@Component({
  selector: 'app-liberar-proceso-remision',
  templateUrl: './liberar-proceso-remision.component.html',
  styleUrls: ['./liberar-proceso-remision.component.css']
})
export class LiberarProcesoRemisionComponent implements OnInit {
  @Output() confir = new EventEmitter();
  @Input() guid: string
  @Input() proceso: ProcesoModel

  private response: boolean

  constructor(
    private procesoService: ProcesoService,
    private OitService: OrdenTrabajoService,
    private toasrService: ToastrService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
  }

  cancelarAction() {
    this.response = false;
    this.confir.emit(this.response);
  }
  confirmarAction() {
    this.actualizarProcesoLiberar();
  }

  actualizarProcesoLiberar() {
    this.loaderService.display(true);
    this.procesoService.actualizarEstadoProceso(this.proceso.Guid, ESTADOS_PROCESOS.Procesado)
      .subscribe(response => {
      }, errorResponse => {
        this.loaderService.display(false);
      }, () => {
        this.cambiarEstadoOIT();
      });
  }

  cambiarEstadoOIT() {
    this.OitService.actualizarEstadoOrdenDeTrabajo(this.proceso.OrdenTrabajo.Guid, 138)
      .subscribe(response => {

      }, errorResponse => {
        this.loaderService.display(false);
      }, () => {
        this.toasrService.success("El proceso se libero correctamente.");
        this.loaderService.display(false);
        this.response = true;
        this.confir.emit(this.response);
      });
  }

}

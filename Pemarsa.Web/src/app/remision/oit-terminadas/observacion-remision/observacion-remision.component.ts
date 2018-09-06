import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdenTrabajoRemisionDTO } from 'src/app/common/models/Index';
import { OrdenTrabajoService } from 'src/app/common/services/entity/orden-trabajo.service';

@Component({
  selector: 'app-observacion-remision',
  templateUrl: './observacion-remision.component.html',
  styleUrls: ['./observacion-remision.component.css']
})
export class ObservacionRemisionComponent implements OnInit {

  @Output() Observacion = new EventEmitter();
  @Input() oitRemision: OrdenTrabajoRemisionDTO;


  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
 
  public formulario: FormGroup;

  public Actualizo: boolean = false;

  ngOnInit() {
    this.initFormulario();
  }

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private toasrService: ToastrService,
    private formBuilder: FormBuilder,

  ) { }

  initFormulario() {
    this.formulario = this.formBuilder.group({
      ObservacionRemision: [this.oitRemision.ObservacionRemision, Validators.required]
    });
  }
  cancelarAction() {
    this.Actualizo = false;
    this.Observacion.emit(this.Actualizo);
  }
  confirmarAction() {
    if (!this.formulario.valid) {
      return
    }


    this.actualizarObservacion();
  }

  actualizarObservacion() {
    this.ordenTrabajoService.actualizarObservacionRemision(this.formulario.get('ObservacionRemision').value, this.oitRemision.Guid)
      .subscribe(response => {
        this.Actualizo = true;
        this.Observacion.emit(this.Actualizo);
        this.toasrService.success("Se guardo correctamente la observacion de la orden de trabajo");
        document.getElementById("cerrar").click();
      }, errorResponse => {

      }, () => {

      });


  }

}

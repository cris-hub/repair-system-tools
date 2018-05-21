import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";

import { PaginacionModel } from '../../../common/models/PaginacionModel';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ParametrosModel } from '../../../common/models/ParametrosModel';
import { ConfirmacionComponent } from '../../../common/directivas/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-listar-herramienta',
  templateUrl: './listar-herramienta.component.html'
})
export class ListarHerramientaComponent implements OnInit {
  ngOnInit() {
  }
}

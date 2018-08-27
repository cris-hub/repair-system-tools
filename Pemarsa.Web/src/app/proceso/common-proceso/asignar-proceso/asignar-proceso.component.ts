import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { EntidadModel } from '../../../common/models/Index';

@Component({
  selector: 'app-asignar-proceso',
  templateUrl: './asignar-proceso.component.html',
  styleUrls: ['./asignar-proceso.component.css']
})
export class AsignarProcesoComponent implements OnInit {

  public parametros: EntidadModel[] = [];

  constructor(
    private paramtroService : ParametroService
  ) { }

  ngOnInit() {
  }

  consultarParametros() {
    this.paramtroService.consultarParametrosPorEntidad('MECANIZADO_TORNO').subscribe(response => {
      this.parametros = response.Consultas;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FiltroProcesoComponent } from '../../filtro-proceso/filtro-proceso.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mecanizado-fresa-procesar',
  templateUrl: './mecanizado-fresa-procesar.component.html',
  styleUrls: ['./mecanizado-fresa-procesar.component.css']
})
export class MecanizadoFresaProcesarComponent implements OnInit {

  constructor(private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerParametrosRuta();
  }

  obtenerParametrosRuta() {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('procesoId', this.activedRoute.snapshot.paramMap.get('id'));
    return parametrosUlrMap;
  }
}

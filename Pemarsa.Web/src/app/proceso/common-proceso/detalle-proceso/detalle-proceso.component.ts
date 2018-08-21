import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-proceso',
  templateUrl: './detalle-proceso.component.html',
  styleUrls: ['./detalle-proceso.component.css']
})
export class DetalleProcesoComponent implements OnInit {

  @Input() proceso

  constructor() { }

  ngOnInit() {
  }

}

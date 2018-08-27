import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-proceso',
  templateUrl: './detalle-proceso.component.html',
  styleUrls: ['./detalle-proceso.component.css']
})
export class DetalleProcesoComponent implements OnInit {

  public colapse: boolean = false;
  @Input() proceso

  constructor() { }

  ngOnInit() {
  }

  colapsar() {
    this.colapse ? this.colapse = false : this.colapse = true
    console.log(this.colapse)
  }
}

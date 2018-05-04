import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../common/modules/material.module';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  message: string;
  constructor() {
    this.message = 'Aun hay campos incorrectos';
  }

  ngOnInit() {
  }

}

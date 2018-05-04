import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css'],
  inputs:['fieldName']
})
export class ValidatorComponent implements OnInit {
  @Input() field: any;
  @Input() isSubmitted: boolean;

  constructor() { }

  ngOnInit() {
  }

}
/*< app - validator[field]="frmEmpresa.controls.RazonSocial"  [isSubmited]="isSubmitted" > </app-validator>*/

import { Component, Input } from '@angular/core';
import { HomeComponent } from './home.component'
@Component({
  selector: 'sub-menu',
  //templateUrl: './sub-menu.componet.html'
  template: '<h1>{{ListaMenu}}</h1>'
})
export class SubMenuComponent {
  @Input() ListaMenu: any;
}

import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  menu: any =
    [
      {
        id: "prueba",
        name: "prueba",
        style: "prueba",
        image: "prueba",
        url: "prueba",
        submenu:
          [
            {
              id: "prueba",
              name: "prueba",
              style: "prueba",
              image: "prueba",
              url: "prueba",
              submenu: [{}]
            },
            {
              id: "prueba",
              name: "prueba",
              style: "prueba",
              image: "prueba",
              url: "prueba",
              submenu: [{}]
            }
          ] 
      },
      {

      }
    ];

  constructor() {
  }

  ocultar(submenu: any, estilo: any) {
    alert("hola");
  }
}

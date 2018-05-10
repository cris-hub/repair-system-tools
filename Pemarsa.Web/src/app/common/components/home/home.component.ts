import { Component } from '@angular/core';

@Component({
  selector: 'home.components',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  ListaMenu: any =
    [
      {
        id: "OIT",
        name: "OIT",
        style: "",
        image: "",
        url: "",
        class: "",
        title: "OIT",
        option: true,
        submenu:
          [
            {
              id: "Clientes",
              name: "Clientes",
              style: "",
              image: "",
              url: "Cliente",
              class: "icon-clientes",
              title: "Clientes",
              submenu: false
            },
            {
              id: "Herramientas",
              name: "Herramientas",
              style: "",
              image: "",
              url: "Herramientas",
              class: "icon-herramientas2",
              title: "Herramientas",
              submenu: false
            },
            {
              id: "Formatos",
              name: "Formatos",
              style: "",
              image: "",
              url: "Formatos",
              class: "icon-formatos",
              title: "Formatos",
              submenu: false
            }
          ] 
      },
      {
        id: "PROCESOS",
        name: "PROCESOS",
        style: "",
        image: "",
        url: "",
        class: "",
        title: "PROCESOS",
        option: true,
        submenu: false
      },
      {
        id: "CATÁLOGOS",
        name: "CATÁLOGOS",
        style: "",
        image: "",
        url: "",
        class: "",
        title: "CATÁLOGOS",
        option: true,
        submenu: false
      },
      {
        id: "INDICADORES",
        name: "INDICADORES",
        style: "",
        image: "",
        url: "",
        class: "",
        title: "INDICADORES",
        option: true,
        submenu: false
      }
    ];

  constructor() {
  }

  ocultar(submenu: any, estilo: any) {
    alert("hola");
  }
}

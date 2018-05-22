import { Component } from '@angular/core';

@Component({
  selector: 'app-home-components',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public ListaSubMenuActual = false;
  ListaMenu: any =
    [
      {
        id: "1",
        name: "OIT",
        image: "icon-lista",
        url: false,
        title: "OIT",
        submenu: false
      },
      {
        id: "2",
        name: "PROCESOS",
        image: "icon-pieza",
        url: false,
        title: "PROCESOS",
        submenu: false
      },
      {
        id: "3",
        name: "CATÁLOGOS",
        image: "icon-herramientas",
        url: "/home",
        title: "CATÁLOGOS",
        submenu:
          [
            {
              id: "5",
              name: "Clientes",
              image: "",
              url: "/cliente",
              color: "color9",
              title: "Clientes",
              submenu: false
            },
            {
              id: "6",
              name: "Herramientas",
              image: "",
              url: "/herramienta",
              color: "color10",
              title: "Herramientas",
              submenu: false
            },
            {
              id: "7",
              name: "Formatos",
              image: "",
              url: false,
              color: "color11",
              title: "Formatos",
              submenu: false
            }
          ] 
      },
      {
        id: "4",
        name: "INDICADORES",
        image: "icon-grafica",
        url: false,
        title: "INDICADORES",
        submenu: false
      }
    ];

  constructor() {
  }

  subMenu(menu: any) {
    this.ListaSubMenuActual = menu.submenu;
    
  }
}

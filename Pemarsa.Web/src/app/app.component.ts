import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pemarsa Platform';
  public ListaSubMenuActual = false;
  ListaMenu: any =
    [
      {
        id: "1",
        name: "OIT",
        image: "icon-lista",
        url: false,
        title: "OIT",
        submenu: false,
        complementarios: false
      },
      {
        id: "2",
        name: "PROCESOS",
        image: "icon-pieza",
        url: false,
        title: "PROCESOS",
        submenu: false,
        complementarios: false
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
              submenu: false,
              complementarios:
                {
                  icono: "icon-clientes",
                  color: "color9"
                }
            },
            {
              id: "6",
              name: "Herramientas",
              image: "",
              url: "/herramienta",
              color: "color10",
              title: "Herramientas",
              submenu: false,
              complementarios:
                {
                  icono: "icon-herramientas2",
                  color: "color10"
                }
            },
            {
              id: "7",
              name: "Formatos",
              image: "",
              url: false,
              color: "color11",
              title: "Formatos",
              submenu: false,
              complementarios:
                {
                  icono: "icon-formatos",
                  color: "color11"
                }
            }
          ],
        complementarios: false
      },
      {
        id: "4",
        name: "INDICADORES",
        image: "icon-grafica",
        url: false,
        title: "INDICADORES",
        submenu: false,
        complementarios: false
      }
    ];
  constructor() {
  }

  subMenu(menu: any) {
    this.ListaSubMenuActual = menu.submenu;

  }
}

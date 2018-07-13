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
        submenu: [
          {
            id: "8",
            name: "Alertas",
            image: "",
            url: "/solicitudOrdenTrabajo",
            color: "color9",
            title: "Alertas",
            submenu: false,
            complementarios:
              {
                icono: "icon-alerta",
                color: "color"
              }
          },
          {
            id: "9",
            name: "OIT",
            image: "",
            url: '/oit',
            color: "color10",
            title: "OIT",
            submenu: false,
            complementarios:
              {
                icono: "icon-lista2",
                color: "color2"
              }
          }
        ],
        complementarios: false
      },
      {
        id: "2",
        name: "PROCESOS",
        image: "icon-pieza",
        url: false,
        title: "PROCESOS",
        submenu: [
          {
            id: "10",
            name: "Insp. entrada",
            image: "",
            url: "/inspeccion/entrada",
            color: "color11",
            title: "Insp. entrada",
            submenu: false,
            complementarios:
              {
                icono: "icon-entrada",
                color: "color"
              }

          }

        ],
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
              url: "/formato",
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

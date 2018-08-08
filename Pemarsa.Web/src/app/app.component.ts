import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoaderService } from './common/services/entity/loaderService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pemarsa Platform';
  showLoader: boolean;
  
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
                color: "color",
                class: "display"
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
                color: "color2",
                class: "display"
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
                color: "color2",
                class: "display"
              }

          },
          {
            id: "11",
            name: "Torneado",
            image: "",
            url: "",
            color: "color",
            title: "Torneado",
            submenu: false,
            complementarios:
            {
              icono: "icon-torneado",
              color: "color3",
              class: "remove"
            }

          },
          {
            id: "12",
            name: "Fresado",
            image: "",
            url: "",
            color: "color",
            title: "Fresado",
            submenu: false,
            complementarios:
            {
              icono: "icon-fresado",
              color: "color4",
              class: "remove"
            }

          },
          {
            id: "13",
            name: "Soldadura",
            image: "",
            url: "",
            color: "color",
            title: "Soldadura",
            submenu: false,
            complementarios:
            {
              icono: "icon-soldadura",
              color: "color5",
              class: "remove"
            }

          },
          {
            id: "14",
            name: "Alistamiento",
            image: "",
            url: "",
            color: "color",
            title: "Alistamiento",
            submenu: false,
            complementarios:
            {
              icono: "icon-alistamiento",
              color: "color6",
              class: "remove"
            }

          },
          {
            id: "15",
            name: "Rectificado",
            image: "",
            url: "",
            color: "color",
            title: "Rectificado",
            submenu: false,
            complementarios:
            {
              icono: "icon-rectificado",
              color: "color7",
              class: "remove"
            }

          },
          {
            id: "16",
            name: "Insp. Salida",
            image: "",
            url: "/inspeccion/salida",
            color: "color",
            title: "Insp. Salida",
            submenu: false,
            complementarios:
            {
              icono: "icon-listacopia",
              color: "color8",
              class: "display"
            }

          },
          {
            id: "11",
            name: "Aprobación coordinador",
            image: "",
            url: "/aprobacion-supervisor",
            color: "color111",
            title: "Insp. entrada",
            submenu: false,
            complementarios:
              {
                icono: "icon-pieza",
                color: "color",
                class: "display"
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
                  color: "color9",
                  class: "display"
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
                  color: "color10",
                  class: "display"
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
                  color: "color11",
                  class: "display"
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
  constructor(private loaderService: LoaderService) {
    this.showLoader  = false;
  }

  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
  subMenu(menu: any) {
    this.ListaSubMenuActual = menu.submenu;

  }
}

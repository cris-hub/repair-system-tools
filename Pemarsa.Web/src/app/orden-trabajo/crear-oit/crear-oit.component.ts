
import { Component, OnInit, ViewChild } from '@angular/core';
import { ParametroService } from '../../common/services/entity/parametro.service';
import { ParametrosModel, OrdenTrabajoModel, ClienteModel, PaginacionModel, ClienteLineaModel, HerramientaModel, HerramientaMaterialModel, HerramientaTamanoModel } from '../../common/models/Index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdenTrabajoService } from '../../common/services/entity/orden-trabajo.service';
import { Observable } from 'rxjs';
import { debounceTime, map, filter, retry } from 'rxjs/operators';
import { ClienteService, HerramientaService } from '../../common/services/entity';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crear-oit',
  templateUrl: './crear-oit.component.html',
  styleUrls: ['./crear-oit.component.css']
})
export class CrearOitComponent implements OnInit {
  //directiva en html
  @ViewChild('instance') instance: NgbTypeahead;


  //formulario
  private formularioOrdenTrabajo: FormGroup;

  //parametros catalogo
  private parametrosTipoServicio: ParametrosModel = new ParametrosModel();

  //objeto formulario
  private ordenTrabajo: OrdenTrabajoModel;

  //id que viene de la uri
  private idOrdenDeTrabajo;

  // acciones
  private esVer: boolean = false;
  private esProcesar: boolean = false;
  private esEditar: boolean = false;
  private esNueva: boolean = false;
  private estaCargando: boolean = false;
  private accionRealizarTituloPagina: string = '';


  //autoCOmpletar cliente
  private Cliente: ClienteModel = new ClienteModel();
  private clientes: Array<ClienteModel> = new Array<ClienteModel>();
  private paginacion;

  //auttoCompleta LineaCliente
  private Linea: ClienteLineaModel = new ClienteLineaModel();
  private lineas: Array<ClienteLineaModel> = new Array<ClienteLineaModel>();


  //autoComplet herramienta
  private herramienta: HerramientaModel = new HerramientaModel();
  private herraminetas: Array<HerramientaModel> = new Array<HerramientaModel>();
  private herraminetasview: Array<HerramientaModel> = new Array<HerramientaModel>();



  constructor(
    private parametroSrv: ParametroService,
    private clienteService: ClienteService,
    private herraminetaService: HerramientaService,
    private ordenTrabajoServicio: OrdenTrabajoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBulder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.ordenTrabajo = new OrdenTrabajoModel();
    this.accionRealizar()
    this.obtenerOrdenTrabajoURI();
    this.paginacion = new PaginacionModel(1, 10);
    this.consultarParametros();

    this.consultarOrdenTrabajo();


  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad('ORDEN_TRABAJO')
      .subscribe(response => {
        this.parametrosTipoServicio.Catalogos = response.Catalogos.filter(tipoServicio => { return tipoServicio.Grupo == 'TIPO_SERVICIO_ORDEN_TRABAJO' });

      });
  }

  consultarHerraminetas() {
    this.herraminetaService.ConsultarHerramientas(this.paginacion).subscribe(response => {
      this.herraminetas = response.Listado;

    })
  }

  consultarClientes() {
    this.clienteService.consultarClientes(this.paginacion).
      subscribe(
        response => {
          this.clientes = response.Listado

        });
  }

  consultarLineasCliente() {
    if (this.Cliente.Guid) {
      this.clienteService.consultarLineasPorGuidCliente(this.Cliente.Guid).
        subscribe(response => {
          this.lineas = response;
        })
    } else if (this.ordenTrabajo.Cliente.Guid) {
      this.clienteService.consultarLineasPorGuidCliente(this.ordenTrabajo.Cliente.Guid).
        subscribe(response => {
          this.lineas = response;
        })

    }

  }

  cambioItemEvent(evento) {
    console.log(evento)



  }

  formatoValorMostrar = (x: { NickName: string }) => x.NickName;

  formatoValorMostrarLinea = (x: { Nombre: string }) => x.Nombre;

  buscarConcidencia = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => {
        if (term === '_') {
          return this.clientes
        } else if (term === '')
          return [];
        else {
          return this.clientes.filter(v => v.NickName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
        }

      }));

  buscarConcidenciaLinea = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    map(term => {
      if (term === '_') {
        return this.lineas
      } else if (term === '')
        return [];
      else {
        return this.lineas.filter(v => v.Nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      }

    }));

  buscarConcidenciaHerramienta(event) {
    if (!this.herraminetas || !(this.herraminetas.length > 0)) {
      this.herraminetasview = new Array<HerramientaModel>();
      this.consultarHerraminetas();
    }
    if (event.query == '_') {
      this.herraminetasview = new Array<HerramientaModel>();
      this.herraminetasview = this.herraminetas;
    } else if (event.query == '' && !(event.originalEvent.type == 'click')) {
      this.herraminetasview = new Array<HerramientaModel>();
    }
    else if (event.originalEvent.type == 'click') {
      this.herraminetasview = new Array<HerramientaModel>();
      this.herraminetasview = this.herraminetas;
    }
    else {
      this.herraminetasview = new Array<HerramientaModel>();

      for (let i = 0; i < this.herraminetas.length; i++) {
        let Herramienta = this.herraminetas[i];
        if (Herramienta.Nombre.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
          this.herraminetasview.push(Herramienta);
        }

      }
    }


  }

  accionRealizar(): string {
    if (this.activeRoute.snapshot.routeConfig.path.includes('editar')) {
      this.esEditar = true;
      this.accionRealizarTituloPagina = 'Editar';
    } else if (this.activeRoute.snapshot.routeConfig.path.includes('procesar')) {
      this.esProcesar = true;
      this.accionRealizarTituloPagina = 'Procesar';
    } else if (this.activeRoute.snapshot.routeConfig.path.includes('nueva-oit')) {
      this.esNueva = true;
      this.accionRealizarTituloPagina = 'Crear Nueva OIT';
    } else {
      this.esVer = true;
      this.accionRealizarTituloPagina = 'ver';
    }
    return this.accionRealizarTituloPagina;
  }

  obtenerOrdenTrabajoURI() {
    this.idOrdenDeTrabajo = this.activeRoute.snapshot.paramMap.get('id');
  }

  consultarOrdenTrabajo() {
    this.inicializarFormulario(new OrdenTrabajoModel());

    if (!this.esNueva || this.idOrdenDeTrabajo) {
      this.ordenTrabajoServicio.consultarOrdenDeTrabajoPorGuid(this.idOrdenDeTrabajo).subscribe(response => {
        this.ordenTrabajo = response;
        response.Herramienta != null ? this.herramienta = response.Herramienta : this.herramienta = new HerramientaModel();
        response.Material != null ? this.ordenTrabajo.Material = response.Material : this.ordenTrabajo.Material = new HerramientaMaterialModel();
        response.TamanoHerramienta != null ? this.ordenTrabajo.TamanoHerramienta = response.TamanoHerramienta : this.ordenTrabajo.TamanoHerramienta = new HerramientaTamanoModel();
        this.inicializarFormulario(this.ordenTrabajo)
      })
    }
  }


  inicializarFormulario(ordenTrabajo: OrdenTrabajoModel) {

    this.formularioOrdenTrabajo = this.formBulder.group({
      Id: [ordenTrabajo.Id],
      FechaRegistro: [ordenTrabajo.FechaRegistro],
      Cantidad: [ordenTrabajo.Cantidad],
      CantidadInspeccionar: [ordenTrabajo.CantidadInspeccionar],
      Cotizacion: [ordenTrabajo.Cotizacion],
      DetallesSolicitud: [ordenTrabajo.DetallesSolicitud],
      ObservacionRemision: [ordenTrabajo.ObservacionRemision],
      OrdenCompra: [ordenTrabajo.OrdenCompra],
      ProvieneDeSolicitud: [ordenTrabajo.RemisionCliente],
      RemisionCliente: [ordenTrabajo.RemisionCliente],
      SerialHerramienta: [ordenTrabajo.SerialHerramienta],
      SerialMaterial: [ordenTrabajo.SerialMaterial],
      Estado: [ordenTrabajo.Estado],
      TipoServicio: this.formBulder.group({
        Id: [ordenTrabajo.TipoServicio.Id],
        Valor: [ordenTrabajo.TipoServicio.Valor]
      }),
      Responsable: this.formBulder.group({
        Id: [ordenTrabajo.Responsable.Id],
        Valor: [ordenTrabajo.Responsable.Valor]
      }),
      Prioridad: [ordenTrabajo.Prioridad],
      Material: this.formBulder.group({
        Id: [ordenTrabajo.Material.Id],
        Valor: [ordenTrabajo.Material.Material.Valor]
      }),
      TamanoHerramienta: this.formBulder.group({
        Id: [ordenTrabajo.TamanoHerramienta.Id],
        Tamano: [ordenTrabajo.TamanoHerramienta.Tamano]
      }),


      Herramienta: [ordenTrabajo.Herramienta],
      Linea: [ordenTrabajo.Linea],
      Cliente: [ordenTrabajo.Cliente],
      RemisionInicial: [ordenTrabajo.RemisionInicial],
      SolicitudOrdenTrabajo: [ordenTrabajo.SolicitudOrdenTrabajo],
    });
    this.esVer == true ? this.desabilitarCamposControlFormulario() : '';

   

  }

  desabilitarCamposControlFormulario(): any {
    if (this.esVer) {
      this.formularioOrdenTrabajo.disable();
    }
  }


  enviar(data) {
    var objeto = this.asignarValoresFormulario(data);
    console.log(JSON.stringify(objeto));

    this.persistirOrdenTrabajo(objeto);

  }

  persistirOrdenTrabajo(objeto) {
    switch (this.accionRealizar()) {
      case 'Editar':
        this.ordenTrabajoServicio.actualizarOrdenDeTrabajo(objeto).subscribe(response => {

        });
        break;
      case 'Crear Nueva OIT':
        this.ordenTrabajoServicio.crearOrdenDeTrabajo(objeto).subscribe(response => {

        });;
        break;
      case 'Procesar':
        this.ordenTrabajoServicio.crearOrdenDeTrabajo(objeto).subscribe(response => {

        });;
        break;

    }
  }


  asignarValoresFormulario(data)  {

    Object.assign(this.ordenTrabajo, data);


    return this.ordenTrabajo;
  
  }
}

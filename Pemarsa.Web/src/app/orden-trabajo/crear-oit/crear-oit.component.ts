import { Component, OnInit, ViewChild } from '@angular/core';
import { ParametroService } from '../../common/services/entity/parametro.service';
import { ParametrosModel, OrdenTrabajoModel, ClienteModel, PaginacionModel, ClienteLineaModel } from '../../common/models/Index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdenTrabajoService } from '../../common/services/entity/orden-trabajo.service';
import { Observable } from 'rxjs';
import { debounceTime, map, filter } from 'rxjs/operators';
import { ClienteService } from '../../common/services/entity';
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
  private ordenTrabajo: OrdenTrabajoModel = new OrdenTrabajoModel();

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

  constructor(
    private parametroSrv: ParametroService,
    private clienteService: ClienteService,
    private ordenTrabajoServicio: OrdenTrabajoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBulder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {

    this.accionRealizar()
    this.obtenerOrdenTrabajoURI();
    this.paginacion = new PaginacionModel(1, 10);
    this.consultarParametros();
    this.consultarOrdenTrabajo();
    this.inicializarFormulario(this.ordenTrabajo);

  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad('ORDEN_TRABAJO')
      .subscribe(response => {
        this.parametrosTipoServicio.Catalogos = response.Catalogos.filter(tipoServicio => { return tipoServicio.Grupo == 'TIPO_SERVICIO_ORDEN_TRABAJO' });

      });
  }

  consultarClientes() {
    this.clienteService.consultarClientes(this.paginacion).
      subscribe(
        response => {
          this.clientes = response.Listado
        });
  }
  consultarLineasCliente(Guid) {
    if (!Guid) {
      this.toastrService.info('Por favor Ingrese Un cliente', 'Formulario incompleto')

    } else {
      this.clienteService.consultarLineasPorGuidCliente(Guid).
        subscribe(response => {
          this.lineas = response;
        });
    }
  }

  cambioItemEvent(evento) {
    console.log(evento)
    this.consultarLineasCliente(evento.item.Guid);


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

  accionRealizar() {
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
  }

  obtenerOrdenTrabajoURI() {
    this.idOrdenDeTrabajo = this.activeRoute.snapshot.paramMap.get('id');
  }

  consultarOrdenTrabajo() {
    if (!this.esNueva && this.idOrdenDeTrabajo) {
      this.ordenTrabajoServicio.consultarOrdenDeTrabajoPorGuid(this.idOrdenDeTrabajo).subscribe(response => {
        this.ordenTrabajo = response;

      })
    } else {
      this.ordenTrabajo = new OrdenTrabajoModel();
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
      ObservacionRemision: [ordenTrabajo],
      OrdenCompra: [ordenTrabajo.OrdenCompra],
      ProvieneDeSolicitud: [ordenTrabajo.RemisionCliente],
      RemisionCliente: [ordenTrabajo.RemisionCliente],
      SerialHerramienta: [ordenTrabajo.SerialHerramienta],
      SerialMaterial: [ordenTrabajo.SerialMaterial],
      Estado: [ordenTrabajo.Estado],
      TipoServicio: [ordenTrabajo.TipoServicio],
      Responsable: [ordenTrabajo.Responsable],
      Prioridad: [ordenTrabajo.Prioridad],
      Material: [ordenTrabajo.Material],
      TamanoHerramienta: [ordenTrabajo.TamanoHerramienta],
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




}

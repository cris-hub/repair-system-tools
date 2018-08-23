
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ParametroService } from '../../common/services/entity/parametro.service';
import { ParametrosModel, OrdenTrabajoModel, ClienteModel, PaginacionModel, ClienteLineaModel, HerramientaModel, HerramientaMaterialModel, HerramientaTamanoModel, SolicitudOrdenTrabajoModel, AttachmentModel, OrdenTrabajoAnexosModel, CatalogoModel, EntidadModel } from '../../common/models/Index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdenTrabajoService } from '../../common/services/entity/orden-trabajo.service';
import { Observable } from 'rxjs';
import { debounceTime, map, filter, retry } from 'rxjs/operators';
import { ClienteService, HerramientaService, SolicitudOrdenTrabajoService } from '../../common/services/entity';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ConfirmacionComponent } from '../../common/directivas/confirmacion/confirmacion.component';
import { VALID } from '@angular/forms/src/model';
import { LoaderService } from '../../common/services/entity/loaderService';

@Component({
  selector: 'app-crear-oit',
  templateUrl: './crear-oit.component.html',
  styleUrls: ['./crear-oit.component.css']
})
export class CrearOitComponent implements OnInit {


  verHistorial: false;
  public oit: any;
  //directiva en html
  @ViewChild(ConfirmacionComponent) confimar: ConfirmacionComponent;
  @ViewChild('instance') instance: NgbTypeahead;

  //formulario
  public formularioOrdenTrabajo: FormGroup;
  public anexos: any = [];

  //parametros catalogo
  public parametrosTipoServicio: ParametrosModel = new ParametrosModel();
  public parametrosPrioridadOrdenTrabajo: ParametrosModel = new ParametrosModel();
  public parametrosConsultas: ParametrosModel;
  //objeto formulario
  public ordenTrabajo: OrdenTrabajoModel;
  public solicitudOrdenTrabajo: SolicitudOrdenTrabajoModel;


  //id que viene de la uri
  public idOrdenDeTrabajoDesdeUrl;

  // acciones
  public esVer: boolean = false;
  public esProcesar: boolean = false;
  public esEditar: boolean = false;
  public esNueva: boolean = false;
  public estaCargando: boolean = false;
  public accionRealizarTituloPagina: string = '';


  //autoCOmpletar cliente
  public Cliente: EntidadModel = null;
  public clientes: Array<ClienteModel> = new Array<ClienteModel>();
  public paginacion;

  //auttoCompleta LineaCliente
  public Linea: EntidadModel = new EntidadModel();
  public lineas: Array<ClienteLineaModel> = new Array<ClienteLineaModel>();


  //autoComplet herramienta
  public herramienta: EntidadModel = new EntidadModel();
  public herramientaModel: HerramientaModel = new HerramientaModel();
  public herraminetas: Array<HerramientaModel> = new Array<HerramientaModel>();
  public herraminetasview: Array<HerramientaModel> = new Array<HerramientaModel>();
  public materialId;
  public material = new HerramientaMaterialModel();;


  //
  public catalogoClientes: EntidadModel[];
  public catalogoClienteLineas: EntidadModel[];
  public catalogoHerramientas: EntidadModel[];

  constructor(
    private location: Location,
    private parametroSrv: ParametroService,
    private clienteService: ClienteService,
    private herraminetaService: HerramientaService,
    private ordenTrabajoServicio: OrdenTrabajoService,
    private solicitudOrdenTrabajoService: SolicitudOrdenTrabajoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBulder: FormBuilder,
    private toastrService: ToastrService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.ordenTrabajo = new OrdenTrabajoModel();
    this.accionRealizar()
    this.obtenerOrdenTrabajoURI();
    this.paginacion = new PaginacionModel(1, 50);


    this.consultarParametros();

    this.consultarOrdenTrabajo();

  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad('ORDEN_TRABAJO')
      .subscribe(response => {
        this.parametrosTipoServicio.Catalogos = response.Catalogos.filter(tipoServicio => { return tipoServicio.Grupo == 'TIPO_SERVICIO_ORDEN_TRABAJO' });
        this.parametrosPrioridadOrdenTrabajo.Catalogos = response.Catalogos.filter(tipoServicio => { return tipoServicio.Grupo == 'PRIORIDAD_ORDENTRABAJO' });
        this.parametroSrv.consultarParametrosPorEntidad('SOLICITUD').subscribe(response => {
          let EntidadModel: EntidadModel[] = response.Catalogos.filter(tipoServicio => tipoServicio.Grupo == 'PRIORIDAD_SOLICITUD');

          this.parametrosPrioridadOrdenTrabajo.Catalogos = this.parametrosPrioridadOrdenTrabajo.Catalogos.concat(EntidadModel);
          console.log(this.parametrosPrioridadOrdenTrabajo);
        })
        console.log(this.parametrosPrioridadOrdenTrabajo);

      });
  }

  consultarHerraminetas() {
    this.herraminetaService.ConsultarHerramientas(this.paginacion).subscribe(response => {
      debugger;
      this.herraminetas = response.Listado.filter(t => {
        if (this.Cliente) {
          if (t.ClienteId == this.Cliente.Id) {
            if (this.Linea.Id) {
              return t.LineaId == this.Linea.Id;
            }
            return t;
          }
        }

      });

    })
  }

  consultarCatalogos() {


    this.parametroSrv.consultarParametrosPorEntidad("CLIENTE")
      .subscribe(response => {
        this.parametrosConsultas = response;
        this.catalogoClientes = response.Consultas.filter(c => c.Grupo == "cliente");
        var clienteId = this.Cliente == null ? 0 : this.Cliente.Id == null ? 0 : this.Cliente.Id;
        this.catalogoClienteLineas = response.Consultas.filter(c => c.Grupo == "clientelinea" && c.CatalogoId == clienteId);
        var LineaId = this.Linea == null ? 0 : this.Linea.Id == null ? 0 : this.Linea.Id;
        if (this.catalogoClientes) {
          if (this.catalogoClienteLineas.length > 0) {
            this.catalogoHerramientas = response.Consultas.filter(c => c.Simbolo == "herramienta" && Number(c.Grupo) == LineaId);
          }
          else {
            this.catalogoHerramientas = response.Consultas.filter(c => c.Simbolo == "herramienta" && c.CatalogoId == clienteId);
          }

        }
      });
  }


  consultarHerramientaPorGuid(guid: string) {
    this.herraminetaService.ConsultarHerramientaPorGuid(guid)
      .subscribe(response => {
        this.herramientaModel = response;
      });
  }

  consultarClientes() {
    this.clienteService.consultarClientes(this.paginacion).
      subscribe(
      response => {
        this.clientes = response.Listado
        this.consultarLineasCliente();
        this.consultarHerraminetas();
      });
  }

  consultarLineasCliente() {
    if (this.Cliente) {
      if (this.Cliente.Guid) {
        this.clienteService.consultarLineasPorGuidCliente(this.Cliente.Guid).
          subscribe(response => {
            this.lineas = response;


          })
      }
    } else if (this.ordenTrabajo.Cliente.Guid) {
      this.clienteService.consultarLineasPorGuidCliente(this.ordenTrabajo.Cliente.Guid).
        subscribe(response => {
          this.lineas = response;
        })

    }

  }

  cambioItemEvent(evento) {
    debugger;
    console.log(evento)

    //this.consultarHerramientaPorGuid(evento.item.Guid);




  }

  seleccionarHerramienta(evento) {
    debugger;
    console.log(evento)

    this.consultarHerramientaPorGuid(evento.item.Guid);
  }

  formatoValorMostrarCatalogo = (x: { Valor: string }) => x.Valor;
  formatoValorMostrarHerramientaCatalogo = (x: { Valor: string }) => x.Valor;
  formatoValorMostrarLineaCatalogo = (x: { Valor: string }) => x.Valor;


  formatoValorMostrar = (x: { NickName: string }) => x.NickName;
  formatoValorMostrarHerramienta = (x: { Nombre: string }) => x.Nombre;
  formatoValorMostrarLinea = (x: { Valor: string }) => x.Valor;

  buscarConcidencia = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => {
        if (term === '_') {
          return this.catalogoClientes
        } else if (term === '')
          return [];
        else {
          return this.catalogoClientes.filter(v => v.Valor.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
        }

      }));



  //buscarConcidencia = (text$: Observable<string>) =>
  //  text$.pipe(
  //    debounceTime(200),
  //    map(term => {
  //      if (term === '_') {
  //        return this.clientes
  //      } else if (term === '')
  //        return [];
  //      else {
  //        return this.clientes.filter(v => v.NickName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
  //      }

  //    }));

  buscarConcidenciaLinea = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    map(term => {
      if (term === '_') {
        return this.catalogoClienteLineas
      } else if (term === '')
        return [];
      else {
        return this.catalogoClienteLineas.filter(v => v.Valor.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      }

    }));


  buscarConcidenciaHerramienta = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    map(term => {
      if (term === '_') {
        return this.catalogoHerramientas
      } else if (term === '')
        return [];
      else {
        return this.catalogoHerramientas.filter(v => v.Valor.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      }

    }));


  buscarConcidenciaHerrmienta(event) {
    debugger;
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
      this.accionRealizarTituloPagina = 'Editar OIT';
    } else if (this.activeRoute.snapshot.routeConfig.path.includes('procesar')) {
      this.esProcesar = true;
      this.accionRealizarTituloPagina = 'Procesar';
    } else if (this.activeRoute.snapshot.routeConfig.path.includes('nueva-oit')) {
      this.esNueva = true;
      this.accionRealizarTituloPagina = 'Crear OIT';
    } else {
      this.esVer = true;
      this.accionRealizarTituloPagina = 'Detalle de OIT';
    }
    return this.accionRealizarTituloPagina;
  }

  obtenerOrdenTrabajoURI() {
    this.idOrdenDeTrabajoDesdeUrl = this.activeRoute.snapshot.paramMap.get('id');
  }

  asignarValoresSolitudOrdenTrabajo(solicitudOrdenTrabajo: SolicitudOrdenTrabajoModel, ordenTrabajo: OrdenTrabajoModel) {

    solicitudOrdenTrabajo.Anexos.forEach(anexo => {
      let anexoOrdenTrabajo: OrdenTrabajoAnexosModel = new OrdenTrabajoAnexosModel();
      delete anexo.DocumentoAdjunto['SolicitudOrdenTrabajoAnexos'];
      anexoOrdenTrabajo.DocumentoAdjunto = anexo.DocumentoAdjunto
      ordenTrabajo.Anexos.push(anexoOrdenTrabajo);
    })
    ordenTrabajo.Cantidad = solicitudOrdenTrabajo.Cantidad,
      ordenTrabajo.CantidadInspeccionar = solicitudOrdenTrabajo.CantidadInspeccionar,
      ordenTrabajo.Cotizacion = solicitudOrdenTrabajo.Cotizacion,
      ordenTrabajo.DetallesSolicitud = solicitudOrdenTrabajo.DetallesSolicitud,
      ordenTrabajo.Responsable = solicitudOrdenTrabajo.Responsable,
      ordenTrabajo.PrioridadId = solicitudOrdenTrabajo.PrioridadId,
      ordenTrabajo.LineaId = solicitudOrdenTrabajo.LineaId,
      ordenTrabajo.ClienteId = solicitudOrdenTrabajo.ClienteId,
      ordenTrabajo.Linea = solicitudOrdenTrabajo.ClienteLinea,
      ordenTrabajo.Cliente = solicitudOrdenTrabajo.Cliente,
      ordenTrabajo.SolicitudOrdenTrabajoId = solicitudOrdenTrabajo.Id,
      ordenTrabajo.ProvieneDeSolicitud = true,
      ordenTrabajo.NombreUsuarioCrea = solicitudOrdenTrabajo.NombreUsuarioCrea
  }

  consultarOrdenTrabajo() {
    this.loaderService.display(true);
    this.inicializarFormulario(new OrdenTrabajoModel());
    if (this.accionRealizarTituloPagina == 'Procesar') {
      this.solicitudOrdenTrabajoService.consultarSolicitudDeTrabajoPorGuid(this.idOrdenDeTrabajoDesdeUrl).subscribe(response => {
        this.solicitudOrdenTrabajo = response;
        this.Cliente = new EntidadModel();
        this.Cliente.Id = this.solicitudOrdenTrabajo.Cliente.Id
        this.Cliente.Valor = this.solicitudOrdenTrabajo.Cliente.NickName
        this.Linea = new EntidadModel();
        this.Linea.Id = this.solicitudOrdenTrabajo.ClienteLinea.Id
        this.Linea.Valor = this.solicitudOrdenTrabajo.ClienteLinea.Nombre
        this.asignarValoresSolitudOrdenTrabajo(this.solicitudOrdenTrabajo, this.ordenTrabajo)
        this.consultarLineasCliente();
        this.consultarHerraminetas();

        this.inicializarFormulario(this.ordenTrabajo)
        this.loaderService.display(false);


      });
    }
    else {
      if (!this.esNueva || this.idOrdenDeTrabajoDesdeUrl) {
        debugger;
        this.ordenTrabajoServicio.consultarOrdenDeTrabajoPorGuid(this.idOrdenDeTrabajoDesdeUrl).subscribe(response => {
          this.ordenTrabajo = response;
          response.Herramienta != null ? this.herramientaModel = response.Herramienta : this.herramientaModel = new HerramientaModel();
          response.Material != null ? this.ordenTrabajo.Material = response.Material : this.ordenTrabajo.Material = new HerramientaMaterialModel();
          response.Herramienta != null ? this.ordenTrabajo.Herramienta = response.Herramienta : this.ordenTrabajo.Herramienta = new HerramientaModel();

          response.TamanoHerramienta != null ? this.ordenTrabajo.TamanoHerramienta = response.TamanoHerramienta : this.ordenTrabajo.TamanoHerramienta = new HerramientaTamanoModel();

          this.Cliente = new EntidadModel();
          this.Cliente.Valor = this.ordenTrabajo.Cliente.NickName;
          this.Cliente.Id = this.ordenTrabajo.Cliente.Id;

          this.Linea = new EntidadModel();
          this.Linea.Valor = this.ordenTrabajo.Linea.Nombre;
          this.Linea.Id = this.ordenTrabajo.Linea.Id;

          this.herramienta = new EntidadModel();
          this.herramienta.Valor = this.ordenTrabajo.Herramienta.Nombre;
          this.herramienta.Id = this.ordenTrabajo.Herramienta.Id;

          this.inicializarFormulario(this.ordenTrabajo)


        })
      }
    }


    this.loaderService.display(false);



  }

  backClicked() {
    this.location.back();
  }

  inicializarFormulario(ordenTrabajo: OrdenTrabajoModel) {
    if (this.herramientaModel.Materiales) {


      if (this.herramientaModel.Materiales.length > 0) {
        if (this.herramientaModel.Materiales.find(c => { return c.Id == this.materialId || c.Id == ordenTrabajo.MaterialId })) {
          if (ordenTrabajo.MaterialId) {
            this.material = this.herramientaModel.Materiales.find(c => { return c.Id == ordenTrabajo.MaterialId });
            this.materialId = ordenTrabajo.MaterialId
          } else {
            this.material = this.herramientaModel.Materiales.find(c => { return c.Id == this.materialId });
          }
        }
      }
    }


    this.formularioOrdenTrabajo = this.formBulder.group({

      Cantidad: [ordenTrabajo.Herramienta.EsHerramientaPorCantidad ? ordenTrabajo.Cantidad : 1],

      DetallesSolicitud: [ordenTrabajo.DetallesSolicitud],
      ObservacionRemision: [ordenTrabajo.ObservacionRemision],
      OrdenCompra: [ordenTrabajo.OrdenCompra],
      RemisionCliente: [ordenTrabajo.RemisionCliente],
      SerialHerramienta: [ordenTrabajo.SerialHerramienta],
      SerialMaterial: [ordenTrabajo.SerialMaterial],
      PrioridadId: [ordenTrabajo.PrioridadId],
      ProvieneDeSolicitud: [ordenTrabajo.SolicitudOrdenTrabajo ? true : false],


      TipoServicioId: [ordenTrabajo.TipoServicio.Id],
      TipoServicio: this.formBulder.group({
        Id: [ordenTrabajo.TipoServicio.Id],
        Valor: [ordenTrabajo.TipoServicio.Valor]
      }),




      MaterialId: [this.material.Id == 0 ? null : this.material.Id],


      TamanoHerramientaId: [ordenTrabajo.TamanoHerramienta.Id],
      TamanoHerramienta: this.formBulder.group({
        Id: [ordenTrabajo.TamanoHerramienta.Id],
        Tamano: [ordenTrabajo.TamanoHerramienta.Tamano]
      }),

      HerramientaId: [this.herramienta ? this.herramienta.Id : ordenTrabajo.Herramienta.Id],
      Herramienta: [this.herramienta],

      LineaId: [this.Linea ? this.Linea.Id : ordenTrabajo.Linea.Id],
      Linea: [this.Linea],

      ClienteId: [this.Cliente ? this.Cliente.Id : ordenTrabajo.ClienteId],
      Cliente: [this.Cliente, Validators.required],
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

  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {
    this.confimar.llenarObjectoData(titulo, Mensaje, Cancelar, objData);
  }

  enviarFormularioConfir(event) {
    if (event.response) {
      this.enviar(event.formularioOrdenTrabajo);
    }
  }

  enviar(data) {
    debugger;
    let form = this.formularioOrdenTrabajo.get('Linea')
    if (this.lineas.length > 0) {
      form.setValidators(Validators.required)
    } else {
      form.setValidators(null);
    }
    form.updateValueAndValidity();

    if (this.formularioOrdenTrabajo.status != 'VALID') {
      return
    }
    var objeto = this.asignarValoresFormulario(data);
    this.inicializarFormulario(objeto);
    var objeto = this.asignarValoresFormulario(this.formularioOrdenTrabajo.value);
    console.log(this.formularioOrdenTrabajo.value)
    console.log(JSON.stringify(objeto));
    if (this.esEditar) {
      objeto.LineaId = objeto.Linea.Id;
      objeto.HerramientaId = objeto.Herramienta.Id;
      objeto.ClienteId = objeto.Cliente.Id;
    }
    objeto.Cliente = null;
    objeto.Linea = null;
    objeto.Herramienta = null;
    this.persistirOrdenTrabajo(objeto);
  }

  persistirOrdenTrabajo(objeto) {

    switch (this.accionRealizar()) {
      case 'Editar OIT':
        this.loaderService.display(true);
        this.ordenTrabajoServicio.actualizarOrdenDeTrabajo(objeto).subscribe(response => {

          this.loaderService.display(false);
          if (response) {

            this.toastrService.success('peticion realizada exitosamente')
            this.router.navigate(['/oit']);
          }

        });
        break;
      case 'Crear OIT':
        this.loaderService.display(true);
        debugger;

        this.ordenTrabajoServicio.crearOrdenDeTrabajo(objeto).subscribe(response => {

          this.loaderService.display(false);
          if (response) {
            this.toastrService.success('peticion realizada exitosamente')
            this.router.navigate(['/oit']);
          }

        });;
        break;
      case 'Procesar':
        this.loaderService.display(true);
        this.ordenTrabajoServicio.crearOrdenDeTrabajo(objeto).subscribe(response => {


          this.loaderService.display(false);
          if (response) {
            this.toastrService.success('peticion realizada exitosamente')
            this.router.navigate(['/oit']);
          }

        });;
        break;

    }



  }


  asignarValoresFormulario(data) {

    Object.assign(this.ordenTrabajo, data);
    this.Cliente ? this.ordenTrabajo.ClienteId = this.Cliente.Id : this.ordenTrabajo.ClienteId


    return this.ordenTrabajo;

  }

  historial(ordenTrabajo, verHistorial) {
    this.oit = ordenTrabajo;
    this.verHistorial = verHistorial

  }

  herramientaValor(evento) {
    console.log(evento)
  }



  addFile(event: any) {
    try {
      let reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          let attachment: AttachmentModel = this.leerArchivo(reader, file);

          //estos campo debe ser actualizado con la api de seguridad
          this.llenarDatosDeSeguidad(attachment);

          this.anexos.push(attachment);


          let ordenTrabajoAnexosModel: OrdenTrabajoAnexosModel = this.crearNuevoAnexo(attachment);



          this.InstaciarAnexos();


          this.ordenTrabajo.Anexos.push(ordenTrabajoAnexosModel);

        }
      }


    } catch (ex) {
    }
  }

  private InstaciarAnexos() {
    if (this.ordenTrabajo.Anexos == null || this.ordenTrabajo.Anexos == undefined) {
      this.ordenTrabajo.Anexos = new Array<OrdenTrabajoAnexosModel>();
    }
  }

  private crearNuevoAnexo(attachment: AttachmentModel) {
    let ordenTrabajoAnexosModel: OrdenTrabajoAnexosModel = new OrdenTrabajoAnexosModel();
    ordenTrabajoAnexosModel.DocumentoAdjunto = attachment;
    ordenTrabajoAnexosModel.Estado = true;
    return ordenTrabajoAnexosModel;
  }

  private leerArchivo(reader: FileReader, file: any) {
    let attachment: AttachmentModel = new AttachmentModel();
    attachment.Extension = reader.result.split(',')[0];
    attachment.NombreArchivo = file.name;
    attachment.Nombre = file.name;
    attachment.Stream = reader.result.split(',')[1];
    return attachment;
  }

  private llenarDatosDeSeguidad(attachment: AttachmentModel) {
    attachment.NombreUsuarioCrea = 'Admin';
    attachment.GuidUsuarioCrea = '00000000-0000-0000-0000-000000000000';
    attachment.GuidOrganizacion = '00000000-0000-0000-0000-000000000000';
  }

  eliminarAdjunto(anexo) {

  }
}

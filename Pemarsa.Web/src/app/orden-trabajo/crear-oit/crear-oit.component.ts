
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ParametroService } from '../../common/services/entity/parametro.service';
import { ParametrosModel, OrdenTrabajoModel, ClienteModel, PaginacionModel, ClienteLineaModel, HerramientaModel, HerramientaMaterialModel, HerramientaTamanoModel, SolicitudOrdenTrabajoModel, AttachmentModel, OrdenTrabajoAnexosModel, CatalogoModel } from '../../common/models/Index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  private oit: any;
  //directiva en html
  @ViewChild(ConfirmacionComponent) confimar: ConfirmacionComponent;
  @ViewChild('instance') instance: NgbTypeahead;

  //formulario
  private formularioOrdenTrabajo: FormGroup;
  private anexos: any = [];

  //parametros catalogo
  private parametrosTipoServicio: ParametrosModel = new ParametrosModel();
  private parametrosPrioridadOrdenTrabajo: ParametrosModel = new ParametrosModel();
  //objeto formulario
  private ordenTrabajo: OrdenTrabajoModel;
  private solicitudOrdenTrabajo: SolicitudOrdenTrabajoModel;


  //id que viene de la uri
  private idOrdenDeTrabajoDesdeUrl;

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
  private materialId;
  private material = new HerramientaMaterialModel();;


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
    private loaderService : LoaderService
  ) { }

  ngOnInit() {
    this.ordenTrabajo = new OrdenTrabajoModel();
    this.accionRealizar()
    this.obtenerOrdenTrabajoURI();
    this.paginacion = new PaginacionModel(1, 10);
    this.consultarHerraminetas();

    this.consultarParametros();

    this.consultarOrdenTrabajo();


  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad('ORDEN_TRABAJO')
      .subscribe(response => {
        this.parametrosTipoServicio.Catalogos = response.Catalogos.filter(tipoServicio => { return tipoServicio.Grupo == 'TIPO_SERVICIO_ORDEN_TRABAJO' });
        this.parametrosPrioridadOrdenTrabajo.Catalogos = response.Catalogos.filter(tipoServicio => { return tipoServicio.Grupo == 'PRIORIDAD_ORDENTRABAJO' });

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
  formatoValorMostrarHerramienta = (x: { Nombre: string }) => x.Nombre;

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


  buscarConcidenciaHerramienta = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    map(term => {
      if (term === '_') {
        return this.herraminetas
      } else if (term === '')
        return [];
      else {
        return this.herraminetas.filter(v => v.Nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      }

    }));


  buscarConcidenciaHerrmienta(event) {
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
    this.inicializarFormulario(new OrdenTrabajoModel());
    if (this.accionRealizarTituloPagina == 'Procesar') {
      this.solicitudOrdenTrabajoService.consultarSolicitudDeTrabajoPorGuid(this.idOrdenDeTrabajoDesdeUrl).subscribe(response => {
        this.solicitudOrdenTrabajo = response;
        this.asignarValoresSolitudOrdenTrabajo(this.solicitudOrdenTrabajo, this.ordenTrabajo)
        this.inicializarFormulario(this.ordenTrabajo)

      });
    }
    else {
      if (!this.esNueva || this.idOrdenDeTrabajoDesdeUrl) {
        this.ordenTrabajoServicio.consultarOrdenDeTrabajoPorGuid(this.idOrdenDeTrabajoDesdeUrl).subscribe(response => {
          this.ordenTrabajo = response;
          response.Herramienta != null ? this.herramienta = response.Herramienta : this.herramienta = new HerramientaModel();
          response.Material != null ? this.ordenTrabajo.Material = response.Material : this.ordenTrabajo.Material = new HerramientaMaterialModel();
          response.Herramienta != null ? this.ordenTrabajo.Herramienta = response.Herramienta : this.ordenTrabajo.Herramienta = new HerramientaModel();

          response.TamanoHerramienta != null ? this.ordenTrabajo.TamanoHerramienta = response.TamanoHerramienta : this.ordenTrabajo.TamanoHerramienta = new HerramientaTamanoModel();
          this.inicializarFormulario(this.ordenTrabajo)

        })
      }
    }





  }

  backClicked() {
    this.location.back();
  }

  inicializarFormulario(ordenTrabajo: OrdenTrabajoModel) {

    if (this.herramienta.Materiales.length > 0) {
      if (this.herramienta.Materiales.find(c => { return c.Id == this.materialId || c.Id == ordenTrabajo.MaterialId })) {
        if (ordenTrabajo.MaterialId) {
          this.material = this.herramienta.Materiales.find(c => { return c.Id == ordenTrabajo.MaterialId });
          this.materialId = ordenTrabajo.MaterialId
        } else {
          this.material = this.herramienta.Materiales.find(c => { return c.Id == this.materialId });
        }
      }
    }


    this.formularioOrdenTrabajo = this.formBulder.group({

      Cantidad: [ordenTrabajo.Cantidad],
      CantidadInspeccionar: [ordenTrabajo.CantidadInspeccionar],
      DetallesSolicitud: [ordenTrabajo.DetallesSolicitud],
      ObservacionRemision: [ordenTrabajo.ObservacionRemision],
      OrdenCompra: [ordenTrabajo.OrdenCompra],
      RemisionCliente: [ordenTrabajo.RemisionCliente],
      SerialHerramienta: [ordenTrabajo.SerialHerramienta],
      SerialMaterial: [ordenTrabajo.SerialMaterial],
      PrioridadId : [ordenTrabajo.PrioridadId],
      ProvieneDeSolicitud: [ordenTrabajo.SolicitudOrdenTrabajo ? true : false],


      TipoServicioId: [ordenTrabajo.TipoServicio.Id],
      TipoServicio: this.formBulder.group({
        Id: [ordenTrabajo.TipoServicio.Id],
        Valor: [ordenTrabajo.TipoServicio.Valor]
      }),




      MaterialId: [this.material.Id],

      Material: this.formBulder.group({
        Id: [this.material.Id],
        Material: this.formBulder.group({
          Id: [this.material.Material.Id],
          Valor: [this.material.Material.Valor]
        })

      }),
      TamanoHerramientaId: [ordenTrabajo.TamanoHerramienta.Id],
      TamanoHerramienta: this.formBulder.group({
        Id: [ordenTrabajo.TamanoHerramienta.Id],
        Tamano: [ordenTrabajo.TamanoHerramienta.Tamano]
      }),

      HerramientaId: [ordenTrabajo.Herramienta.Id],
      Herramienta: [ordenTrabajo.Herramienta],

      LineaId: [ordenTrabajo.Linea.Id],
      Linea: [ordenTrabajo.Linea],

      ClienteId: [ordenTrabajo.Cliente.Id],
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

  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {
    this.confimar.llenarObjectoData(titulo, Mensaje, Cancelar, objData);
  }

  enviarFormularioConfir(event) {
    if (event.response) {
      this.enviar(event.formularioOrdenTrabajo);
    }
  }

  enviar(data) {

    if (this.formularioOrdenTrabajo.status != 'VALID') {
      return
    }
    var objeto = this.asignarValoresFormulario(data);
    this.inicializarFormulario(objeto);
    var objeto = this.asignarValoresFormulario(this.formularioOrdenTrabajo.value);
    console.log(this.formularioOrdenTrabajo.value)
    console.log(JSON.stringify(objeto));
    this.persistirOrdenTrabajo(objeto);

  }

  persistirOrdenTrabajo(objeto) {
    this.loaderService.display(true);
    switch (this.accionRealizar()) {
      case 'Editar OIT':
        this.ordenTrabajoServicio.actualizarOrdenDeTrabajo(objeto).subscribe(response => {
            this.loaderService.display(true);
          if (response) {

            this.toastrService.success('correcto', 'accion' + this.accionRealizar())
            this.router.navigate(['/oit']);
          }
          this.loaderService.display(false);

        });
        break;
      case 'Crear OIT':
        this.ordenTrabajoServicio.crearOrdenDeTrabajo(objeto).subscribe(response => {
          this.loaderService.display(true);

          if (response) {
            this.toastrService.success('correcto', 'accion' + this.accionRealizar())
            this.router.navigate(['/oit']);
          }
          this.loaderService.display(false);

        });;
        break;
      case 'Procesar':
        this.ordenTrabajoServicio.crearOrdenDeTrabajo(objeto).subscribe(response => {
          this.loaderService.display(true);

          if (response) {
            this.toastrService.success('correcto', 'accion' + this.accionRealizar())
            this.router.navigate(['/oit']);
          }
          this.loaderService.display(false);

        });;
        break;

    }
    this.loaderService.display(false);

    
  }


  asignarValoresFormulario(data) {

    Object.assign(this.ordenTrabajo, data);


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

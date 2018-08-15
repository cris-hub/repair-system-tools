import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ClienteModel, CatalogoModel } from "../../../common/models/Index";
import { ClienteLineaModel } from "../../../common/models/ClienteLineaModel";
import { ActivatedRoute, Router } from "@angular/router";
import { ClienteService } from "../../../common/services/entity";
import { ParametroService } from "../../../common/services/entity/parametro.service";
import { LineaClienteComponent } from "../linea-cliente/linea-cliente.component";
import { ParametrosModel } from "../../../common/models/ParametrosModel";
import { EntidadModel } from "../../../common/models/EntidadDTOModel";
import { AttachmentModel } from "../../../common/models/AttachmentModel";
import { ConfirmacionComponent } from "../../../common/directivas/confirmacion/confirmacion.component";
import { ToastrService } from "ngx-toastr";
import { ignoreElements } from "rxjs/operators";
import { LoaderService } from "../../../common/services/entity/loaderService";

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html'
})
export class CrearClienteComponent implements OnInit {
  //ViewChild para funcionalidad del modal de confirmacion
  @ViewChild(ConfirmacionComponent) confirmar: ConfirmacionComponent;
  @ViewChild(LineaClienteComponent) lineaClienteEvent: LineaClienteComponent;

  public  esActualizar: boolean;
  public  isSubmitted: boolean;
  public  loading: boolean;
  public  esVer: boolean = false;
  public  frmCliente: FormGroup;

  public  paramsCliente: ParametrosModel;
  public  responsables: CatalogoModel[];
  public  estados: EntidadModel[];

  public  cliente: ClienteModel = new ClienteModel();
  public  lineaCliente: ClienteLineaModel[] = new Array<ClienteLineaModel>();
  public  attachment: AttachmentModel = new AttachmentModel();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private frmBuilder: FormBuilder,
    private clienteSrv: ClienteService,
    private parametroSrv: ParametroService,
    private toastr: ToastrService,
    private loaderService:LoaderService,
  ) {
    this.loading = true;
    this.consultarParametros("cliente");
  }

  ngOnInit() {
    this.isSubmitted = false;
  }

 /**
 * obtiene los parametros de la url
 */
  getValues() {
    if (this.route.snapshot.routeConfig.path == 'cliente/ver/:id') {
      this.esVer = true;
    }
    var id = this.route.snapshot.paramMap.get('id');
    if (id == undefined) {
      this.initForm(new ClienteModel());
      this.esActualizar = false;
    }
    else {
      this.consultarCliente(id);
      this.esActualizar = true;
    }
  }

  /**
 * se consulta los Parametros del cliente y se los signa a una variables locales
 * @param entidad
 */
  consultarParametros(entidad: string) {
    this.parametroSrv.consultarParametrosPorEntidad(entidad)
      .subscribe(response => {

        this.paramsCliente = response;
        this.estados = response.Catalogos.filter(c => c.Grupo == 'ESTADOS_CLIENTES');
        this.responsables = response.Catalogos.filter(c => c.Grupo == 'RESPONSABLES');
        this.getValues();
      });
  }

  /* consultarCliente()
   * funcion que llama al servicio
   */
  consultarCliente(guid: string) {
    this.loaderService.display(true);
    this.clienteSrv.consultarClientePorGuid(guid)
      .subscribe(response => {
        this.cliente = response;

        this.lineaCliente = this.cliente.Lineas.filter(d => d.Activa == true);
        this.initForm(this.cliente);
        this.loaderService.display(false);
      });
  }

  initForm(cliente: ClienteModel) {//faltan las lineas
    this.frmCliente = this.frmBuilder.group({
      ContactoCorreo: [cliente.ContactoCorreo, Validators.required],
      ContactoNombre: [cliente.ContactoNombre, Validators.required],
      ContactoTelefono: [cliente.ContactoTelefono, Validators.required],
      Direccion: [cliente.Direccion, Validators.required],
      EstadoId: [cliente.EstadoId],
      NickName: [cliente.NickName, Validators.required],
      GuidResponsable: [cliente.GuidResponsable,Validators.required],
      Nit: [cliente.Nit, Validators.required],
      NombreResponsable: [''],//este campo debe ser actualizado con la api de seguridad
      RazonSocial: [cliente.RazonSocial, Validators.required],
      Telefono: [cliente.Telefono, Validators.required],
      Rut: [null],
      NombreUsuarioCrea: ['Admin'],//este campo debe ser actualizado con la api de seguridad
      GuidUsuarioCrea: ['00000000-0000-0000-0000-000000000000'],//este campo debe ser actualizado con la api de seguridad
      GuidOrganizacion: ['00000000-0000-0000-0000-000000000000']//este campo debe ser actualizado con la api de 
    });
    this.loading = false;
    this.frmCliente.valueChanges.subscribe(val => {
      this.isSubmitted = true;
    }); 
  }

  /* onSubmit(formulario)
 *  esta funcion se ejecuta con el boton guardar,
 *  y se encargar de Validar y encapsular los datos para enviarlos
 *  a la capacidad crear cliente o actualizar cliente 
 */
  submitForm(Cliente: FormGroup) {
    this.isSubmitted = false;
    this.frmCliente;
    //falta realizar la validacion del formulario if (this.validarForm() && this.arreglosValidos)
    if (this.esActualizar)
      this.actualizarCliente(Cliente);
    else
      this.crearCliente(Cliente);
  }

  /* crearCliente()
* funcion que se encargar de llamar los servicios y persistir los clientes
*/
  crearCliente(formValues) {
    this.cliente = <ClienteModel>formValues;
    this.cliente.EstadoId = this.estados.filter(t => t.Valor == "Activo")[0].Id
    this.cliente.Lineas = this.lineaCliente;
    if (this.attachment.Stream == null && this.attachment.Extension == null) {
      this.cliente.Rut = null;
    } else {
      this.cliente.Rut = this.attachment;
    }

    this.loaderService.display(true);
    this.clienteSrv.crearCliente(this.cliente)
      .subscribe(response => {
        debugger;
        this.toastr.success('Cliente registrado correctamente!', '');
        this.loaderService.display(false);
        setTimeout(e => { this.router.navigate(['/cliente']); }, 200);

      }, errorMessage => {
        debugger
        this.toastr.error(errorMessage.error.Message);
      });
  }

  /**
 * metodo que se utiliza para actualizar los cliente
 * @param formValues objeto que contiene la informacion para actualizar
 */
  actualizarCliente(formValues) {

    let cliente = <ClienteModel>Object.assign(this.cliente, formValues);
    
    cliente.Lineas = this.lineaCliente;

    if (this.attachment.Stream == null && this.attachment.Extension == null) {
      cliente.Rut = null;
    } else {
      cliente.DocumentoAdjuntoId = this.attachment.Id;
      cliente.Rut = this.attachment;
    }

    cliente.GuidUsuarioModifica = '00000000-0000-0000-0000-000000000000'//este campo debe ser actualizado con la api de seguridad
    cliente.NombreUsuarioModifica = 'admin'//este campo debe ser actualizado con la api de seguridad
    this.loaderService.display(true);

    this.clienteSrv.actualizarCliente(cliente)
      .subscribe(response => {
        debugger;
        this.toastr.success('Cliente modificado correctamente!', '');
        this.loaderService.display(false);

        setTimeout(e => { this.router.navigate(['/cliente']); }, 200);
      }, errorMessage => {
        debugger
        this.toastr.error(errorMessage.error.Message);
      });
  }

  llenarDataLineaCliente(objLineaCliente: ClienteLineaModel, accion: any, index: any) {
    this.lineaClienteEvent.llenarObjectoCliente(objLineaCliente, accion, index);
  }
  nuevoDataLineaCliente(accion: any) {
    this.lineaClienteEvent.nuevoDataLineaCliente(accion);
  }
  nuevaLineaCliente(data: any) {
    this.isSubmitted = true
    data.lineaCliente.Activa = true;
    if (data.accion == 'crear') {
      this.lineaCliente.push(data.lineaCliente);
    } else if (data.accion == 'editar') {
      this.lineaCliente[data.index] = data.lineaCliente;
    } 
  }

  eliminarCliente(linea: ClienteLineaModel) {
    this.isSubmitted = true
    this.lineaCliente.find(l => linea.Id == linea.Id).Activa = false;
  }

/* salir()
*esta funcion redirecciona al listar de cliente
*
*/
  salir(preguntar?: boolean) {
    //realizar la confirmacion
   this.router.navigate(['/cliente']);
  }

  addFile(event: any) {
    try {
      let reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        let file : File = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
    
          this.attachment.Extension = reader.result.split(',')[0].split('/')[1].split(';')[0];
          this.attachment.NombreArchivo = file.name;
          this.attachment.Stream = reader.result.split(',')[1];
          if (this.cliente.DocumentoAdjuntoId) {
            this.attachment.Id = this.cliente.DocumentoAdjuntoId;
          }

          //estos campo debe ser actualizado con la api de           
          
          this.attachment.NombreUsuarioCrea = 'Admin';
          this.attachment.GuidUsuarioCrea = '00000000-0000-0000-0000-000000000000';
          this.attachment.GuidOrganizacion = '00000000-0000-0000-0000-000000000000';

        }
        this.frmCliente.patchValue({
          Rut: [this.attachment]
        });
      }

      
    } catch (ex) {
    }
  }

  descargarAdjunto() {
    if (this.cliente.Rut != null) {
      //falta realizar la implementacion
      //console.log("hay archivo");
      //console.log(this.cliente.Rut);
      //let file = new Blob([this.cliente.Rut.Stream], { type: 'application/pdf' });
      //let fileURL = URL.createObjectURL(file);
      //window.open(fileURL);
    }
  }

  //Funcion para implementar el modal con la informacion respectiva
  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {

    this.confirmar.llenarObjectoData(titulo, Mensaje, Cancelar, objData);
  }
  actualizarEstadoClienteConfirmacion(event: any) {
    
    if (!this.frmCliente.valid) {
      this.toastr.error('Faltan datos por diligenciar')
      return
    }
    if (event.response == true) {
      this.submitForm(event.frmCliente);
    }
  }
}

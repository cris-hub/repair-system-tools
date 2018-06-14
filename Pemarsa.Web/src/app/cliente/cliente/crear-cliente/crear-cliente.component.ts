import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ClienteModel } from "../../../common/models/Index";
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

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html'
})
export class CrearClienteComponent implements OnInit {
  //ViewChild para funcionalidad del modal de confirmacion
  @ViewChild(ConfirmacionComponent) confirmar: ConfirmacionComponent;
  @ViewChild(LineaClienteComponent) lineaClienteEvent: LineaClienteComponent;

  private esActualizar: boolean;
  private isSubmitted: boolean;
  private loading: boolean;
  private esVer: boolean = false;
  private frmCliente: FormGroup;

  private paramsCliente: ParametrosModel;
  private estados: EntidadModel[];

  private cliente: ClienteModel = new ClienteModel();
  private lineaCliente: ClienteLineaModel[] = new Array<ClienteLineaModel>();
  private attachment: AttachmentModel = new AttachmentModel();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private frmBuilder: FormBuilder,
    private clienteSrv: ClienteService,
    private parametroSrv: ParametroService,
    private toastr: ToastrService
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
        this.getValues();
      });
  }

  /* consultarCliente()
   * funcion que llama al servicio
   */
  consultarCliente(guid: string) {
    this.clienteSrv.consultarClientePorGuid(guid)
      .subscribe(response => {
        this.cliente = response;
        this.lineaCliente = this.cliente.Lineas;
        this.initForm(this.cliente);
      });
  }

  initForm(cliente: ClienteModel) {//faltan las lineas
    this.frmCliente = this.frmBuilder.group({
      ContactoCorreo: [cliente.ContactoCorreo],
      ContactoNombre: [cliente.ContactoNombre],
      ContactoTelefono: [cliente.ContactoTelefono],
      Direccion: [cliente.Direccion],
      EstadoId: [cliente.EstadoId],
      NickName: [cliente.NickName],
      Nit: [cliente.Nit],
      NombreResponsable: [''],//este campo debe ser actualizado con la api de seguridad
      RazonSocial: [cliente.RazonSocial],
      Telefono: [cliente.Telefono],
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

    this.clienteSrv.crearCliente(this.cliente)
      .subscribe(response => {
        this.toastr.success('cliente registrado correctamente!', '');
        setTimeout(e => { this.router.navigate(['/cliente']); },200);
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
    
    this.clienteSrv.actualizarCliente(cliente)
      .subscribe(response => {
        this.toastr.success('cliente editado correctamente!', '');
        setTimeout(e => { this.router.navigate(['/cliente']); }, 200);
      });
  }

  llenarDataLineaCliente(objLineaCliente: ClienteLineaModel, accion: any, index: any) {
    this.lineaClienteEvent.llenarObjectoCliente(objLineaCliente, accion, index);
  }
  nuevoDataLineaCliente(accion: any) {
    this.lineaClienteEvent.nuevoDataLineaCliente(accion);
  }
  nuevaLineaCliente(data: any) {
    if (data.accion == 'crear') {
      this.lineaCliente.push(data.lineaCliente);
    } else if (data.accion == 'editar') {
      this.lineaCliente[data.index] = data.lineaCliente;
    } 
  }

  eliminarCliente(index: any) {
    this.lineaCliente.splice(index, 1); 
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
    if (event.response == true) {
      this.submitForm(event.frmCliente);
    }
  }
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ClienteModel } from "../../../common/models/Index";
import { ClienteLineaModel } from "../../../common/models/ClienteLineaModel";
import { ActivatedRoute, Router } from "@angular/router";
import { ClienteService } from "../../../common/services/entity";
import { ParametroService } from "../../../common/services/entity/parametro.service";
import { LineaClienteComponent } from "../linea-cliente/linea-cliente.component";

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html'
})
export class CrearClienteComponent implements OnInit {
  @ViewChild(LineaClienteComponent) lineaClienteEvent: LineaClienteComponent;

  private esActualizar: boolean;
  private isSubmitted: boolean;
  private loading: boolean;
  private frmCliente: FormGroup;

  private cliente: ClienteModel;
  private lineaCliente: ClienteLineaModel[] = new Array<ClienteLineaModel>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private frmBuilder: FormBuilder,
    private clienteSrv: ClienteService,
    private parametroSrv: ParametroService
  ) {
    this.loading = true;
    //como no estoy consultado parametros la llamo al inicio
    this.getValues();
  }

  ngOnInit() {
    this.isSubmitted = false;
  }

 /**
 * obtiene los parametros de la url
 */
  getValues() {
    var id = this.route.snapshot.paramMap.get('id');
    if (id == undefined) {
      this.initForm(new ClienteModel());
      this.esActualizar = false;
    }
    else {
      //es  this.consultarCliente(id);
      this.esActualizar = true;
    }
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
      NombreResponsable: [cliente.NombreResponsable],
      RazonSocial: [cliente.RazonSocial],
      Telefono: [cliente.Telefono]
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

    console.log("submitForm");
    console.log(Cliente);
    /*if (this.validarForm() && this.arreglosValidos) {

      if (this.esActualizar)
        this.actualizarCliente(Cliente);
      else
        this.crearCliente(Cliente);
    }
    else {
      this.snackBar.open('El campo "' + this.formEsValido.id + '" no es valido ', null, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    }
    this.arreglosValidos = true;*/
  }

  llenarDataLineaCliente(objLineaCliente: ClienteLineaModel, accion: any, index: any) {
    console.log(objLineaCliente);
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

}

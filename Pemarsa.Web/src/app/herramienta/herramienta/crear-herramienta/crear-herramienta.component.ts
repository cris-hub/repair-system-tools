import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ParametroService } from "../../../common/services/entity/parametro.service";
import { FactibilidadHerramientaComponent } from "../factibilidad-herramienta/factibilidad-herramienta.component";
import { ParametrosModel } from "../../../common/models/ParametrosModel";
import { EntidadModel } from "../../../common/models/EntidadDTOModel";
import { ConfirmacionComponent } from "../../../common/directivas/confirmacion/confirmacion.component";
import { ToastrService } from "ngx-toastr";
import { HerramientaModel, HerramientaEstudioFactibilidadModel, CatalogoModel, EntityModel, HerramientaTamanoMotorModel, HerramientaTamanoModel, ClienteModel, PaginacionModel, ClienteLineaModel, HerramientaMaterialModel } from "../../../common/models/Index";
import { HerramientaService, ClienteService } from "../../../common/services/entity";
import { retry } from "rxjs/operators";

@Component({
  selector: 'app-crear-herramienta',
  templateUrl: './crear-herramienta.component.html'
})
export class CrearHerramientaComponent implements OnInit {
  //ViewChild para funcionalidad del modal de confirmacion
  @ViewChild(ConfirmacionComponent) confirmar: ConfirmacionComponent;
  @ViewChild(FactibilidadHerramientaComponent) FactibilidadHerramientaComponentEvent: FactibilidadHerramientaComponent;
  @ViewChild('inputTamanoMotor') inputTamanoMotor: ElementRef;
  @ViewChild('inputTamanoHerramienta') inputTamanoHerramienta: ElementRef;


  public esActualizar: boolean;
  public isSubmitted: boolean;
  public loading: boolean;
  public esVer: boolean = false;
  public frmHerramienta: FormGroup;

  public esEstudioFactibilidad: string = "vacio";


  public paramsMateriales: ParametrosModel;
  public estados: EntidadModel[];
  public materialHerramienta: EntidadModel[];

  public herramienta: HerramientaModel = new HerramientaModel();
  public herramientaEstudioFactibilidad: HerramientaEstudioFactibilidadModel = new HerramientaEstudioFactibilidadModel();

  public CatalogoMaterialesVer: EntidadModel[] = new Array<EntidadModel>();
  public CatalogoMaterialesAdd: EntidadModel[] = new Array<EntidadModel>();
  public Materiales: HerramientaMaterialModel[] = new Array<HerramientaMaterialModel>();

  public herramientaTamanoMotor: HerramientaTamanoMotorModel[] = new Array<HerramientaTamanoMotorModel>();
  public herramientaTamano: HerramientaTamanoModel[] = new Array<HerramientaTamanoModel>();

  public paramsCliente: ParametrosModel;
  //parametro visualizar ui
  public paramsClientes: ParametrosModel;
  public clientes: CatalogoModel[] = new Array<CatalogoModel>();
  public clienteLinea: CatalogoModel[] = new Array<CatalogoModel>();

  public verificadores: CatalogoModel[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private frmBuilder: FormBuilder,
    private herramientaSrv: HerramientaService,
    private parametroSrv: ParametroService,
    private toastr: ToastrService
  ) {
    this.loading = true;
    this.consultarParametrosUsuarios("cliente");
    this.consultarParametros("Materiales");
    this.consultarClientes();
  }

  ngOnInit() {
    this.isSubmitted = false;
  }

  /**
  * obtiene los parametros de la url
  */
  getValues() {
    if (this.route.snapshot.routeConfig.path == 'herramienta/ver/:id') {
      this.esVer = true;
    }
    var id = this.route.snapshot.paramMap.get('id');
    if (id == undefined) {
      this.initForm(new HerramientaModel());
      this.esActualizar = false;
    }
    else {
      this.ConsultarHerramienta(id);
      this.esActualizar = true;
    }
  }

  /* onSubmit(formulario)
  *  esta funcion se ejecuta con el boton guardar,
  *  y se encargar de Validar y encapsular los datos para enviarlos
  *  a la capacidad crear cliente o actualizar cliente 
  */
  submitForm(Herramienta: FormGroup) {


    this.isSubmitted = false;
    this.frmHerramienta;

    //falta realizar la validacion del formulario if (this.validarForm() && this.arreglosValidos)
    if (this.esActualizar)
      this.actualizarHerramienta(Herramienta);
    else
      this.crearHerramienta(Herramienta);
  }

  /**
  * metodo que se utiliza para actualizar los herramientas
  * @param formValues objeto que contiene la informacion para actualizar
  */
  actualizarHerramienta(formValues) {

    let herramienta = <HerramientaModel>Object.assign(this.herramienta, formValues);
    this.cargarDataAcciones(formValues);
    this.herramientaSrv.actualizarHerramienta(herramienta)
      .subscribe(response => {
        this.toastr.success('Herramienta editada correctamente!', '');
        setTimeout(e => { this.router.navigate(['/herramienta']); }, 200);
      });
  }

  /* ConsultarHerramienta()
  * funcion que llama al servicio
  */
  ConsultarHerramienta(guid: string) {
    this.herramientaSrv.ConsultarHerramientaPorGuid(guid)
      .subscribe(response => {
        this.herramienta = response;
        this.cargarMateriales(this.herramienta.Materiales);
        this.initForm(this.herramienta);
        if (this.herramienta.LineaId != null) {
          this.clienteLinea = this.paramsClientes.Consultas.filter(e => e.Id == this.herramienta.LineaId && e.Grupo == "clientelinea");
        }
        this.esEstudioFactibilidad = this.estudioDefactibilidadEstado(this.herramienta.HerramientaEstudioFactibilidad)

        this.cargarLineas(this.herramienta);
        this.herramientaTamanoMotor = this.herramienta.TamanosMotor.filter(e => e.Estado == true);
        this.herramientaTamano = this.herramienta.TamanosHerramienta.filter(e => e.Estado == true);
        this.cargarHerramientaFactibilidad(this.herramienta.HerramientaEstudioFactibilidad);
        console.log(this.herramienta)

      });
  }


  estudioDefactibilidadEstado(estudio: HerramientaEstudioFactibilidadModel) {
    let checksoks = 0;
    if (!estudio) {
      return 'vacio'
    }
    let bool: boolean = false;
    for (var valor in estudio) {
      if (typeof (estudio[valor]) == 'boolean') {
        let bool: boolean = true;
        if (!(estudio[valor])) {
          return 'falta'
        } else {
          checksoks += 1;
        }

      }

    }
    if (checksoks == 6) {
      return 'ok'

    } else if (checksoks == 0) {
      return 'vacio'
    } else if (checksoks < 6) {
      return 'falta'

    }

    return 'ok'
  }

  cargarHerramientaFactibilidad(objHerramientaFactibilidad: HerramientaEstudioFactibilidadModel) {
    this.herramientaEstudioFactibilidad.Id = objHerramientaFactibilidad.Id;
    this.herramientaEstudioFactibilidad.Guid = objHerramientaFactibilidad.Guid;
    this.herramientaEstudioFactibilidad.Admin = objHerramientaFactibilidad.Admin;
    this.herramientaEstudioFactibilidad.ManoObra = objHerramientaFactibilidad.ManoObra;
    this.herramientaEstudioFactibilidad.Mantenimiento = objHerramientaFactibilidad.Mantenimiento;
    this.herramientaEstudioFactibilidad.Maquina = objHerramientaFactibilidad.Maquina;
    this.herramientaEstudioFactibilidad.Material = objHerramientaFactibilidad.Material;
    this.herramientaEstudioFactibilidad.Metodo = objHerramientaFactibilidad.Metodo;
    this.herramientaEstudioFactibilidad.HerramientaId = objHerramientaFactibilidad.HerramientaId;
  }

  cargarLineas(herramienta: any) {
    let objCliente: CatalogoModel[] = this.clientes.filter(e => e.Id == herramienta.ClienteId && e.Grupo == "clientelinea");
    if (objCliente.length > 0) {
      this.clienteLinea = objCliente;
    }
  }

  cargarMateriales(materiales: any) {
    for (let material in materiales) {
      if (materiales[material].Estado == true) {
        let objMaterial: any = this.CatalogoMaterialesVer.find(e => e.Id == materiales[material].MaterialId);
        let index: any = this.CatalogoMaterialesVer.findIndex(c => c.Id == materiales[material].MaterialId);
        this.CatalogoMaterialesAdd.push(objMaterial);
        this.CatalogoMaterialesVer.splice(index, 1);
      }
    }
  }

  /* crearHerramienta()
  * funcion que se encargar de llamar los servicios y persistir los clientes
  */
  crearHerramienta(formValues) {
    this.herramienta = <HerramientaModel>formValues;
    this.herramienta.EstadoId = this.estados.filter(t => t.Valor == "Activo")[0].Id
    this.cargarDataAcciones(formValues);
    this.herramientaSrv.CrearHerramienta(this.herramienta)
      .subscribe(response => {
        this.toastr.success('Herramienta registrada correctamente!', '');
        setTimeout(e => { this.router.navigate(['/herramienta']); }, 200);
      });
  }

  cargarDataAcciones(formValues) {
    this.herramienta.TamanosMotor = this.herramientaTamanoMotor;
    this.herramienta.TamanosHerramienta = this.herramientaTamano;
    this.herramienta.HerramientaEstudioFactibilidad = this.herramientaEstudioFactibilidad;
    for (let material in this.CatalogoMaterialesAdd) {
      let nuevoMaterial: HerramientaMaterialModel = new HerramientaMaterialModel();
      let objHerramientaMaterial: HerramientaMaterialModel = new HerramientaMaterialModel();
      if (this.herramienta.Materiales != undefined) {
        objHerramientaMaterial = this.herramienta.Materiales.find(e => e.MaterialId == this.CatalogoMaterialesAdd[material].Id);
      }
      else {
        objHerramientaMaterial = undefined;
      }
      nuevoMaterial.Id = (objHerramientaMaterial != undefined ? objHerramientaMaterial.Id : 0);
      nuevoMaterial.Guid = (objHerramientaMaterial != undefined ? objHerramientaMaterial.Guid : "00000000-0000-0000-0000-000000000000")
      nuevoMaterial.Estado = true;
      nuevoMaterial.MaterialId = this.CatalogoMaterialesAdd[material].Id;
      nuevoMaterial.GuidUsuarioCrea = (objHerramientaMaterial != undefined ? objHerramientaMaterial.GuidUsuarioCrea : "00000000-0000-0000-0000-000000000000");//este campo debe ser llenado desde la api de seguridad
      nuevoMaterial.GuidOrganizacion = (objHerramientaMaterial != undefined ? objHerramientaMaterial.GuidOrganizacion : "00000000-0000-0000-0000-000000000000");//este campo debe ser llenado desde la api de seguridad
      nuevoMaterial.NombreUsuarioCrea = (objHerramientaMaterial != undefined ? objHerramientaMaterial.NombreUsuarioCrea : "Admin");//este campo debe ser llenado desde la api de seguridad
      this.Materiales.push(nuevoMaterial);
    }
    this.herramienta.Materiales = this.Materiales;
  }

  initForm(herramienta: HerramientaModel) {//faltan las lineas
    this.frmHerramienta = this.frmBuilder.group({
      ClienteId: [herramienta.ClienteId],
      EsHerramientaMotor: [herramienta.EsHerramientaMotor],
      GuidUsuarioVerifica: [herramienta.GuidUsuarioVerifica, Validators.required],
      EsHerramientaPetrolera: [herramienta.EsHerramientaPetrolera, Validators.required],
      Materiales: [herramienta.Materiales],
      HerramientaEstudioFactibilidad: [herramienta.HerramientaEstudioFactibilidad, Validators.required],
      TamanosMotor: [this.herramientaTamanoMotor],
      TamanosHerramienta: [this.herramientaTamano],
      EsHerramientaPorCantidad: [herramienta.EsHerramientaPorCantidad],
      EstadoId: [herramienta.EstadoId],
      NombreUsuarioVerifica: ['Admin'],//este campo debe ser actualizado con la api de seguridad
      LineaId: [herramienta.LineaId],
      Moc: [herramienta.Moc],
      Nombre: [herramienta.Nombre],
      NombreUsuarioCrea: ['Admin'],//este campo debe ser actualizado con la api de seguridad
      GuidUsuarioCrea: ['00000000-0000-0000-0000-000000000000'],//este campo debe ser actualizado con la api de seguridad
      GuidOrganizacion: ['00000000-0000-0000-0000-000000000000']//este campo debe ser actualizado con la api de seguridad
    });
    this.loading = false;
    this.frmHerramienta.valueChanges.subscribe(val => {
      console.log(val.EsHerramientaMotor)
      this.herramienta.EsHerramientaMotor = val.EsHerramientaMotor
      this.isSubmitted = true;
    });
  }

  validacionLineaCliente() {
    let valor = this.frmHerramienta.controls['ClienteId'].value
    if (valor && this.clienteLinea.length > 0) {
      this.frmHerramienta.controls['LineaId'].setValidators(Validators.required)
    } else {

      this.frmHerramienta.setControl('LineaId', new FormControl(null))

    }
    this.frmHerramienta.updateValueAndValidity();
  }
  validacionHerramientaMotor() {
    let valor = this.frmHerramienta.controls['EsHerramientaMotor'].value
    if (valor) {
      if (this.frmHerramienta.get('TamanosHerramienta').value.length>0) {

      }
      this.frmHerramienta.get('EsHerramientaMotor')
      this.frmHerramienta.get('TamanosMotor').setValidators(Validators.required)
      this.frmHerramienta.get('TamanosMotor').setErrors({ 'requerido': true })

      this.frmHerramienta.get('TamanosHerramienta').setValidators(Validators.required)
      this.frmHerramienta.get('TamanosHerramienta').setErrors({ 'requerido': true })

      if (this.frmHerramienta.get('TamanosMotor').value.length > 0 &&
        this.frmHerramienta.get('TamanosHerramienta').value.length > 0
        ) {
        this.frmHerramienta.get('TamanosMotor').setValidators(null)
        this.frmHerramienta.get('TamanosMotor').setErrors(null)

        this.frmHerramienta.get('TamanosHerramienta').setValidators(null)
        this.frmHerramienta.get('TamanosHerramienta').setErrors(null)
      }

    } else {
      this.frmHerramienta.get('TamanosMotor').setValidators(null)
      this.frmHerramienta.get('TamanosMotor').setErrors(null)

      this.frmHerramienta.get('TamanosHerramienta').setValidators(null)
      this.frmHerramienta.get('TamanosHerramienta').setErrors(null)


    }
    this.frmHerramienta.updateValueAndValidity();

  }

  /**
  * se consulta los Parametros del cliente y se los signa a una variables locales
  * @param entidad
  */
  consultarParametrosUsuarios(entidad: string) {
    this.parametroSrv.consultarParametrosPorEntidad(entidad)
      .subscribe(response => {

        this.paramsCliente = response;
        this.verificadores = response.Catalogos.filter(c => c.Grupo == 'RESPONSABLES');
        this.estados = response.Catalogos.filter(c => c.Grupo == 'ESTADOS_CLIENTES');
      });
  }

  /**
  * se consulta los Parametros del cliente y se los signa a una variables locales
  * @param entidad
  */
  consultarParametros(entidad: string) {
    this.parametroSrv.consultarParametrosPorEntidad(entidad)
      .subscribe(response => {

        this.paramsMateriales = response;
        this.materialHerramienta = response.Catalogos.filter(c => c.Grupo == 'HERRAMIENTAS_MATERIALES');
        this.getValues();
        this.CatalogoMaterialesVer = this.materialHerramienta;
      });

  }

  nuevoDataEstudioFactibilidad(objEstudioFactibilidad: HerramientaEstudioFactibilidadModel, accion: any) {
    this.isSubmitted = true;
    this.FactibilidadHerramientaComponentEvent.llenarObjectoEstudioFactibilidad(objEstudioFactibilidad, accion);
  }

  nuevoEstudioFactibilidad(data: any) {
    this.cargarHerramientaFactibilidad(data.HerramientaEstudioFactibilidad);
    this.herramientaEstudioFactibilidad.HerramientaId = this.herramientaEstudioFactibilidad.HerramientaId == undefined ? 0 : this.herramientaEstudioFactibilidad.HerramientaId;
    this.herramientaEstudioFactibilidad.Guid = this.herramientaEstudioFactibilidad.Guid == undefined ? "00000000-0000-0000-0000-000000000000" : this.herramientaEstudioFactibilidad.Guid;
    this.herramientaEstudioFactibilidad.Id = this.herramientaEstudioFactibilidad.Id == undefined ? 0 : this.herramientaEstudioFactibilidad.Id;
    this.herramientaEstudioFactibilidad.GuidUsuarioCrea = "00000000-0000-0000-0000-000000000000";//este campo debe ser llenado desde la api de seguridad
    this.herramientaEstudioFactibilidad.GuidOrganizacion = "00000000-0000-0000-0000-000000000000";//este campo debe ser llenado desde la api de seguridad
    this.herramientaEstudioFactibilidad.NombreUsuarioCrea = "Admin";//este campo debe ser llenado desde la api de seguridad
    this.esEstudioFactibilidad = data.esEstudioFactibilidad;
  }

  nuevoMaterial(event: any) {
    this.isSubmitted = true;
    let idSeleccionado: any = event.target.value;
    if (idSeleccionado != "null") {
      let nuevoItem: any = this.CatalogoMaterialesVer.find(c => c.Id == idSeleccionado);
      let index: any = this.CatalogoMaterialesVer.findIndex(c => c.Id == idSeleccionado);
      this.CatalogoMaterialesAdd.push(nuevoItem);
      this.CatalogoMaterialesVer.splice(index, 1);


    }
  }
  eliminarMaterial(material: EntidadModel) {
    let index: any = this.CatalogoMaterialesAdd.findIndex(c => c.Id == material.Id);
    this.CatalogoMaterialesVer.push(material);
    this.CatalogoMaterialesAdd.splice(index, 1);
  }

  nuevoTamanoMotor() {
    let tamanoMotor = this.inputTamanoMotor.nativeElement.value;
    if (tamanoMotor != "") {
      let nuevaHerramientaTamanoMotor: HerramientaTamanoMotorModel = new HerramientaTamanoMotorModel();
      nuevaHerramientaTamanoMotor.Estado = true;
      nuevaHerramientaTamanoMotor.Tamano = tamanoMotor;
      nuevaHerramientaTamanoMotor.GuidUsuarioCrea = "00000000-0000-0000-0000-000000000000";//este campo debe ser llenado desde la api de seguridad
      nuevaHerramientaTamanoMotor.GuidOrganizacion = "00000000-0000-0000-0000-000000000000";//este campo debe ser llenado desde la api de seguridad
      nuevaHerramientaTamanoMotor.NombreUsuarioCrea = "Admin";//este campo debe ser llenado desde la api de seguridad
      this.herramientaTamanoMotor.push(nuevaHerramientaTamanoMotor);
      this.inputTamanoMotor.nativeElement.value = "";
      this.isSubmitted = true;
    }
  }

  eliminarHerramientaTamanoMotor(index: any) {
    this.herramientaTamanoMotor.splice(index, 1);
  }

  nuevoTamanoHerramienta() {
    let tamanoHerramienta = this.inputTamanoHerramienta.nativeElement.value;
    if (tamanoHerramienta != "") {
      let nuevaHerramientaTamano: HerramientaTamanoModel = new HerramientaTamanoModel();
      nuevaHerramientaTamano.Estado = true;
      nuevaHerramientaTamano.Tamano = tamanoHerramienta;
      nuevaHerramientaTamano.GuidUsuarioCrea = "00000000-0000-0000-0000-000000000000";//este campo debe ser llenado desde la api de seguridad
      nuevaHerramientaTamano.GuidOrganizacion = "00000000-0000-0000-0000-000000000000";//este campo debe ser llenado desde la api de seguridad
      nuevaHerramientaTamano.NombreUsuarioCrea = "Admin";//este campo debe ser llenado desde la api de seguridad
      this.herramientaTamano.push(nuevaHerramientaTamano);
      this.inputTamanoHerramienta.nativeElement.value = "";
      this.isSubmitted = true;
    }
  }

  eliminarHerramientaTamano(index: any) {
    this.isSubmitted = true;

    this.herramientaTamano.splice(index, 1);
  }

  consultarClientes() {
    this.parametroSrv.consultarParametrosPorEntidad("CLIENTE")
      .subscribe(response => {
        this.paramsClientes = response;
        this.clientes = this.paramsClientes.Consultas.filter(e => e.Grupo == "cliente");
      });
  }

  clienteLineaEvent(event: any) {
    let idSeleccionado: any = event.target.value;
    if (idSeleccionado != "null") {
      this.clienteLinea = this.paramsClientes.Consultas.filter(e => e.CatalogoId == idSeleccionado && e.Grupo == "clientelinea");
    }
    else {
      this.clienteLinea = new Array<CatalogoModel>();
    }

    this.validacionLineaCliente()
  }

  //Funcion para implementar el modal con la informacion respectiva
  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any) {
    this.confirmar.llenarObjectoData(titulo, Mensaje, Cancelar, objData);
  }

  ConfirmacionEvento(event: any) {
    this.validacionHerramientaMotor()


    if (this.frmHerramienta.status != 'VALID') {
      this.toastr.error('faltan datos por diligenciar')
      return
    }
    if (event.response == true) {
      this.submitForm(this.frmHerramienta.value);
    }
  }

  /* salir()
  *esta funcion redirecciona al listar de cliente
  *
  */
  salir(preguntar?: boolean) {
    //realizar la confirmacion
    this.router.navigate(['/herramienta']);
  }
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ParametroService } from "../../../common/services/entity/parametro.service";
import { FactibilidadHerramientaComponent } from "../factibilidad-herramienta/factibilidad-herramienta.component";
import { ParametrosModel } from "../../../common/models/ParametrosModel";
import { EntidadModel } from "../../../common/models/EntidadDTOModel";
import { ConfirmacionComponent } from "../../../common/directivas/confirmacion/confirmacion.component";
import { ToastrService } from "ngx-toastr";
import { HerramientaModel, HerramientaEstudioFactibilidadModel } from "../../../common/models/Index";
import { HerramientaService } from "../../../common/services/entity";

@Component({
  selector: 'app-crear-herramienta',
  templateUrl: './crear-herramienta.component.html'
})
export class CrearHerramientaComponent implements OnInit {
  //ViewChild para funcionalidad del modal de confirmacion
  @ViewChild(ConfirmacionComponent) confirmar: ConfirmacionComponent;
  @ViewChild(FactibilidadHerramientaComponent) FactibilidadHerramientaComponentEvent: FactibilidadHerramientaComponent;

  private esActualizar: boolean;
  private isSubmitted: boolean;
  private loading: boolean;
  private esVer: boolean = false;
  private frmHerramienta: FormGroup;

  private esEstudioFactibilidad: string = "vacio";

  private paramsMateriales: ParametrosModel;
  private estados: EntidadModel[];

  private herramienta: HerramientaModel = new HerramientaModel();
  private herramientaEstudioFactibilidad: HerramientaEstudioFactibilidadModel = new HerramientaEstudioFactibilidadModel();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private frmBuilder: FormBuilder,
    private herramientaSrv: HerramientaService,
    private parametroSrv: ParametroService,
    private toastr: ToastrService
  ) {
    this.loading = true;
    this.consultarParametros("Materiales");
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
      //this.consultarCliente(id);
      this.esActualizar = true;
    }
  }

  initForm(herramienta: HerramientaModel) {//faltan las lineas
    this.frmHerramienta = this.frmBuilder.group({
      ClienteId: [herramienta.ClienteId],
      EsHerramientaMotor: [herramienta.EsHerramientaMotor],
      EsHerramientaPetrolera: [herramienta.EsHerramientaPetrolera],
      EsHerramientaPorCantidad: [herramienta.EsHerramientaPorCantidad],
      EstadoId: [herramienta.EstadoId],
      GuidUsuarioVerifica: ['00000000-0000-0000-0000-000000000000'],//este campo debe ser actualizado con la api de seguridad
      NombreUsuarioVerifica: [herramienta.NombreUsuarioVerifica],
      LineaId: [herramienta.LineaId],
      MaterialesId: [herramienta.MaterialesId],
      Moc: [herramienta.Moc],
      Nombre: [herramienta.Nombre],
      NombreUsuarioCrea: ['Admin'],//este campo debe ser actualizado con la api de seguridad
      GuidUsuarioCrea: ['00000000-0000-0000-0000-000000000000'],//este campo debe ser actualizado con la api de seguridad
      GuidOrganizacion: ['00000000-0000-0000-0000-000000000000']//este campo debe ser actualizado con la api de seguridad
    });
    this.loading = false;
    this.frmHerramienta.valueChanges.subscribe(val => {
      this.isSubmitted = true;
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
        this.estados = response.Catalogos.filter(c => c.Grupo == 'HERRAMIENTAS_MATERIALES');
        this.getValues();
      });
  }

  nuevoDataEstudioFactibilidad(objEstudioFactibilidad: HerramientaEstudioFactibilidadModel, accion: any) {
    this.FactibilidadHerramientaComponentEvent.llenarObjectoEstudioFactibilidad(objEstudioFactibilidad, accion);
  }

  nuevoEstudioFactibilidad(data: any) {
    this.herramientaEstudioFactibilidad = data.HerramientaEstudioFactibilidad
    this.esEstudioFactibilidad = data.esEstudioFactibilidad;
  }
}

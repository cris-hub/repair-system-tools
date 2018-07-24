import { Component, OnInit } from '@angular/core';

import { FormatoModel, AttachmentModel, HerramientaModel, PaginacionModel, FormatoAdendumModel, EntidadModel, FormatoParametroModel, ParametrosModel } from "../../common/models/index";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { attachEmbeddedView } from '@angular/core/src/view';
import { HerramientaService } from '../../common/services/entity';
import { isObject } from 'util';
import { format } from 'url';

import { FormatoService } from '../../common/services/entity/formato.service';
import { ValidacionDirective } from '../../common/directivas/validacion/validacion.directive';
import { ParametroService } from '../../common/services/entity/parametro.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ignoreElements } from 'rxjs/operators';


@Component({
  selector: 'app-crear-formato',
  templateUrl: './crear-formato.component.html',
  styleUrls: ['./crear-formato.component.css']
})
export class CrearFormatoComponent implements OnInit {

  //Catalogos
  private parametrosEspecificacion: EntidadModel[];
  private parametrosTipoConexion: EntidadModel[];
  private parametrosConexion: EntidadModel[];
  private parametrosTiposFormatos: EntidadModel[];
  private parametrosFormatoAdendumTiposFormatos: EntidadModel[] = new Array<EntidadModel>();

  //Herramienta
  private herramientaModel: HerramientaModel = new HerramientaModel();
  private Herramientas: Array<HerramientaModel>;

  private paginacion: PaginacionModel = new PaginacionModel(1, 30);

  //Formularios
  private formAdendum: FormArray;
  private formFormato: FormGroup;
  private formFormatoPatamtros: FormArray;


  //Acciones
  private esActualizar: boolean;
  private esVer: boolean;
  private esValido: boolean;


  //Formatos
  private formatoModel: FormatoModel;
  private formatosParametroModel: Array<FormatoParametroModel> = new Array<FormatoParametroModel>();
  private formatosAdendumModel: Array<FormatoAdendumModel> = new Array<FormatoAdendumModel>();

  //Carga Archivos
  private lectorArchivos: FileReader;
  private Planos: Array<AttachmentModel> = new Array<AttachmentModel>();
  private planoView: AttachmentModel;








  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private herramientaServicio: HerramientaService,
    private formatoServicio: FormatoService,
    private parametroSrv: ParametroService,
    private toastr: ToastrService,
    private router: Router

  ) {
  }

  ngOnInit() {
    this.formatoModel = new FormatoModel();
    this.consultarParametros('formato');
    this.listarHerramienta();
    this.cargarValores();

    this.esValido = false;
  }
  consultarParametros(entidad: string) {
    this.parametroSrv.consultarParametrosPorEntidad(entidad)
      .subscribe(response => {

        this.parametrosFormatoAdendumTiposFormatos = response.Catalogos.filter(c => c.Grupo == 'FORMATO_ADENDUM');
        this.parametrosTiposFormatos = response.Catalogos.filter(c => c.Grupo == 'TIPOS_FORMATOS');
        this.parametrosEspecificacion = response.Catalogos.filter(c => c.Grupo == 'ESPECIFICACION');
        this.parametrosTipoConexion = response.Catalogos.filter(c => c.Grupo == 'TIPO_CONEXION');
        console.log(response)
        this.parametrosConexion = response.Catalogos.filter(c => c.Grupo == 'CONEXION');


      }, error => { },
        () => {
          this.initFormFormatoAdendum();

        }
      );



  }

  listarHerramienta() {
    this.herramientaServicio.ConsultarHerramientas(this.paginacion).subscribe(r => {
      this.Herramientas = r.Listado


    });
  }

  cargarValores() {
    this.initForm(new FormatoModel(new Array<AttachmentModel>()), new Array<FormatoAdendumModel>(), new HerramientaModel());
    let id = this.obtenerIdFormatoDesdeUrl();
    if (this.esNuevoFormato(id)) {
      this.esActualizar = false;
    }
    else {
      this.consultarFormato(id);
      this.esActualizar = true;
    }
  }

  consultarFormato(guid: any): any {

    this.formatoServicio.consultarFormatoPorGuid(guid)
      .subscribe(response => {

        this.formatoModel = response;
        this.formatosParametroModel = response.Parametros;
        this.formatosAdendumModel = response.Adendum;
        this.herramientaModel.Id = response.HerramientaId;
        this.initForm(this.formatoModel, this.formatosAdendumModel, this.herramientaModel);

        console.log(response)
        console.log(this.parametrosFormatoAdendumTiposFormatos)
        console.log(this.parametrosFormatoAdendumTiposFormatos)
      });
  }

  private esNuevoFormato(id: string) {
    return id == undefined;
  }

  obtenerIdFormatoDesdeUrl(): string {
    if (this.route.snapshot.routeConfig.path == 'formato/ver/:id') {
      this.esVer = true;
    }
    return this.route.snapshot.paramMap.get('id');
  }

  // gestion Formario 

  initForm(formato: FormatoModel, Adendum: Array<FormatoAdendumModel>, herramienta: HerramientaModel) {

    this.initFormularioFormatoOtros(formato, Adendum, herramienta);


    if (this.esVer) {
      this.formFormato.get('Codigo').disable();
      this.formFormato.get('TipoFormatoId').disable();
      this.formFormato.get('EspecificacionId').disable();
      this.formFormato.get('TPI').disable();
      this.formFormato.get('TPF').disable();
      this.formFormato.get('TiposConexionesId').disable();
      this.formFormato.get('ConexionId').disable();
      this.formFormato.get('ConexionId').disable();
      this.formFormato.get('Herramienta').disable();
      this.formFormato.get('Aletas').disable();
      this.formFormato.get('Planos').disable();
      this.formFormato.get('Adendum').disable();

    }

    this.cambioDatosFormulario(this.formFormato);


  }

  initFormFormatoParamtros() {
    this.formFormatoPatamtros = this.formFormato.get('Paramtros') as FormArray;
    console.log(this.formatosParametroModel);
    this.formatosParametroModel.forEach(f => {
      let form = this.formBuilder.group({
        DimensionEspecifica: [f.DimensionEspecifica],
        Id: [f.Id],
        Item: [f.Item],
        Parametro: [f.Parametro],
        ToleranciaMin: [f.ToleranciaMin],
        ToleranciaMax: [f.ToleranciaMax],
      });
    });
  }

  initFormFormatoAdendum() {
    debugger

    if (!this.formFormato || !(this.parametrosFormatoAdendumTiposFormatos.length > 0)) {
      return
    }
    this.formAdendum = this.formFormato.get('Adendum') as FormArray;

    this.parametrosFormatoAdendumTiposFormatos
      .forEach(tipo => {
        let Position = 1
        while (Position < 9) {
          let formato: FormatoAdendumModel = new FormatoAdendumModel();
          if (tipo.Id == 26) {
            formato.Posicion = Position;
            formato.TipoId = tipo.Id

          } else if (tipo.Id == 27) {
            formato.Posicion = Position;
            formato.TipoId = tipo.Id
          }
          Position++;
          this.formatosAdendumModel.push(formato)
        }
      })

    this.formatosAdendumModel.forEach(p => {
      let form = this.formBuilder.group({});
      form.addControl('Position', new FormControl(p.Posicion));
      form.addControl('TipoId', new FormControl(p.TipoId));
      form.addControl('Valor', new FormControl(p.Valor));
      this.formAdendum.push(form);


    })



  }

  addItemFormParametro(): void {
    this.formFormatoPatamtros = this.formFormato.get('Parametros') as FormArray;
    this.formFormatoPatamtros.push(this.crearFormFormatoParametroModel());
    console.log(this.formFormatoPatamtros);
  }

  removeItemFormFormatoPatamtros(i) {
    this.formFormatoPatamtros.removeAt(i);
  }

  esTipoFormatoOtros(formato: FormatoModel): boolean {
    return formato.TipoFormatoId == 19
  }

  esTipoFormatoConexion(formato: FormatoModel): boolean {
    return formato.TipoFormatoId == 18
  }

  crearFormFormatoParametroModel(): any {
    let formatoParametrosModel = this.formBuilder.group({
      DimensionEspecifica: '',
      Id: '',
      Item: '',
      Parametro: '',
      ToleranciaMin: '',
      ToleranciaMax: '',


    });


    return formatoParametrosModel;
  }

  crearFormFormFormatoHerramienta(): any {
    return this.formBuilder.group({

    });
  }

  initFormularioFormatoOtros(formato: FormatoModel, formatoAdendumModel: Array<FormatoAdendumModel>, herramienta?: HerramientaModel) {
    this.formFormato = this.formBuilder.group({
      Planos: [],
      Codigo: [formato.Codigo],
      TipoFormatoId: [formato.TipoFormatoId, Validators.required],
      TiposConexionesId: [formato.TiposConexionesId],
      ConexionId: [formato.ConexionId],
      TPI: [formato.TPI],
      TPF: [formato.TPF],
      EspecificacionId: [formato.EspecificacionId],
      Herramienta: this.formBuilder.group({
        Id: [herramienta.Id]
      }),
      EsFormatoAdjunto: [formato.EsFormatoAdjunto],
      Aletas: [formato.Aletas],
      Adendum: this.formBuilder.array([]),
      Parametros: this.formBuilder.array([this.crearFormFormatoParametroModel()])
    });

  }

  limpiarFormulario() {

    let id = this.formFormato.value['TipoFormatoId']
    this.formFormato.value['TipoFormatoId'] = id
    this.formatoModel.TipoFormatoId = id;
      this.formFormato.reset();
  }





  cambioDatosFormulario(formulario: FormGroup) {


    


  }





  //Persistir Datos
  enviarFormulario() {

    this.asignarValoresFormularioFormato(this.formFormato.value);
    this.esFormularioValido(this.formFormato)

    console.log(this.formFormato)
    console.log(this.formatoModel);
    this.formatoModel.NombreUsuarioCrea = 'Admin';
    this.formatoModel.GuidUsuarioCrea = '00000000-0000-0000-0000-000000000000';
    this.formatoModel.GuidOrganizacion = '00000000-0000-0000-0000-000000000000';

    if (!this.esValido) {
      this.toastr.info('formato no valido!', 'validacion');
    }
    if (this.formatoModel.TipoFormatoId = 18) {
      delete this.formatoModel['Herramienta'];

    } else {
      delete this.formatoModel['Adendum'];

    }

    if (this.esActualizar) {
      this.actualizarFormato();
    } else {
      this.crearFormato(this.formatoModel);

    }
  }

  esFormularioValido(formulario: FormGroup): boolean {
    if (formulario.status == 'VALID') {
      this.esValido = true;
    }
    return this.esValido;
  }

  asignarValoresFormularioFormato(val) {

    this.formatoModel = Object.assign(this.formatoModel, val)
  }

  crearFormato(formato: FormatoModel) {
    console.log(formato
    )
    this.formatoServicio.crearFormato(formato).subscribe((a) => {
      console.log(a)
    });
  }

  actualizarFormato() {
    if (this.formatoModel.Parametros.length > 0) {
      this.formatoModel.Parametros.splice(0, 1);

    }


    console.log(this.formatoModel);
    this.formatoServicio.actualizarFormato(this.formatoModel)
      .subscribe(response => {
        this.toastr.success('cliente editado correctamente!', '');
        setTimeout(e => { this.router.navigate(['/formato']); }, 200);
      });

  }

  //Carga Archivos

  addFile(event: any) {
    let files = this.leerArchivo(event);
    for (var i = 0; i < files.length; i++) {
      this.planoView = this.obtenerDatosArchivoAdjunto(files[i]);
      this.personaModifica();
      this.Planos.push(this.planoView);
    }

  }

  leerArchivo(event) {
    try {
      if (event.target.files.length > 0) {
        return event.target.files;
      }
    }
    catch (ex) {
      console.log(ex)
    }
  }

  personaModifica() {
    //estos campo debe ser actualizado con la api de seguridad       
    this.planoView.NombreUsuarioCrea = 'Admin';
    this.planoView.GuidUsuarioCrea = '00000000-0000-0000-0000-000000000000';
    this.planoView.GuidOrganizacion = '00000000-0000-0000-0000-000000000000';

  };

  obtenerDatosArchivoAdjunto(file: File): AttachmentModel {
    let archivo = new AttachmentModel();
    this.lectorArchivos = new FileReader();
    this.lectorArchivos.readAsDataURL(file)
    try {
      this.lectorArchivos.onload = (e: any) => {
        archivo.Extension = this.obtenerExtensionArchivo(e)
        archivo.NombreArchivo = this.obtenerNombreArchivo(file)
        archivo.Stream = this.obtenerStreamArchivo(e);
      }

      return archivo;
    } catch (error) {
      console.log(error)
    }
  }

  obtenerExtensionArchivo(e: any) {
    return e.currentTarget.result.split(',')[0].split('/')[1].split(';')[0];
  }

  obtenerNombreArchivo(file: File) {
    return file.name;
  }

  obtenerStreamArchivo(e: any) {
    return e.currentTarget.result.split(',')[1];
  }





}

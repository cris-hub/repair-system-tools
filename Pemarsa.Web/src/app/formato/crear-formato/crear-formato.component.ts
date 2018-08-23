import { Component, OnInit } from '@angular/core';

import { FormatoModel, AttachmentModel, HerramientaModel, PaginacionModel, FormatoAdendumModel, EntidadModel, FormatoParametroModel, ParametrosModel, FormatoFormatoParametroModel, FormatoTiposConexionModel, CatalogoModel } from "../../common/models/index";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
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
import { LoaderService } from '../../common/services/entity/loaderService';
import { TIPOS_FORMATO, TIPOS_ESPECIFICACION } from '../formato-enum/formato.enum';


@Component({
  selector: 'app-crear-formato',
  templateUrl: './crear-formato.component.html',
  styleUrls: ['./crear-formato.component.css']
})
export class CrearFormatoComponent implements OnInit {

  //renderizadoVista

  public tituloVista = ''

  //Catalogos
  public parametrosEspecificacion: EntidadModel[];
  public parametrosTipoConexion: EntidadModel[];
  public parametrosConexion: EntidadModel[];
  public parametrosTiposFormatos: EntidadModel[];
  public parametrosFormatoAdendumTiposFormatos: EntidadModel[] = new Array<EntidadModel>();

  //Herramienta
  public herramientaModel: HerramientaModel = new HerramientaModel();
  public Herramientas: Array<HerramientaModel>;

  public paginacion: PaginacionModel = new PaginacionModel(1, 30);

  //Formularios
  public formAdendum: FormArray;
  public formFormato: FormGroup;
  public formFormatoPatamtros: FormArray;
  public formFormatoTiposConexion: FormArray;


  public formFormatoPatamtrosAletas: FormArray;


  //Acciones
  public esActualizar: boolean;
  public esVer: boolean;
  public esValido: boolean;
  public bloqueartipoFormato: boolean

  //Formatos
  public formatoModel: FormatoModel;
  public tipoFormatoValidacionesFormatoOtros = '';
  public tipoFormatoValidacionesFormatoConexiones = '';
  public parametros: Array<FormatoParametroModel> = new Array<FormatoParametroModel>();
  public aletas: Array<FormatoParametroModel> = new Array<FormatoParametroModel>();

  public formatoFormatoParametroModel: Array<FormatoFormatoParametroModel> = new Array<FormatoFormatoParametroModel>();

  public formatosAdendumModel: Array<FormatoAdendumModel> = new Array<FormatoAdendumModel>();


  public tipos = [
    { Id: 27, Valor: 'BEV' },
    { Id: 26, Valor: 'O.D' }
  ]



  //Carga Archivos
  public lectorArchivos: FileReader;
  public Planos: Array<AttachmentModel> = new Array<AttachmentModel>();
  public Adjunto: AttachmentModel;
  public planoView: AttachmentModel;
  private maximoArchivos = 5;







  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private herramientaServicio: HerramientaService,
    private formatoServicio: FormatoService,
    private parametroSrv: ParametroService,
    private toastr: ToastrService,
    private router: Router,
    private loaderService: LoaderService,

  ) {
  }

  ngOnInit() {
    this.accionRealizar();
    this.formatoModel = new FormatoModel();
    this.cargarValores();
    this.consultarParametros('formato');
    this.listarHerramienta();

    this.bloqueartipoFormato = false
    this.esValido = false;
  }
  accionRealizar() {
    switch (this.router.url.split('/')[2]) {
      case 'ver': this.tituloVista = 'Formato'; break;
      case 'crear': this.tituloVista = 'Nuevo formato'; break;
      case 'editar': this.tituloVista = 'Editar formato'; break;
      default: this.tituloVista = 'Formato'
    }
    console.log(this.router.url.split('/')[2])
    console.log(this.route)
  }

  listarHerramienta() {
    this.herramientaServicio.ConsultarHerramientas(this.paginacion).subscribe(r => {
      this.Herramientas = r.Listado
    });
  }

  consultarParametros(entidad: string) {
    this.loaderService.display(true)
    this.parametroSrv.consultarParametrosPorEntidad(entidad)
      .subscribe(response => {
        this.parametrosFormatoAdendumTiposFormatos = response.Catalogos.filter(c => c.Grupo == 'FORMATO_ADENDUM');
        this.parametrosTiposFormatos = response.Catalogos.filter(c => c.Grupo == 'TIPOS_FORMATOS');
        this.parametrosEspecificacion = response.Catalogos.filter(c => c.Grupo == 'ESPECIFICACION');
        this.parametrosTipoConexion = response.Catalogos.filter(c => c.Grupo == 'TIPO_CONEXION');
        this.parametrosConexion = response.Catalogos.filter(c => c.Grupo == 'CONEXION');
        this.loaderService.display(false)
      }, error => { },
        () => {
          this.initFormFormatoAdendum()
          this.initFormFormatoParamtros()
          this.initFormTiposConexion()
          this.initFormFormatoParamtrosAletas()

        }
      );



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
    this.initForm(new FormatoModel(new Array<AttachmentModel>()), new Array<FormatoAdendumModel>(), new HerramientaModel());
    this.loaderService.display(true);
    this.formatoServicio.consultarFormatoPorGuid(guid)
      .subscribe(response => {

        this.formatoModel = response;

        this.formatoFormatoParametroModel = response.FormatoFormatoParametro;
        this.formatoFormatoParametroModel.filter(p => {
          if (p.TipoFormatoParametroId == 85) {
            this.parametros.push(p.FormatoParametro)
          }
        })
        this.formatoFormatoParametroModel.filter(p => {
          if (p.TipoFormatoParametroId == 84) {
            this.aletas.push(p.FormatoParametro)

          }
        })
        this.formatosAdendumModel = response.Adendum;
        this.herramientaModel.Id = response.HerramientaId;
        this.Planos = response.Planos
        this.Adjunto = response.Adjunto

        this.initForm(this.formatoModel, this.formatosAdendumModel, this.herramientaModel);
        this.bloqueartipoFormato = true;
        this.loaderService.display(false);

      }, error => { },
        () => {
          this.initFormFormatoAdendum()
          this.initFormFormatoParamtros()
          this.initFormFormatoParamtrosAletas()
          this.initFormTiposConexion()
          if (this.esVer) {
            this.formFormato.disable();

          }
        }
      );
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


  //Agregar Tipos conexiones

  agregarTipoConexion(tipoConexion) {
    let tipoConexionParam: CatalogoModel = this.parametrosTipoConexion.find(d => d.Id == tipoConexion);


    this.formFormatoTiposConexion.push(this.formBuilder.group({
      FormatoId: this.formatoModel.Id,
      TipoConexionId: tipoConexionParam.Id,
      TipoConexion: tipoConexionParam,
      Estado: true
    }));

    let index = this.parametrosTipoConexion.findIndex(d => d.Id == tipoConexion);
    this.parametrosTipoConexion.splice(index, 1);
  }

  removerDeElementosSeleccionado(tipoConexion: CatalogoModel) {

    let value = this.formFormatoTiposConexion.value.find(d => d.TipoConexionId == tipoConexion.Id && d.Estado == true);
    let index = this.formFormatoTiposConexion.controls.findIndex(d => d.value.TipoConexionId == tipoConexion.Id && d.value.Estado == true);
    this.formFormatoTiposConexion.removeAt(index);
    value.Estado = false;

    this.parametrosTipoConexion.push(value.TipoConexion);
  }

  // gestion Formario 

  initForm(formato: FormatoModel, Adendum: Array<FormatoAdendumModel>, herramienta: HerramientaModel) {
    this.initFormularioFormatoOtros(formato, Adendum, herramienta);

   
  }

  initFormularioFormatoOtros(formato: FormatoModel, formatoAdendumModel: Array<FormatoAdendumModel>, herramienta?: HerramientaModel) {
    if (formato.FormatoFormatoParametro) {
      formato.FormatoFormatoParametro.filter(c => {
        if (c.TipoFormatoParametroId == 84) {
          formato.esAletas = true;
        }
      })
    }

    this.formFormato = this.formBuilder.group({
      Adjunto: [this.Adjunto],
      Planos: [this.Planos],
      Codigo: [formato.Codigo],
      TipoFormatoId: [formato.TipoFormatoId, Validators.required],
      FormatoTiposConexion: this.formBuilder.array([]),
      ConexionId: [formato.ConexionId],
      TPI: [formato.TPI],
      TPF: [formato.TPF],
      EspecificacionId: [formato.EspecificacionId],
      Herramienta: this.formBuilder.group({
        Id: [herramienta.Id]
      }),

      HerramientaId: [herramienta.Id],
      EsFormatoAdjunto: [formato.EsFormatoAdjunto],
      esAletas: [formato.esAletas],
      Adendum: this.formBuilder.array([]),
      FormatoFormatoParametro: this.formBuilder.array([]),
      Parametros: this.formBuilder.array([]),
      Aletas: this.formBuilder.array([])
    });


  }

  initFormFormatoParamtros() {
    this.formFormatoPatamtros = this.formFormato.get('Parametros') as FormArray;
    console.log(this.parametros);

    this.parametros.forEach(f => {
      let form = this.formBuilder.group({
        DimensionEspecifica: [f.DimensionEspecifica],
        Id: [f.Id],
        Item: [f.Item],
        Parametro: [f.Parametro],
        ToleranciaMin: [f.ToleranciaMin],
        ToleranciaMax: [f.ToleranciaMax],
      });
      this.formFormatoPatamtros.push(form)
    });
  }

  initFormTiposConexion() {
    this.formFormatoTiposConexion = this.formFormato.get('FormatoTiposConexion') as FormArray;

    this.formatoModel.FormatoTiposConexion.forEach(f => {
      let form = this.formBuilder.group({
        FormatoId: [f.FormatoId],
        Id: [f.Id],
        TipoConexionId: [f.TipoConexionId],
        TipoConexion: [f.TipoConexion],
        Estado: [f.Estado]


      });
      this.formFormatoTiposConexion.push(form)

      let index = this.parametrosTipoConexion.findIndex(d => d.Id == f.Id);
      this.parametrosTipoConexion.splice(index, 1);
    });

    console.log(this.formFormatoTiposConexion);

  }

  initFormFormatoParamtrosAletas() {
    this.formFormatoPatamtros = this.formFormato.get('Aletas') as FormArray;
    console.log(this.aletas);
    this.aletas.forEach(f => {
      let form = this.formBuilder.group({
        DimensionEspecifica: [f.DimensionEspecifica],
        Id: [f.Id],
        Item: [f.Item],
        Parametro: [f.Parametro],
        ToleranciaMin: [f.ToleranciaMin],
        ToleranciaMax: [f.ToleranciaMax],
      });
      this.formFormatoPatamtros.push(form)
    });
  }

  initFormFormatoAdendum() {

    if (!this.formFormato || !(this.parametrosFormatoAdendumTiposFormatos.length > 0)) {
      return
    }
    this.formAdendum = this.formFormato.get('Adendum') as FormArray;

    this.parametrosFormatoAdendumTiposFormatos
      .forEach(tipo => {
        let Position = 1
        while (Position < 9 && this.formatosAdendumModel.length < 16) {
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
    console.log(this.formatosAdendumModel)

    this.formatosAdendumModel.forEach(p => {
      let form = this.formBuilder.group({});
      form.addControl('Id', new FormControl(p.Id ? p.Id : 0));
      form.addControl('Posicion', new FormControl(p.Posicion));
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

  addItemFormParametroAletas(): void {
    this.formFormatoPatamtrosAletas = this.formFormato.get('Aletas') as FormArray;
    this.formFormatoPatamtrosAletas.push(this.crearFormFormatoParametroModel());
    console.log(this.formFormatoPatamtrosAletas);
  }

  removeItemFormFormatoPatamtros(i) {
    this.formFormatoPatamtros.removeAt(i);
  }

  removeItemFormFormatoPatamtrosAletas(i) {
    this.formFormatoPatamtrosAletas.removeAt(i);
  }

  crearFormFormatoParametroModel(): any {
    let formatoParametrosModel = this.formBuilder.group({
      DimensionEspecifica: '',
      Item: '',
      Parametro: '',
      ToleranciaMin: '',
      ToleranciaMax: '',


    });


    return formatoParametrosModel;
  }

  //validaciones
  esTipoFormatoOtros(formato: FormatoModel): boolean {


    return formato.TipoFormatoId == TIPOS_FORMATO.FORMATOOTROS
  }

  esTipoFormatoConexion(formato: FormatoModel): boolean {

    return formato.TipoFormatoId == TIPOS_FORMATO.FORMATOCONEXION
  }

  confirmarTipoFormato() {
    let id = this.cambioFormulario();

    if (id == TIPOS_FORMATO.FORMATOCONEXION) {
      this.ValidacionesFormatoConexion();
    }
    if (id == TIPOS_FORMATO.FORMATOOTROS) {
      this.validacionesFormatoOtros();
    }

    this.formFormato.updateValueAndValidity();
  }

  private validacionesFormatoOtros() {
    this.tipoFormatoValidacionesFormatoOtros = 'requerido';
    this.tipoFormatoValidacionesFormatoConexiones = '';
    this.formFormato.get('Herramienta').get('Id').setValidators(Validators.required);
    this.formFormato.get('Parametros').setValidators(Validators.required);

    if (!this.formFormato.get('Herramienta').get('Id').value) {
      this.formFormato.get('Herramienta').get('Id').setErrors({ 'requerido': true });
      this.formFormato.get('Herramienta').get('Id').setValidators((Validators.required));
    } else {
      this.formFormato.get('Herramienta').get('Id').setErrors(null);

      this.formFormato.get('Herramienta').get('Id').setValidators(null);
      this.formFormato.get('HerramientaId').setValue(this.formFormato.get('Herramienta').get('Id').value);
    }


    if (this.formFormato.get('Planos').value.length > 0) {
      this.formFormato.get('Planos').setErrors(null);
      this.formFormato.get('Planos').setValidators(null);
    } else {
      this.formFormato.get('Planos').setErrors({ 'requerido': true });
      this.formFormato.get('Planos').setValidators(Validators.required);
    }

    if (!(this.formFormato.get('Parametros').value.length > 0)) {
      this.formFormato.get('Parametros').setErrors({ 'requerido': true });
    } else {
      this.formFormato.get('Parametros').setErrors(null);
    }
  }

  private ValidacionesFormatoConexion() {
    this.tipoFormatoValidacionesFormatoOtros = '';
    this.tipoFormatoValidacionesFormatoConexiones = 'requerido';
    this.formFormato.get('FormatoTiposConexion').setValidators(Validators.required);
    this.formFormato.get('ConexionId').setValidators(Validators.required);
    this.formFormato.get('TPI').setValidators(Validators.required);
    this.formFormato.get('TPF').setValidators(Validators.required);
    this.formFormato.get('EspecificacionId').setValidators(Validators.required);
    this.formFormato.get('Parametros').setValidators(Validators.required);
    this.formFormato.get('Planos').setValidators(null);

    if (!(this.formFormato.get('Parametros').value.length > 0)) {
      this.formFormato.get('Parametros').setErrors({ 'requerido': true });
    } else {
      this.formFormato.get('Parametros').setErrors(null);
    }

    let esDocumentoObligatorio: boolean = this.formFormato.get('EsFormatoAdjunto').value;
    if (esDocumentoObligatorio && (this.Adjunto.NombreArchivo == '')) {
      this.formFormato.get('Adjunto').setValidators(Validators.required);
      this.formFormato.get('Adjunto').setErrors({ 'requerido': true });

    } else {
      this.formFormato.get('Adjunto').setValidators(null);
      this.formFormato.get('Adjunto').setErrors(null);
    }
    if (this.formFormato.get('Planos').value.length > 0) {
      this.formFormato.get('Planos').setErrors(null);
      this.formFormato.get('Planos').setValidators(null);
    } else {
      this.formFormato.get('Planos').setErrors({ 'requerido': true });
      this.formFormato.get('Planos').setValidators(Validators.required);
    }


    this.formFormato.get('EspecificacionId').valueChanges.subscribe(d => {
      if (d == TIPOS_ESPECIFICACION["API7-2"]) {
        this.formFormato.get('Adendum').setValidators(Validators.required);
        let adundum = this.formFormato.get('Adendum').value as Array<FormatoAdendumModel>;
        if (adundum.some(d => d.Valor != null)) {
          this.formFormato.get('Adendum').setValidators(null);
        } else {
          this.formFormato.get('Adendum').setErrors({ 'requerido': true });
        }
      } else {
        this.formFormato.get('Adendum').setValidators(null);
        this.formFormato.get('Adendum').setErrors(null);

      }
    });

  }

  private cambioFormulario() {
    this.bloqueartipoFormato = true;
    let id = this.formFormato.value['TipoFormatoId'];
    this.formFormato.value['TipoFormatoId'] = id;
    this.formFormato.get('TipoFormatoId').setValue(id);
    this.formatoModel.TipoFormatoId = id;
    return id;
  }




  //Persistir Datos
  enviarFormulario() {
    this.confirmarTipoFormato()

    this.formFormato.get('TipoFormatoId').markAsDirty()
    this.formFormato.get('Adendum').markAsDirty()
    this.formFormato.get('Parametros').markAsDirty()
    this.formFormato.get('Adjunto').markAsDirty()

    this.formFormato.updateValueAndValidity();

   
    if (!this.esFormularioValido(this.formFormato)) {
      this.toastr.error('Faltan datos por diligenciar!', 'Algunos de los datos no se han diligenciado, por favor valida y vuelva a intentar');
      return
    }


    this.asignarValoresFormularioFormato(this.formFormato.value);

    console.log(this.formFormato)
    console.log(this.formatoModel);
    this.formatoModel.NombreUsuarioCrea = 'Admin';
    this.formatoModel.GuidUsuarioCrea = '00000000-0000-0000-0000-000000000000';
    this.formatoModel.GuidOrganizacion = '00000000-0000-0000-0000-000000000000';


    if (this.formatoModel.TipoFormatoId == TIPOS_FORMATO.FORMATOCONEXION) {
      this.formatoModel.Herramienta = null


    } else {
      this.formatoModel['Adjunto'] = null;
      this.formatoModel['Adendum'] = null;

    }

    if (this.esActualizar) {
      this.actualizarFormato();
    } else {
      this.crearFormato(this.formatoModel);

    }
  }

  private asignarFormatoParametros(val: any) {
    val.Aletas.forEach(d => {
      val.FormatoFormatoParametro.push({
        TipoFormatoParametroId: 84,
        FormatoParametro: d,
        FormatoId: this.formatoModel ? this.formatoModel.Id : null
      });
    });
    val.Parametros.forEach(d => {
      val.FormatoFormatoParametro.push({
        TipoFormatoParametroId: 85,
        FormatoParametro: d,
        FormatoParametroId: d.Id,
        FormatoId: this.formatoModel ? this.formatoModel.Id : null
      });
    });
  }

  esFormularioValido(formulario: FormGroup): boolean {
    this.formFormato.get('Planos').markAsDirty();
    if (formulario.status == 'VALID') {
      this.esValido = true;
    }
    return this.esValido;
  }

  asignarValoresFormularioFormato(val: any) {

    this.asignarFormatoParametros(val);
    val['Parametros'] = null;
    val['Aletas'] = null;


    console.log(val)


    this.formatoModel = Object.assign(this.formatoModel, val)
    this.formatoModel.Adjunto = this.Adjunto;
  }

  crearFormato(formato: FormatoModel) {
    this.loaderService.display(true)
    console.log(formato
    )
    this.formatoServicio.crearFormato(formato).subscribe((a) => {
      this.toastr.success('Formato creado correctamente!', '');
      this.loaderService.display(false)
      setTimeout(e => { this.router.navigate(['/formato']); }, 200);
    }, (errorMessage) => {
      this.toastr.error(errorMessage.error.Message);
      this.loaderService.display(false)

    });
  }

  actualizarFormato() {
    this.loaderService.display(true)
    console.log(this.formatoModel);
    this.formatoServicio.actualizarFormato(this.formatoModel)
      .subscribe(response => {
        this.toastr.success('Formato modificado correctamente!', '');
        this.loaderService.display(false)
        setTimeout(e => { this.router.navigate(['/formato']); }, 200);
      }, (errorMessage) => {
        this.toastr.error(errorMessage.error.Message);
        this.loaderService.display(false)

      });
  }

  //Carga Archivos

  addDocumentoAdjuntoFormato(event: any) {
    let files = this.leerArchivo(event);
    for (var i = 0; i < files.length; i++) {
      this.planoView = this.obtenerDatosArchivoAdjunto(files[i]);
      this.personaModifica();
      this.Adjunto = this.planoView;
    }

  }
  addFile(event: any) {

    if (this.Planos.length == this.maximoArchivos) {
      this.toastr.error('Se ha alcanzado, el maximo de archivos')
      return
    }
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

  eliminarAdjuntoFormato(adjunto: AttachmentModel) {
    this.Adjunto.Estado = false;

  }


  eliminarAdjunto(adjunto: AttachmentModel) {
    let index: any = this.Planos.findIndex(c => c.Id == adjunto.Id);
    this.Planos.find(e => e.Id == adjunto.Id).Estado = false;
    this.maximoArchivos += 1
    this.Planos.splice(index, 1);
  }



}

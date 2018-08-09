import { Component, OnInit } from '@angular/core';

import { FormatoModel, AttachmentModel, HerramientaModel, PaginacionModel, FormatoAdendumModel, EntidadModel, FormatoParametroModel, ParametrosModel, FormatoFormatoParametroModel } from "../../common/models/index";
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
  public  parametrosEspecificacion: EntidadModel[];
  public  parametrosTipoConexion: EntidadModel[];
  public  parametrosConexion: EntidadModel[];
  public  parametrosTiposFormatos: EntidadModel[];
  public  parametrosFormatoAdendumTiposFormatos: EntidadModel[] = new Array<EntidadModel>();

  //Herramienta
  public  herramientaModel: HerramientaModel = new HerramientaModel();
  public  Herramientas: Array<HerramientaModel>;

  public  paginacion: PaginacionModel = new PaginacionModel(1, 30);

  //Formularios
  public  formAdendum: FormArray;
  public  formFormato: FormGroup;
  public  formFormatoPatamtros: FormArray;
  public  formFormatoPatamtrosAletas: FormArray;


  //Acciones
  public  esActualizar: boolean;
  public  esVer: boolean;
  public  esValido: boolean;


  //Formatos
  public  formatoModel: FormatoModel;
  public  parametros: Array<FormatoParametroModel> = new Array<FormatoParametroModel>();
  public  aletas: Array<FormatoParametroModel> = new Array<FormatoParametroModel>();

  public  formatoFormatoParametroModel: Array<FormatoFormatoParametroModel> = new Array<FormatoFormatoParametroModel>();

  public  formatosAdendumModel: Array<FormatoAdendumModel> = new Array<FormatoAdendumModel>();

  //Carga Archivos
  public  lectorArchivos: FileReader;
  public  Planos: Array<AttachmentModel> = new Array<AttachmentModel>();
  public  planoView: AttachmentModel;








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


  listarHerramienta() {
    this.herramientaServicio.ConsultarHerramientas(this.paginacion).subscribe(r => {
      this.Herramientas = r.Listado
    });
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
          this.initFormFormatoAdendum()
          this.initFormFormatoParamtros()
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
        this.initForm(this.formatoModel, this.formatosAdendumModel, this.herramientaModel);

        console.log(response)
        console.log(this.parametrosFormatoAdendumTiposFormatos)
        console.log(this.parametrosFormatoAdendumTiposFormatos)
      }, error => { },
        () => {
          this.initFormFormatoAdendum()
          this.initFormFormatoParamtros()
          this.initFormFormatoParamtrosAletas()
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
      Planos: [this.Planos],
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
      esAletas: [formato.esAletas],
      Adendum: this.formBuilder.array([]),
      FormatoFormatoParametro: this.formBuilder.array([]),
      Parametros: this.formBuilder.array([this.crearFormFormatoParametroModel()]),
      Aletas: this.formBuilder.array([this.crearFormFormatoParametroModel()])
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

  esTipoFormatoOtros(formato: FormatoModel): boolean {
    return formato.TipoFormatoId == 19
  }

  esTipoFormatoConexion(formato: FormatoModel): boolean {
    return formato.TipoFormatoId == 18
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

  limpiarFormulario() {

    let id = this.formFormato.value['TipoFormatoId']
    this.formFormato.value['TipoFormatoId'] = id
    this.formatoModel.TipoFormatoId = id;


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
    if (this.formatoModel.TipoFormatoId == 18) {
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

  asignarValoresFormularioFormato(val: any) {

    this.asignarFormatoParametros(val);
    delete val['Parametros'];
    delete val['Aletas'];

    console.log(val)
    debugger;

    this.formatoModel = Object.assign(this.formatoModel, val)
  }

  private asignarFormatoParametros(val: any) {
    val.Aletas.forEach(d => {
      val.FormatoFormatoParametro.push({
        TipoFormatoParametroId: 84,
        FormatoParametro: d
      });
    });
    val.Parametros.forEach(d => {
      val.FormatoFormatoParametro.push({
        TipoFormatoParametroId: 85,
        FormatoParametro: d
      });
    });
  }

  crearFormato(formato: FormatoModel) {
    console.log(formato
    )
    this.formatoServicio.crearFormato(formato).subscribe((a) => {
      console.log(a)
    });
  }

  actualizarFormato() {

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

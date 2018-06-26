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


@Component({
  selector: 'app-crear-formato',
  templateUrl: './crear-formato.component.html',
  styleUrls: ['./crear-formato.component.css']
})
export class CrearFormatoComponent implements OnInit {



  private parametrosEspecificacion: EntidadModel[];
  private parametrosTipoConexion: EntidadModel[];
  private parametrosConexion: EntidadModel[];
  private parametrosTiposFormatos: EntidadModel[];
  private parametrosFormatoAdendumTiposFormatos: EntidadModel[] = new Array<EntidadModel>();


  private esActualizar: boolean;
  private esVer: boolean;
  private esValido: boolean;

  private posiciones: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];

  private formatoModel: FormatoModel;
  private formatoParametroModel: FormatoParametroModel = new FormatoParametroModel();
  private formatoAdendumModel: FormatoAdendumModel = new FormatoAdendumModel();
  private formatosParametroModel: Array<FormatoParametroModel> = new Array<FormatoParametroModel>();

  private formatosAdendumModel: Array<FormatoAdendumModel> = new Array<FormatoAdendumModel>();
  private Planos: Array<AttachmentModel> = new Array<AttachmentModel>();
  private planoView: AttachmentModel;
  private herramientaModel: HerramientaModel = new HerramientaModel();
  private Herramientas: Array<HerramientaModel>;
  private paginacion: PaginacionModel;

  private formFormato: FormGroup;
  private formFormatoAdendum: FormArray;
  private formFormatoPatamtros: FormArray;

  private lectorArchivos: FileReader;

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
    this.formatoModel = new FormatoModel(this.Planos, this.formatosAdendumModel);
    this.paginacion = new PaginacionModel(1, 30);
    this.consultarParametros('formato');
    this.listarHerramienta();
    this.getValues();

    this.esValido = false;
  }




  esTipoFormatoOtros(formato: FormatoModel): boolean {
    return formato.TipoFormatoId == 19
  }
  esTipoFormatoConexion(formato: FormatoModel): boolean {
    return formato.TipoFormatoId == 18
  }

  initForm(formato: FormatoModel, Adendum: Array<FormatoAdendumModel>, herramienta: HerramientaModel) {
    console.log(formato);

    if (this.esTipoFormatoOtros(formato)) {
      this.initFormularioFormatoOtros(formato, Adendum, herramienta);
    }
    else if (this.esTipoFormatoConexion(formato)) {
      this.initFormularioFormatoConexion(formato, Adendum, herramienta);

    } else {
      this.initFormularioFormatoOtros(new FormatoModel(new Array<AttachmentModel>()), new Array<FormatoAdendumModel>(), new HerramientaModel());
    }


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

  initFormularioFormatoConexion(formato: FormatoModel, formatoAdendumModel: Array<FormatoAdendumModel>, herramienta?: HerramientaModel) {
    console.log(formato)
    this.formFormato = this.formBuilder.group({
      Planos: [],
      Codigo: [formato.Codigo],
      TipoFormatoId: [formato.TipoFormatoId, Validators.required],
      TiposConexionesId: [formato.TiposConexionesId, Validators.required],
      ConexionId: [formato.ConexionId, Validators.required],
      TPI: [formato.TPI, Validators.required],
      TPF: [formato.TPF, Validators.required],
      EspecificacionId: [formato.EspecificacionId, Validators.required],
      Herramienta: this.formBuilder.group({
        Id: [herramienta.Id]
      }),
      EsFormatoAdjunto: [formato.EsFormatoAdjunto],
      Aletas: [formato.Aletas],
      Adendum: this.formBuilder.array([this.crearFormFormatoAdendum()]),
      Parametros: this.formBuilder.array([this.crearFormFormatoParametroModel()])

    });
    console.log(this.formFormato)
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

  getValues() {

    if (this.route.snapshot.routeConfig.path == 'formato/ver/:id') {
      this.esVer = true;
    }
    var id = this.route.snapshot.paramMap.get('id');
    if (id == undefined) {
      this.esActualizar = false;
      this.initForm(new FormatoModel(new Array<AttachmentModel>()), new Array<FormatoAdendumModel>(), new HerramientaModel());
    }
    else {
      this.consultarFormato(id);

      this.esActualizar = true;
    }
  }

  consultarFormato(guid: any): any {
    this.initForm(this.formatoModel, this.formatosAdendumModel, this.herramientaModel);

    this.formatoServicio.consultarFormatoPorGuid(guid)
      .subscribe(response => {
        console.log(response)
        console.log(this.parametrosFormatoAdendumTiposFormatos)


        this.formatoModel = response;
        this.formatosParametroModel = response.Parametros;
        this.formatosAdendumModel = response.Adendum;
        this.herramientaModel.Id = response.HerramientaId;
        this.initForm(this.formatoModel, this.formatosAdendumModel, this.herramientaModel);



      });
    console.log(this.parametrosFormatoAdendumTiposFormatos)

    this.initFormFormatoAdendum();



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
    this.consultarParametros('formato');
    console.log(this.parametrosFormatoAdendumTiposFormatos);
  
    this.formFormatoAdendum = this.formFormato.get('Adendum') as FormArray;

    this.parametrosFormatoAdendumTiposFormatos.forEach(p => {
      let form = this.formBuilder.group({

      });
      form.addControl('TipoId', new FormControl(p.Id));
      this.formatosAdendumModel.forEach(f => {
        form.addControl('Id', new FormControl(f.Id));
        form.addControl('Posicion', new FormControl(f.Posicion));
        form.addControl('TipoId', new FormControl(f.TipoId));
        form.addControl('Valor', new FormControl(f.Valor));
        this.formFormatoAdendum.push(form);
    })

 

    



      
    });



  }

  crearFormFormatoAdendum() {

    let formatoAdendumModel = this.formBuilder.group({
      Id: [this.formatoAdendumModel.Id],
      Posicion: [this.posiciones],
      TipoId: [this.parametrosFormatoAdendumTiposFormatos],
      Valor: [this.formatoAdendumModel.Posicion]
    });


    return formatoAdendumModel;
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



  addItem(): void {
    this.formFormatoAdendum = this.formFormato.get('Adendum') as FormArray;
    this.formFormatoAdendum.push(this.crearFormFormatoAdendum());
    console.log(this.formFormatoAdendum);
  }

  addItemFormParametro(): void {
    this.formFormatoPatamtros = this.formFormato.get('Parametros') as FormArray;
    this.formFormatoPatamtros.push(this.crearFormFormatoParametroModel());
    console.log(this.formFormatoPatamtros);
  }

  removeItemFormFormatoPatamtros(i) {
    this.formFormatoPatamtros.removeAt(i);
  }

  removeItem(i) {
    this.formFormatoAdendum.removeAt(i);

    Object.assign(this.formatoModel.Adendum, this.formFormatoAdendum.value)

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
      Adendum: this.formBuilder.array([this.crearFormFormatoAdendum()]),
      Parametros: this.formBuilder.array([this.crearFormFormatoParametroModel()])
    });

  }

  cambioDatosFormulario(formulario: FormGroup) {
    formulario.valueChanges.subscribe(val => {
      this.asignarValoresFormularioFormato(val);
      this.esFormularioValido(this.formFormato)
      debugger
      console.log(this.formFormato)
      console.log(this.formatoModel);
      this.formatoModel.NombreUsuarioCrea = 'Admin';
      this.formatoModel.GuidUsuarioCrea = '00000000-0000-0000-0000-000000000000';
      this.formatoModel.GuidOrganizacion = '00000000-0000-0000-0000-000000000000';

    });

    this.initFormFormatoAdendum();
  }

  listarHerramienta() {
    this.herramientaServicio.ConsultarHerramientas(this.paginacion).subscribe(r => {
      this.Herramientas = r.Listado


    });
  }

  asignarValoresFormularioFormato(val) {
    this.formatoModel = Object.assign(this.formatoModel, val)
  }

  enviarFormulario() {
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

  crearFormato(formato: FormatoModel) {
    console.log(formato
    )
    this.formatoServicio.crearFormato(formato).subscribe((a) => {
      console.log(a)
    });
  }

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

  esFormularioValido(formulario: FormGroup): boolean {
    if (formulario.status == 'VALID') {
      this.esValido = true;
    }
    return this.esValido;
  }



}

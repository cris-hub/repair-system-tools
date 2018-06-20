import { Component, OnInit } from '@angular/core';

import { FormatoModel, AttachmentModel, HerramientaModel, PaginacionModel, FormatoAdendumModel } from "../../common/models/index";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { attachEmbeddedView } from '@angular/core/src/view';
import { HerramientaService } from '../../common/services/entity';
import { isObject } from 'util';
import { format } from 'url';

import { FormatoService } from '../../common/services/entity/formato.service';
import { ValidacionDirective } from '../../common/directivas/validacion/validacion.directive';


@Component({
  selector: 'app-crear-formato',
  templateUrl: './crear-formato.component.html',
  styleUrls: ['./crear-formato.component.css']
})
export class CrearFormatoComponent implements OnInit {

  private formatoModel: FormatoModel;
  private formatoAdendumModel: Array<FormatoAdendumModel>;
  private planos: Array<AttachmentModel> = new Array<AttachmentModel>();
  private planoView: AttachmentModel;
  private herramientaModel: HerramientaModel;
  private Herramientas: Array<HerramientaModel>;
  private paginacion: PaginacionModel;
  private esValido: boolean;

  private formFormato: FormGroup;
  private formFormatoAdendum: FormArray;
  private lectorArchivos: FileReader;

  constructor(
    private formBuilder: FormBuilder,
    private herramientaServicio: HerramientaService,
    private formatoServicio: FormatoService
  ) {

  }

  ngOnInit() {
    this.paginacion = new PaginacionModel(1, 30);
    this.formatoModel = new FormatoModel(this.planos, this.formatoAdendumModel, 1);
    this.listarHerramienta();
    this.initForm(this.formatoModel, this.formatoAdendumModel);
    this.esValido = false;
  }

  esTipoFormatoOtros(formato: FormatoModel): boolean {
    return formato.TipoFormatoId == 0
  }
  esTipoFormatoConexion(formato: FormatoModel): boolean {
    return formato.TipoFormatoId == 1
  }

  initForm(formato: FormatoModel, Adendum: Array<FormatoAdendumModel>) {

    if (this.esTipoFormatoOtros(formato)) {
      this.initFormularioFormatoOtros(formato);
    }
    else if (this.esTipoFormatoConexion(formato)) {
      this.initFormularioFormatoConexion(formato, Adendum);
    }
    console.log(this.formFormato);
    this.cambioDatosFormulario(this.formFormato);

  }

  initFormularioFormatoConexion(formato: FormatoModel, formatoAdendumModel: Array<FormatoAdendumModel>) {
    this.formFormato = this.formBuilder.group({
      plano: [null, Validators.required],
      Codigo: [formato.Codigo],
      TipoFormatoId: [formato.TipoFormatoId, Validators.required],
      TipoConexionId: [formato.TipoConexionId, Validators.required],
      ConexionId: [formato.ConexionId, Validators.required],
      TPI: [formato.TPI, Validators.required],
      TPF: [formato.TPF, Validators.required],
      Especificacion: [formato.Especificacion, Validators.required],
      Herramienta: [],
      DocumentoAdjunto: [formato.DocumentoAdjunto],
      Aletas: [formato.Aletas],
      formFormatoAdendum: this.formBuilder.array([this.crearFormFormatoAdendum()])

    });
    console.log(this.formFormato)
  }

  crearFormFormatoAdendum() {
    return this.formBuilder.group({
      Id: '',
      Posicion: '',
      Tipo: '',
      Valor: ''
    });
  }

  addItem(): void {
    this.formFormatoAdendum = this.formFormato.get('formFormatoAdendum') as FormArray;
    this.formFormatoAdendum.push(this.crearFormFormatoAdendum());
    console.log(this.formFormatoAdendum);
  }

  removeItem(i) {
    this.formFormatoAdendum.removeAt(i);
  }

  initFormularioFormatoOtros(formato: FormatoModel) {
    this.formFormato = this.formBuilder.group({
      plano: [null, Validators.required],
      Codigo: [formato.Codigo],
      TipoFormatoId: [formato.TipoFormatoId, Validators.required],
      TipoConexionId: [formato.TipoConexionId],
      ConexionId: [formato.ConexionId],
      TPI: [formato.TPI],
      TPF: [formato.TPF],
      Especificacion: [formato.Especificacion],
      Herramienta: [null, Validators.required],
      DocumentoAdjunto: [formato.DocumentoAdjunto],
      Aletas: [formato.Aletas]
    });

  }

  cambioDatosFormulario(formulario: FormGroup) {
    formulario.valueChanges.subscribe(val => {
      this.asignarValoresFormularioFormato(val);
      this.esFormularioValido(this.formFormato)

      console.log(this.formFormato)
    });
  }

  listarHerramienta() {
    this.herramientaServicio.ConsultarHerramientas(this.paginacion).subscribe(r => {
      this.Herramientas = r.Listado


    });
  }

  asignarValoresFormularioFormato(val) {
    this.formatoModel = Object.assign(this.formatoModel, val)
    this.herramientaModel = JSON.parse(val.Herramienta);

    if (val.Herramienta) {
      if (typeof (val.Herramienta).isObject && val.Herramienta) {
        Object.assign(this.formatoModel.Herramienta, this.herramientaModel)
      }

    }

  }

  enviarFormulario() {
    if (!this.esValido) {
      return;
    }
    this.crearFormato(this.formatoModel);
  }

  crearFormato(formato: FormatoModel) {
    this.formatoServicio.crearFormato(formato).subscribe((a) => {
      console.log(a)
    });
  }

  addFile(event: any) {
    let files = this.leerArchivo(event);
    for (var i = 0; i < files.length; i++) {
      this.planoView = this.obtenerDatosArchivoAdjunto(files[i]);
      this.personaModifica();
      this.planos.push(this.planoView);
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

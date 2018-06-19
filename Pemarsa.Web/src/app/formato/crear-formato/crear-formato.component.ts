import { Component, OnInit } from '@angular/core';

import { FormatoModel, AttachmentModel } from "../../common/models/index";
import { FormBuilder, FormGroup } from '@angular/forms';
import { attachEmbeddedView } from '@angular/core/src/view';


@Component({
  selector: 'app-crear-formato',
  templateUrl: './crear-formato.component.html',
  styleUrls: ['./crear-formato.component.css']
})
export class CrearFormatoComponent implements OnInit {

  private planos: Array<AttachmentModel> = new Array<AttachmentModel>();
  private planoView: AttachmentModel;
  private formatoModel: FormatoModel ;
  private esValido: boolean;

  private formFormato: FormGroup;
  private lectorArchivos: FileReader;
  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.formatoModel =  new FormatoModel(this.planos,1);
    this.initForm(this.formatoModel);
    
    this.esValido = false;
  }

  initForm(formato: FormatoModel) {
    this.formFormato = this.formBuilder.group({
      Codigo: [formato.Codigo],
      plano: [null],
      TipoFormatoId: [formato.TipoFormatoId],
      TipoConexionId:[formato.TipoConexionId],
      ConexionId:[formato.ConexionId],
      TPI: [formato.TPI],
      TPF: [formato.TPF],
      Especificacion : [formato.Especificacion]
    });
    this.formFormato.valueChanges.subscribe(val => {
      this.esFormularioValido();
      this.asignarValoresFormularioFormato();
    });
  }


  asignarValoresFormularioFormato() {
    this.formatoModel = Object.assign(this.formatoModel, this.formFormato.value)

  }

  enviarFormulario(formatoForm: FormGroup) {
    if (!this.esValido) {
      return;
    }
    this.crearFormato(formatoForm);
  }

  crearFormato(formatoForm: FormGroup) {
    console.log(this.formatoModel)
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

  esFormularioValido(): boolean {
    this.esValido = true;

    return this.esValido;
  }



}

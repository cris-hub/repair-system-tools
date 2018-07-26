import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { InspeccionModel, EntidadModel, ProcesoModel, InspeccionEspesorModel } from '../../../common/models/Index';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION, ESTADOS_INSPECCION } from '../../inspeccion-enum/inspeccion.enum';

@Component({
  selector: 'app-ut',
  templateUrl: './ut.component.html',
  styleUrls: ['./ut.component.css']
})
export class UTComponent implements OnInit {


  //catalogos
  private BloquesEscalonados: EntidadModel[] = new Array<EntidadModel>();

  //procesoInpeccion
  private proceso: ProcesoModel;
  private inspeccion: InspeccionModel = new InspeccionModel();
  private InspeccionEspesores: Array<InspeccionEspesorModel> = new Array<InspeccionEspesorModel>();

  //form
  private formulario: FormGroup;
  private FormularioEspesores: FormArray;
  private esFormularioValido: Boolean = false;
  private esVer: Boolean = false;

  //validaciones
  private tieneCalibracion: boolean ;


  constructor(
    private procesoService: ProcesoService,
    private parametroService: ParametroService,
    private toastrService: ToastrService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private formBuider: FormBuilder,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    
    this.consultarProceso();
  }

  listarBloquesEvent() {
    this.parametroService.consultarParametrosPorEntidad(ENTIDADES.INSPECCION).subscribe(response => {
      this.BloquesEscalonados = response.Catalogos.filter(equpo => equpo.Grupo == GRUPOS.TIPOSBLOQUEESCALONADOO);
    })
  }

  obtenerParametrosRuta() {
    let parametrosUlrMap: Map<string, string> = new Map<string, string>();
    parametrosUlrMap.set('procesoId', this.activedRoute.snapshot.paramMap.get('id'));
    parametrosUlrMap.set('pieza', this.activedRoute.snapshot.paramMap.get('index'));
    parametrosUlrMap.set('tipoInspeccion', this.activedRoute.snapshot.url[2].path);

    return parametrosUlrMap;
  }

  consultarProceso() {
    this.iniciarFormulario(new InspeccionModel());

    this.procesoService.consultarProcesoPorGuid(this.obtenerParametrosRuta().get('procesoId'))
      .subscribe(response => {
        let inspeccionEntrada: ProcesoInspeccionEntradaModel = response.InspeccionEntrada.find(c => {
          return (
            c.Inspeccion.TipoInspeccionId
            == TIPO_INSPECCION[this.obtenerParametrosRuta().get('tipoInspeccion')]
            && c.Inspeccion.EstadoId == ESTADOS_INSPECCION.ENPROCESO)

        });
        
        this.inspeccion = inspeccionEntrada.Inspeccion;

        console.log(this.inspeccion)
      }, error => {

      }, () => {


        this.inspeccion ? this.iniciarFormulario(this.inspeccion) : this.iniciarFormulario(new InspeccionModel());
        this.initFormularioEspesores();
      });
  }



  //actualizaciones
  procesar() {

    
    this.asignarDataDesdeElFormulario();
   
      this.actualizarDatos()
  
  }
  actualizarDatos() {
    this.procesoService
      .actualizarInspección(this.inspeccion)
      .subscribe(response => {
        this.toastrService.info(response ? 'ok' : 'error');
      })
  }


  private asignarDataDesdeElFormulario() {
    
    Object.assign(this.inspeccion, this.formulario.value);
  }

  //forms
  //form esperos
  iniciarFormulario(inspeccion: InspeccionModel) {
    this.formulario = this.formBuider.group({
      tieneCalibracion: [this.tieneCalibracion],
      BloqueEscalonadoUsadoId: [inspeccion.BloqueEscalonadoUsadoId],
      Espesores: this.formBuider.array([])
    });
  }

  initFormularioEspesores() {
    this.FormularioEspesores = this.formulario.get('Espesores') as FormArray;
    console.log(this.FormularioEspesores);
    console.log(this.InspeccionEspesores);

    this.FormularioEspesores.push(this.crearNuevoFormGroupFormuarilEspesoor());

    if ((this.InspeccionEspesores.length>0)) {
      this.InspeccionEspesores.forEach(f => {
        let form = this.formBuider.group({
          Desviacion: [f.Desviacion],
          EspesorActual: [f.EspesorActual],
          EspesorNominal: [f.EspesorNominal]
        });
        this.FormularioEspesores.push(form)
      });
    }
   
  }

  agregarItem(): void {
    this.FormularioEspesores = this.formulario.get('Espesores') as FormArray;
    this.FormularioEspesores.push(this.crearNuevoFormGroupFormuarilEspesoor());
    console.log(this.FormularioEspesores);
  }

  crearNuevoFormGroupFormuarilEspesoor(): any {
    let formatoParametrosModel = this.formBuider.group({
      Desviacion: '',
      EspesorActual: '',
      EspesorNominal: ''
    });


    return formatoParametrosModel;
  }

  removerItem(i) {
    this.FormularioEspesores.removeAt(i);
  }



}

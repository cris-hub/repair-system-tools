import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../common/services/entity';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from '../../../common/services/entity/loaderService';
import { ENTIDADES, GRUPOS } from '../../../common/enums/parametrosEnum';
import { InspeccionModel, EntidadModel, ProcesoModel } from '../../../common/models/Index';
import { ProcesoInspeccionEntradaModel } from '../../../common/models/ProcesoInspeccionEntradaModel';
import { TIPO_INSPECCION } from '../../inspeccion-enum/inspeccion.enum';

@Component({
  selector: 'app-ut',
  templateUrl: './ut.component.html',
  styleUrls: ['./ut.component.css']
})
export class UTComponent implements OnInit {


  //catalogos
  private Conexiones: EntidadModel[] = new Array<EntidadModel>();
  private EstadosConexion: EntidadModel[] = new Array<EntidadModel>();
  private TiposConexion: EntidadModel[] = new Array<EntidadModel>();
  private EquiposMedicionUsado: EntidadModel[] = new Array<EntidadModel>();

  //procesoInpeccion
  private proceso: ProcesoModel;
  private inspeccion: InspeccionModel = new InspeccionModel();


  //form
  private formInpeccionVisualDimensional: FormGroup;
  private esFormularioValido: Boolean = false;
  private esVer: Boolean = false;
  

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
    this.consultarParatros();
    this.consultarProceso();
  }

  consultarParatros() {
    this.parametroService.consultarParametrosPorEntidad(ENTIDADES.INSPECCION).subscribe(response => {
      this.Conexiones = response.Consultas.filter(conexion => conexion.Grupo == GRUPOS.CONEXION);
      this.EstadosConexion = response.Consultas.filter(estados => estados.Grupo == GRUPOS.ESTADOSCONEXIONBOX || estados.Grupo == GRUPOS.ESTADOSCONEXIONPIN);
      this.TiposConexion = response.Consultas.filter(tipos => tipos.Grupo == GRUPOS.TIPOCONEXION);
      this.EquiposMedicionUsado = response.Consultas.filter(equpo => equpo.Grupo == GRUPOS.EQUIPOMEDICIONUTILIZADO);

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
          return c.Inspeccion.TipoInspeccionId == TIPO_INSPECCION[this.obtenerParametrosRuta().get('tipoInspeccion')]
        });
        this.inspeccion = inspeccionEntrada.Inspeccion;

        console.log(this.inspeccion)
      }, error => {

      }, () => {


        this.inspeccion ? this.iniciarFormulario(this.inspeccion) : this.iniciarFormulario(new InspeccionModel());
      });
  }


  iniciarFormulario(inspeccion: InspeccionModel) {
    this.formInpeccionVisualDimensional = this.formBuider.group({


    });
   
  }

}

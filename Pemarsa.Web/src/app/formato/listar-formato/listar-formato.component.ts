import { Component, OnInit } from '@angular/core';
import { FormatoModel, PaginacionModel, ParametrosModel, CatalogoModel } from '../../common/models/Index';
import { FormatoService } from '../../common/services/entity';
import { ParametroService } from '../../common/services/entity/parametro.service';

@Component({
  selector: 'app-listar-formato',
  templateUrl: './listar-formato.component.html',
  styleUrls: ['./listar-formato.component.css']
})
export class ListarFormatoComponent implements OnInit {

  public formatos: Array<FormatoModel>
  public paginacion: PaginacionModel;
  public parametrosConexionFormato: ParametrosModel = new ParametrosModel();
  public filter:string
  constructor(
    private formatoService: FormatoService,
    private parametroService: ParametroService
  ) {

  }

  ngOnInit() {
    this.paginacion = new PaginacionModel(1, 30);
    this.consultarFomatos();
  }

  consultarFomatos() {

    this.parametroService.consultarParametrosPorEntidad('formato').subscribe(response => {
      this.parametrosConexionFormato.Catalogos = response.Catalogos.filter(c => { return c.Grupo == 'CONEXION' });
    });
    this.formatoService.consultarFormatos(this.paginacion).subscribe((response) => {
      this.formatos = response.Listado
      console.log(response)

      this.paginacion.TotalRegistros = response.CantidadRegistros;

      this.formatos.forEach((f) => {

        f.Conexion = new CatalogoModel()



        if (f.ConexionId) {

          Object.assign(
            f.Conexion
            ,
            this.parametrosConexionFormato.Catalogos.filter((c) => { return c.Id == f.ConexionId })[0]

          );
        }

      })

    });





    console.log(this.parametrosConexionFormato);


  }


  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    this.consultarFomatos();
  }

  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;
    this.consultarFomatos();
  }



  consultarFormatoPorFiltro(filtro) {
    filtro.PaginaActual = this.paginacion.PaginaActual;
    filtro.CantidadRegistros = this.paginacion.CantidadRegistros;
    console.log(filtro)
    this.formatoService.consultarFormatosPorFiltro(filtro)
      .subscribe(response => {
        this.formatos = response.Listado;
        this.formatos.forEach((f) => {

          f.Conexion = new CatalogoModel()



          if (f.ConexionId) {

            Object.assign(
              f.Conexion
              ,
              this.parametrosConexionFormato.Catalogos.filter((c) => { return c.Id == f.ConexionId })[0]

            );
          }
          console.log(f)

        })
        this.paginacion.TotalRegistros = response.CantidadRegistros;

      });
  }
}

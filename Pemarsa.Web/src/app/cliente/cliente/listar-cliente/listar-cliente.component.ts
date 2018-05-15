import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ClienteService } from '../../../common/services/entity/index';
import {
  ClienteModel
} from '../../../common/models/Index';
import { PaginacionModel } from '../../../common/models/PaginacionModel';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ParametrosModel } from '../../../common/models/ParametrosModel';
import { ConfirmacionComponent } from '../../../common/directivas/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html'
})
export class ListarClienteComponent implements OnInit {
  private registroSeleccionado: string;
  private clientes: ClienteModel[];

  // paginacion
  private paginacion: PaginacionModel;
  private parametros: ParametrosModel;
  private esFiltrar: boolean = false;

  constructor(
    public clienteSrv: ClienteService,
    public parametroSrv: ParametroService,
    private toastr: ToastrService)
  {
    this.paginacion = new PaginacionModel(1, 8);
    this.parametros = new ParametrosModel();
  }

  ngOnInit() {
    this.consultarParametros();
    this.consultarClientes();
  }

  consultarClientes() {
    this.clienteSrv.consultarClientes(this.paginacion)
      .subscribe(response => {
        this.clientes = response.Listado;
        this.paginacion.TotalRegistros = response.CantidadRegistros;
      });
  
  }

  limiteConsulta(event: any) {
    this.paginacion = new PaginacionModel(1, event);
    this.consultarClientes();
  }

  cambioPagina(page: any) {
    this.paginacion.PaginaActual = page;
    this.consultarClientes();
  }

  actualizarEstadoCliente(cliente: ClienteModel, estado: string) {
    this.clienteSrv.ActualizarEstadoCliente(cliente.Guid, estado)
      .subscribe(response => {
        if (response) {
          this.toastr.success('Se actualizó el estado del cliente', '');
        }
        this.consultarClientes();
      })
  }

  consultarParametros() {
    this.parametroSrv.consultarParametrosPorEntidad("Cliente")
      .subscribe(response => {
        this.parametros = response;
      });
    setTimeout(() => { console.log(this.parametros); }, 1);
  }
}

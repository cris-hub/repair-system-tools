import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ClienteService } from '../../../common/services/entity/index';
import {
  ClienteModel
} from '../../../common/models/Index';

import { FiltroClienteComponent } from '../filtro-cliente/filtro-cliente.component'
import { LineaClienteComponent } from '../linea-cliente/linea-cliente.component';

import { PaginacionModel } from '../../../common/models/PaginacionModel';
import { ParametroService } from '../../../common/services/entity/parametro.service';
import { ParametrosModel } from '../../../common/models/ParametrosModel';
import { ConfirmacionComponent } from '../../../common/directivas/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';
import { debug } from 'util';
import { ClienteLineaModel } from '../../../common/models/ClienteLineaModel';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html'
})
export class ListarClienteComponent implements OnInit {
  //ViewChild para funcionalidad del modal de confirmacion
  @ViewChild(ConfirmacionComponent) confirmar: ConfirmacionComponent;

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
    this.paginacion = new PaginacionModel(1, 30);
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
  }

  consultarClientesPorFiltro(filtro) {
    filtro.PaginaActual = this.paginacion.PaginaActual;
    filtro.CantidadRegistros = this.paginacion.CantidadRegistros;
    this.clienteSrv.consultarClientesPorFiltro(filtro)
      .subscribe(response => {
        this.clientes = response.Listado;
        this.paginacion.TotalRegistros = response.CantidadRegistros;
        //this.sortedCollection = this.orderPipe.transform(this.clientes, 'RazonSocial');
      }); 
  }
  //Funcion para implementar el modal con la informacion respectiva
  confirmarParams(titulo: string, Mensaje: string, Cancelar: boolean, objData: any)
  {
    this.confirmar.llenarObjectoData(titulo, Mensaje, Cancelar, objData);
  }
  actualizarEstadoClienteConfirmacion(event: any) {
    if (event.response == true) {
      this.actualizarEstadoCliente(event.cliente, event.estado);
    }
    else {
      this.consultarClientes();
    }
  }
}

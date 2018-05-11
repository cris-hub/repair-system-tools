import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'items-pagination',
  templateUrl: './paginacion.component.html'
})
export class PaginationComponent implements OnInit {
  @Output() changePagination = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  limitChange(event: any) {
    this.changePagination.emit(event);
  }
}

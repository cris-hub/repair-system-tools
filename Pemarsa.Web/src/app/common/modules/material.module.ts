import { NgModule } from '@angular/core'
import { getSpanishPaginator } from './../../shared/paginator/paginator.spanish';
import { PaginationComponent } from '../directivas/paginacion/paginacion.component';

import {
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatGridListModule,
  MatDividerModule,
  MatListModule,
  MatButtonModule,
  MatOptionModule,
  MatSelect,
  MatSelectModule,
  MatPseudoCheckboxModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatTableModule,
  MatChipsModule,
  MatSnackBarModule,
  MatTableDataSource,
  MatPaginatorModule,
  MatDialogModule,
  MatMenuModule,
  MatPaginatorIntl
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTableModule,
    MatSnackBarModule,
    MatChipsModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    
  ],

  declarations: [
    PaginationComponent
  ],

  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTableModule,
    MatSnackBarModule,
    MatChipsModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    PaginationComponent
  ],

  providers: [
    {      
      provide: MatPaginatorIntl,
      useValue: getSpanishPaginator()
    },
  ]
})

export class MaterialModule { }

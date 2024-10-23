import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriasRoutingModule } from './materias-routing.module';
import { MateriasComponent } from './materias.component';
import { MateriasDialogComponent } from './materias-dialog/materias-dialog.component';

import { CompatidasModule } from '../../../compartidas/compartidas.module';

@NgModule({
  declarations: [
    MateriasComponent,
    MateriasDialogComponent
  ],
  imports: [
    CommonModule,
    MateriasRoutingModule,
    CompatidasModule
  ]
})
export class MateriasModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';

import { CorpatidasModule } from '../../../compartidas/compartidas.module';


@NgModule({
  declarations: [AlumnosComponent, AlumnosDialogComponent],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    CorpatidasModule
  ],
  exports: [AlumnosComponent],
})
export class AlumnosModule { }

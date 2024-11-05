import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestrosRoutingModule } from './maestros-routing.module';
import { MaestrosComponent } from './maestros.component';
import { MaestrosDialogComponent } from './maestros-dialog/maestros-dialog.component';

import { CompatidasModule } from '../../../compartidas/compartidas.module';


@NgModule({
  declarations: [
    MaestrosComponent,
    MaestrosDialogComponent
  ],
  imports: [
    CommonModule,
    MaestrosRoutingModule,
    CompatidasModule
  ]
})
export class MaestrosModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriasRoutingModule } from './materias-routing.module';
import { MateriasComponent } from './materias.component';
import { MateriasDialogComponent } from './materias-dialog/materias-dialog.component';

import { CompatidasModule } from '../../../compartidas/compartidas.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MateriasEffects } from './store/materias.effects';
import { materiasFeature } from './store/materias.reducer';

@NgModule({
  declarations: [
    MateriasComponent,
    MateriasDialogComponent
  ],
  imports: [
    CommonModule,
    MateriasRoutingModule,
    CompatidasModule,
    StoreModule.forFeature(materiasFeature),
    EffectsModule.forFeature([MateriasEffects])
  ]
})
export class MateriasModule { }

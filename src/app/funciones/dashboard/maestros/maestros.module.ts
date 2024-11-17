import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestrosRoutingModule } from './maestros-routing.module';
import { MaestrosComponent } from './maestros.component';
import { MaestrosDialogComponent } from './maestros-dialog/maestros-dialog.component';

import { CompatidasModule } from '../../../compartidas/compartidas.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaestrosEffects } from './store/maestros.effects';
import { maestrosFeature } from './store/maestros.reducer';


@NgModule({
  declarations: [
    MaestrosComponent,
    MaestrosDialogComponent
  ],
  imports: [
    CommonModule,
    MaestrosRoutingModule,
    CompatidasModule,
    StoreModule.forFeature(maestrosFeature),
    EffectsModule.forFeature([MaestrosEffects])
  ]
})
export class MaestrosModule { }

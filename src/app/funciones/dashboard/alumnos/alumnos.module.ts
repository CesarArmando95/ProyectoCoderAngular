import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';

import { CompatidasModule } from '../../../compartidas/compartidas.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AlumnosEffects } from './store/alumnos.effects';
import { alumnosFeature } from './store/alumnos.reducer';


@NgModule({
  declarations: [AlumnosComponent, AlumnosDialogComponent],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    CompatidasModule,
    StoreModule.forFeature(alumnosFeature),
    EffectsModule.forFeature([AlumnosEffects])
  ],
  exports: [AlumnosComponent],
})
export class AlumnosModule { }

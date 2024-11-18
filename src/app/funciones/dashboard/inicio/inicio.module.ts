import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import {MatCardModule} from '@angular/material/card';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InicioEffects } from './store/inicio.effects';
import { inicioFeature } from './store/inicio.reducer';
import { CompatidasModule } from '../../../compartidas/compartidas.module';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatCardModule,
    CompatidasModule,
    StoreModule.forFeature(inicioFeature),
    EffectsModule.forFeature([InicioEffects])
  ]
})
export class InicioModule { }

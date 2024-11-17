import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';

import { CompatidasModule } from '../../../compartidas/compartidas.module';
import { UsuariosDialogComponent } from './usuarios-dialog/usuarios-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsuariosEffects } from './store/usuarios.effects';
import { usuariosFeature } from './store/usuarios.reducer';

@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosDialogComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    CompatidasModule,
    StoreModule.forFeature(usuariosFeature),
    EffectsModule.forFeature([UsuariosEffects])
  ],
  exports: [UsuariosComponent]
})
export class UsuariosModule { }

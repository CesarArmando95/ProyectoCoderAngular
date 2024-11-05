import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';

import { CompatidasModule } from '../../../compartidas/compartidas.module';
import { UsuariosDialogComponent } from './usuarios-dialog/usuarios-dialog.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosDialogComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    CompatidasModule
  ],
  exports: [UsuariosComponent]
})
export class UsuariosModule { }

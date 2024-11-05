import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

import { CompatidasModule } from '../../compartidas/compartidas.module';
import { AutenticacionComponent } from './autenticacion.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    AutenticacionComponent
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    CompatidasModule
  ]
})
export class AutenticacionModule { }

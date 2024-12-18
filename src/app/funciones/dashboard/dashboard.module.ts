import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';

import { CompatidasModule } from '../../compartidas/compartidas.module';
import { AlumnosModule } from "./alumnos/alumnos.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    CompatidasModule,
    MatListModule,
    AlumnosModule
],
  exports: [DashboardComponent],
})
export class DashboardModule {}
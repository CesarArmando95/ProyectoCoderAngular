import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { AlumnosModule } from './alumnos/alumnos.module';

import { CorpatidasModule } from '../../compartidas/compartidas.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    AlumnosModule,
    CorpatidasModule,
    MatListModule

  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
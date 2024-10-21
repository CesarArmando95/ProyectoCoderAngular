import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'alumnos',
    loadChildren:() => 
      import('./alumnos/alumnos.module').then((m) => m.AlumnosModule)
  },
  {
    path: '**',
    redirectTo: 'alumnos'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
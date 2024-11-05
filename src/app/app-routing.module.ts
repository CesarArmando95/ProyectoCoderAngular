import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './funciones/dashboard/dashboard.component';
import { AutenticacionComponent } from './funciones/autenticacion/autenticacion.component';
import { autenticacionhGuard } from './core/guards/autentificacion.guard';

const routes: Routes = [
  {
    path: 'autenticacion',
    component: AutenticacionComponent,
    loadChildren: () =>
      import('./funciones/autenticacion/autenticacion.module').then((m) => m.AutenticacionModule),
  }, 
  {
    path: 'dashboard',
    canActivate: [autenticacionhGuard],
    component: DashboardComponent,
    loadChildren: () => import ('./funciones/dashboard/dashboard.module').then((m)=>m.DashboardModule),
 },
 {
    path: '**',
    redirectTo: 'autenticacion'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

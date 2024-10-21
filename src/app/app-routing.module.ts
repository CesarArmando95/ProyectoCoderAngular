import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './funciones/dashboard/dashboard.component';

const routes: Routes = [
 {
  path: 'dashboard',
  component: DashboardComponent,
  loadChildren: () => import ('./funciones/dashboard/dashboard.module').then((m)=>m.DashboardModule),
 },
 {
  path: '**',
  redirectTo: 'dashboard'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

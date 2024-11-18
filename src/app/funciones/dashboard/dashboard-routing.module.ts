import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren:() => 
      import('./inicio/inicio.module').then((m) => m.InicioModule)
  },
  {
    path: 'alumnos',
    loadChildren:() => 
      import('./alumnos/alumnos.module').then((m) => m.AlumnosModule)
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((m) => m.UsuariosModule)
  },
  {
    path: 'maestros',
    loadChildren:() =>
        import('./maestros/maestros.module').then((m) => m.MaestrosModule)
  },
  {
    path: 'materias',
    loadChildren:() =>
      import('./materias/materias.module').then((m) => m.MateriasModule)  
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
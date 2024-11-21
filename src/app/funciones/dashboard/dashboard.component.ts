import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../core/services/autenticacion.service';
import { Usuario } from '../../modelos';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;
  usuarioLogeado$ : Observable<Usuario | null>;
  rol: string | undefined;

  constructor(private router : Router,  private autenticacionService: AutenticacionService){
    this.rol = "";
    this.usuarioLogeado$ = this.autenticacionService.authUser$;
    this.usuarioLogeado$.subscribe((respuesta) => this.rol = respuesta?.rol)
  }

  navegarAOtroComponente(){
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }
}

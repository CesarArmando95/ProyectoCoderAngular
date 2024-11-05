import { Injectable } from '@angular/core';
import { Autenticacion } from '../../modelos/autenticacion-model';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { Usuario } from '../../modelos/usuario-model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AutenticacionService {
  private _authUser$ = new BehaviorSubject<null | Usuario>(null);

  public authUser$ = this._authUser$.asObservable();

  private baseURL = environment.apiBaseURL;

  constructor(private router: Router, private httpClient: HttpClient) {}

  private handleAuthentication(usuarios: Usuario[]): Usuario | null {
    if (!!usuarios[0]) {
      this._authUser$.next(usuarios[0]);
      localStorage.setItem('token', usuarios[0].token);
      return usuarios[0];
    } else {
      return null;
    }
  }

  login(data: Autenticacion): Observable<Usuario> {
    return this.httpClient
      .get<Usuario[]>(
        `${this.baseURL}/usuarios?correo=${data.correo}&contrasena=${data.contrasena}`
      )
      .pipe(
        map((usuarios) => {
          const user = this.handleAuthentication(usuarios);
          if (user) {
            return user;
          } else {
            throw throwError(() => new Error('Los datos son invalidos'));
          }
        })
      );
  }

  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient
      .get<Usuario[]>(
        `${this.baseURL}/usuarios?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((usuarios) => {
          const user = this.handleAuthentication(usuarios);
          return !!user;
        })
      );
  }
}
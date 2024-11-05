import { Injectable } from "@angular/core";
import { Usuario } from '../../modelos/usuario-model'; 
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { generadorToken } from "../../compartidas/herramientas/generadorToken";
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class UsuariosService{
    private baseURL = environment.apiBaseURL;
    constructor(private httpClient: HttpClient){}

    obtenerUsuarios(): Observable<Usuario[]>{
        return this.httpClient.get<Usuario[]>(`${this.baseURL}/usuarios`);
    }

    agregarUsuario(resultado: Usuario): Observable<boolean>{
        return this.httpClient.post(`${this.baseURL}/usuarios` ,{
            ...resultado,
            id: String(resultado.id),
            fechaCreacion: new Date().toISOString(),
            token: generadorToken(20),
        }).pipe(
            map(() => true),
            catchError(error => {
                console.error('Error al crear usuario', error);
                return of(false);
              })
        )
    }

    borrarUsuario(id:number):Observable<boolean>{
        return this.httpClient.delete(`${this.baseURL}/usuarios/${id}`)
        .pipe(
            map(() => true),
            catchError(error => {
                console.error('Error al borrar usuario', error);
                return of(false);
              })
        )
    }

    actualizarUsuario(id: number, UsuarioActualizado: Partial<Usuario>):Observable<boolean> {
        return this.httpClient.put(`${this.baseURL}/usuarios/${id}` ,{
            ...UsuarioActualizado,
            fechaCreacion: new Date().toISOString(),
            token: generadorToken(20),
        }).pipe(
            map(() => true),
            catchError(error => {
                console.error('Error al actualizar usuario', error);
                return of(false);
              })
        )   
    }
}

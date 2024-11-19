import { Injectable } from "@angular/core";
import { Usuario } from '../../modelos/usuario-model'; 
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { generadorToken } from "../../compartidas/herramientas/generadorToken";

@Injectable({
    providedIn: 'root',
})

export class UsuariosService{
    private baseURL = environment.apiBaseURL;
    constructor(private httpClient: HttpClient){}

    obtenerUsuarios(): Observable<Usuario[]>{
        return this.httpClient.get<Usuario[]>(`${this.baseURL}/usuarios`);
    }

    agregarUsuario(resultado: Usuario): Observable<Usuario>{
        return this.httpClient.post<Usuario>(`${this.baseURL}/usuarios` ,{
            ...resultado,
            id: String(resultado.id),
            fechaCreacion: new Date().toISOString(),
            token: generadorToken(20),
        })
    }

    borrarUsuario(id:number):Observable<Usuario>{
        return this.httpClient.delete<Usuario>(`${this.baseURL}/usuarios/${id}`)
    }

    actualizarUsuario(id: number, UsuarioActualizado: Partial<Usuario>):Observable<Usuario> {
        return this.httpClient.put<Usuario>(`${this.baseURL}/usuarios/${id}` ,{
            ...UsuarioActualizado,
            fechaCreacion: new Date().toISOString(),
            token: generadorToken(20),
        })
    }
}

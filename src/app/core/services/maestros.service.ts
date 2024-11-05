import { Injectable } from '@angular/core';
import { Maestro } from '../../modelos/maestro-model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { generadorToken } from "../../compartidas/herramientas/generadorToken";
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MaestrosService {
    private baseURL = environment.apiBaseURL;
    constructor(private httpClient: HttpClient) { }

  obtenerMaestros(): Observable<Maestro[]>{
    return this.httpClient.get<Maestro[]>(`${this.baseURL}/maestros`);
}

agregarMaestro(resultado: Maestro): Observable<boolean>{
    return this.httpClient.post(`${this.baseURL}/maestros` ,{
        ...resultado,
        id: String(resultado.id),
        fechaCreacion: new Date().toISOString(),
    }).pipe(
        map(() => true),
        catchError(error => {
            console.error('Error al crear maestro', error);
            return of(false);
          })
    )
}

borrarMaestro(id:number):Observable<boolean>{
    return this.httpClient.delete(`${this.baseURL}/maestros/${id}`)
        .pipe(
            map(() => true),
            catchError(error => {
                console.error('Error al borrar maestro', error);
                return of(false);
              })
        )
}

actualizarMaestro(id: number, maestroActualizado: Partial<Maestro>):Observable<boolean> {
    return this.httpClient.put(`${this.baseURL}/maestros/${id}` ,{
        ...maestroActualizado,
        fechaCreacion: new Date().toISOString(),
        token: generadorToken(20),
    }).pipe(
        map(() => true),
        catchError(error => {
            console.error('Error al actualizar maestro', error);
            return of(false);
          })
    )    
}
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Materia } from '../../modelos/materia-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { generadorToken } from "../../compartidas/herramientas/generadorToken";
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

    private baseURL = environment.apiBaseURL;
    constructor(private httpClient: HttpClient) { }

  obtenerMaterias(): Observable<Materia[]>{
    return this.httpClient.get<Materia[]>(`${this.baseURL}/materias`);
}

agregarMateria(resultado: Materia): Observable<boolean>{
    return this.httpClient.post(`${this.baseURL}/materias` ,{
        ...resultado,
        id: String(resultado.id),
        fechaCreacion: new Date().toISOString(),
    }).pipe(
        map(() => true),
        catchError(error => {
            console.error('Error al crear materia', error);
            return of(false);
          })
    )
}

borrarMateria(id:number):Observable<boolean>{
    return this.httpClient.delete(`${this.baseURL}/materias/${id}`)
        .pipe(
            map(() => true),
            catchError(error => {
                console.error('Error al borrar materia', error);
                return of(false);
              })
        )
}

actualizarMateria(id: number, materiaActualizado: Partial<Materia>):Observable<boolean> {
    return this.httpClient.put(`${this.baseURL}/materias/${id}` ,{
        ...materiaActualizado,
        fechaCreacion: new Date().toISOString(),
        token: generadorToken(20),
    }).pipe(
        map(() => true),
        catchError(error => {
            console.error('Error al actualizar materia', error);
            return of(false);
          })
    )     
}
}

import { Injectable } from "@angular/core";
import { Alumno } from '../../modelos/alumno-model'; 
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { generadorToken } from "../../compartidas/herramientas/generadorToken";
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class AlumnoService {
    private baseURL = environment.apiBaseURL;
    constructor(private httpClient: HttpClient) {}

    obtenerAlumnos(): Observable<Alumno[]>{
        return this.httpClient.get<Alumno[]>(`${this.baseURL}/alumnos`);
    }

    agregarAlumno(resultado: Alumno): Observable<boolean>{
        return this.httpClient.post(`${this.baseURL}/alumnos` ,{
            ...resultado,
            id: String(resultado.id),
            fechaCreacion: new Date().toISOString(),
        }).pipe(
            map(() => true),
            catchError(error => {
                console.error('Error al crear alumno', error);
                return of(false);
              })
        )
    }

    borrarAlumno(id:number):Observable<boolean>{
        return this.httpClient.delete(`${this.baseURL}/alumnos/${id}`)
        .pipe(
            map(() => true),
            catchError(error => {
                console.error('Error al borrar alumno', error);
                return of(false);
              })
        )
    }

    actualizarAlumno(id: number, alumnoActualizado: Partial<Alumno>):Observable<boolean> {
        return this.httpClient.put(`${this.baseURL}/alumnos/${id}` ,{
            ...alumnoActualizado,
            fechaCreacion: new Date().toISOString(),
            token: generadorToken(20),
        }).pipe(
            map(() => true),
            catchError(error => {
                console.error('Error al actualizar alumno', error);
                return of(false);
              })
        )    
    }
}

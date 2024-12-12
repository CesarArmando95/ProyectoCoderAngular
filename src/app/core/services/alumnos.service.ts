import { Injectable } from "@angular/core";
import { Alumno } from '../../modelos/alumno-model'; 
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class AlumnoService {
    private baseURL = environment.apiBaseURL;
    constructor(private httpClient: HttpClient) {}

    obtenerAlumnos(): Observable<Alumno[]>{
        return this.httpClient.get<Alumno[]>(`${this.baseURL}/alumnos`);
    }

    agregarAlumno(resultado: Alumno): Observable<Alumno>{
        return this.httpClient.post<Alumno>(`${this.baseURL}/alumnos` ,{
            ...resultado,
            id: String(resultado.id),
            fechaCreacion: new Date().toISOString(),
        })
    }

    borrarAlumno(id:number):Observable<Alumno>{
        return this.httpClient.delete<Alumno>(`${this.baseURL}/alumnos/${id}`)
    }

    actualizarAlumno(id: number, alumnoActualizado: Partial<Alumno>):Observable<Alumno> {
        return this.httpClient.put<Alumno>(`${this.baseURL}/alumnos/${id}` ,{
            ...alumnoActualizado,
        })  
    }
}

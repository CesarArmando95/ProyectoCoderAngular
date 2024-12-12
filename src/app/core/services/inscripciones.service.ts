import { Injectable } from "@angular/core";
import { Inscripcion } from "../../modelos/inscripciones-model";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class InscripcionesService {
    private baseURL = environment.apiBaseURL;
    constructor(private httpClient: HttpClient) {}

    obtenerInscripciones(): Observable<Inscripcion[]>{
        return this.httpClient.get<Inscripcion[]>(`${this.baseURL}/inscripciones`);
    }

    agregarInscripciones(resultado: Inscripcion): Observable<Inscripcion>{
        return this.httpClient.post<Inscripcion>(`${this.baseURL}/inscripciones` ,{
            ...resultado,
            id: String(resultado.id),
            fechaInscripciones: new Date().toISOString(),
            usuarioNombre: resultado.usuarioNombre
        })
    }

    borrarInscripciones(id:number):Observable<Inscripcion>{
        return this.httpClient.delete<Inscripcion>(`${this.baseURL}/inscripciones/${id}`)
    }

    actualizarInscripciones(id: number, inscripcionActualizado: Partial<Inscripcion>): Observable<Inscripcion> {
        return this.httpClient.put<Inscripcion>(`${this.baseURL}/inscripciones/${id}` ,{
            ...inscripcionActualizado,
            fechaInscripciones: new Date().toISOString(),
        })
    }
}
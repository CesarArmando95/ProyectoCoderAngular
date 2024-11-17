import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Materia } from '../../modelos/materia-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { generadorToken } from "../../compartidas/herramientas/generadorToken";

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

    private baseURL = environment.apiBaseURL;
    constructor(private httpClient: HttpClient) { }

  obtenerMaterias(): Observable<Materia[]>{
    return this.httpClient.get<Materia[]>(`${this.baseURL}/materias`);
}

agregarMateria(resultado: Materia): Observable<Materia>{
    return this.httpClient.post<Materia>(`${this.baseURL}/materias` ,{
        ...resultado,
        id: String(resultado.id),
        fechaCreacion: new Date().toISOString(),
    })
}

borrarMateria(id:number):Observable<Materia>{
    return this.httpClient.delete<Materia>(`${this.baseURL}/materias/${id}`)
}

actualizarMateria(id: number, materiaActualizado: Partial<Materia>):Observable<Materia> {
    return this.httpClient.put<Materia>(`${this.baseURL}/materias/${id}` ,{
        ...materiaActualizado,
        fechaCreacion: new Date().toISOString(),
        token: generadorToken(20),
    })  
}
}

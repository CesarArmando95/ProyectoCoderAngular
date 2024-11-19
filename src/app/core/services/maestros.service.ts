import { Injectable } from '@angular/core';
import { Maestro } from '../../modelos/maestro-model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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

agregarMaestro(resultado: Maestro): Observable<Maestro>{
    return this.httpClient.post<Maestro>(`${this.baseURL}/maestros` ,{
        ...resultado,
        id: String(resultado.id),
        fechaCreacion: new Date().toISOString(),
    })
}

borrarMaestro(id:number):Observable<Maestro>{
    return this.httpClient.delete<Maestro>(`${this.baseURL}/maestros/${id}`)
}

actualizarMaestro(id: number, maestroActualizado: Partial<Maestro>):Observable<Maestro> {
    return this.httpClient.put<Maestro>(`${this.baseURL}/maestros/${id}` ,{
        ...maestroActualizado,
        fechaCreacion: new Date().toISOString(),
    })   
}
}

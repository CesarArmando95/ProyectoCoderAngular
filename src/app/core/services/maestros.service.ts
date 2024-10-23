import { Injectable } from '@angular/core';
import { Maestro } from '../../modelos/maestro-model';
import { Observable } from 'rxjs';

let MAESTROS: Maestro[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 40,
    genero: 'Hombre',
    materia: "Calculo",
    fechaCreacion: new Date()
  },
  {
    id: 2,
    nombre: 'Lorena',
    apellido: 'Parra',
    edad: 35,
    genero: 'Mujer',
    materia: "Redes",
    fechaCreacion: new Date()
  }
]

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  constructor() { }

  obtenerMaestros(): Observable<Maestro[]>{
    return new Observable((observer) => {
        setInterval(() => {
            observer.next(MAESTROS);
            //observer.error('Error al cargar los maestros');
            observer.complete();              
        }, 1000)
    })
}

agregarMaestro(resultado: Maestro): Observable<Maestro[]>{
    MAESTROS = [...MAESTROS, resultado];
    return new Observable((observer) => {
        setInterval(() => {
            observer.next(MAESTROS);               
            //observer.error('Error al agregar alumno');
            observer.complete();
        }, 1000)
    })
}

borrarMaestro(id:number):Observable<Maestro[]>{
    MAESTROS = MAESTROS.filter((alumno) => alumno.id != id);
    return new Observable((observer) => {
        setInterval(() => {
            observer.next(MAESTROS);               
            //observer.error('Error al borrar alumno');
            observer.complete();
        }, 1000)
    })
}

actualizarMaestro(id: number, alumnoActualizado: Partial<Maestro>):Observable<Maestro[]> {
    MAESTROS = MAESTROS.map((alumno) => 
    alumno.id === id ? {...alumno, ...alumnoActualizado} : alumno
    );

    return new Observable((observer) => {
        setInterval(() => {
            observer.next(MAESTROS);
            //observer.error('Error al actualizar el alumnos');
            observer.complete();              
        }, 1000)
    })    
}
}

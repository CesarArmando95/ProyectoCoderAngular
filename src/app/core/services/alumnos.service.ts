import { Injectable } from "@angular/core";
import { Alumno } from '../../modelos/alumno-model'; 
import { Observable } from 'rxjs';

let ALUMNOS: Alumno[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Perez',
      edad: 20,
      genero: 'Hombre',
      creditos: 120,
      fechaCreacion: new Date()
    },
    {
      id: 2,
      nombre: 'Olga',
      apellido: 'Mari',
      edad: 22,
      genero: 'Mujer',
      creditos: 150,
      fechaCreacion: new Date()
    }
];

@Injectable({
    providedIn: 'root',
})

export class AlumnoService {
    constructor() {}

    obtenerAlumnos(): Observable<Alumno[]>{
        return new Observable((observer) => {
            setInterval(() => {
                observer.next(ALUMNOS);
                //observer.error('Error al cargar los alumnos');
                observer.complete();              
            })
        })
    }

    agregarAlumno(resultado: Alumno): Observable<Alumno[]>{
        ALUMNOS = [...ALUMNOS, resultado];
        return new Observable((observer) => {
            setInterval(() => {
                observer.next(ALUMNOS);               
                //observer.error('Error al agregar alumno');
                observer.complete();
            })
        })
    }

    borrarAlumno(id:number):Observable<Alumno[]>{
        ALUMNOS = ALUMNOS.filter((alumno) => alumno.id != id);
        return new Observable((observer) => {
            setInterval(() => {
                observer.next(ALUMNOS);               
                //observer.error('Error al borrar alumno');
                observer.complete();
            })
        })
    }

    actualizarAlumno(id: number, alumnoActualizado: Partial<Alumno>):Observable<Alumno[]> {
        ALUMNOS = ALUMNOS.map((alumno) => 
        alumno.id === id ? {...alumno, ...alumnoActualizado} : alumno
        );

        return new Observable((observer) => {
            setInterval(() => {
                observer.next(ALUMNOS);
                //observer.error('Error al actualizar el alumnos');
                observer.complete();              
            })
        })    
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../../modelos/materia-model';

let MATERIAS: Materia[] = [
  {
    id: 1,
    nombre: "Calculo",
    creditos: 75,
    fechaCreacion: new Date()
  },
  {
    id: 2,
    nombre: "Redes",
    creditos: 75,
    fechaCreacion: new Date()
  }
];

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor() { }

  obtenerMaterias(): Observable<Materia[]>{
    return new Observable((observer) => {
        setInterval(() => {
            observer.next(MATERIAS);
            //observer.error('Error al cargar los materias');
            observer.complete();              
        }, 1000)
    })
}

agregarMateria(resultado: Materia): Observable<Materia[]>{
    MATERIAS = [...MATERIAS, resultado];
    return new Observable((observer) => {
        setInterval(() => {
            observer.next(MATERIAS);               
            //observer.error('Error al agregar materia');
            observer.complete();
        }, 1000)
    })
}

borrarMateria(id:number):Observable<Materia[]>{
    MATERIAS = MATERIAS.filter((materia) => materia.id != id);
    return new Observable((observer) => {
        setInterval(() => {
            observer.next(MATERIAS);               
            //observer.error('Error al borrar materia');
            observer.complete();
        }, 1000)
    })
}

actualizarMateria(id: number, materiaActualizado: Partial<Materia>):Observable<Materia[]> {
    MATERIAS = MATERIAS.map((materia) => 
    materia.id === id ? {...materia, ...materiaActualizado} : materia
    );

    return new Observable((observer) => {
        setInterval(() => {
            observer.next(MATERIAS);
            //observer.error('Error al actualizar el materias');
            observer.complete();              
        }, 1000)
    })    
}
}

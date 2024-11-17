import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Alumno } from '../../../../modelos/alumno-model';

export const AlumnosActions = createActionGroup({
  source: 'Alumnos',
  events: {
    //consultar alumnos
    'Cargar alumnos': emptyProps(),
    'Cargar alumnos Exito': props<{data: Alumno[]}>(),
    'Cargar alumnos Error': props<{error: Error}>(),

    //crear alumno
    'Crear alumno': props<{alumnoNuevo: Alumno}>(),
    'Crear alumno Exito': props<{data: Alumno}>(),
    'Crear alumno Error': props<{error: Error}>(),

    //actulizar alumno
    'Actualizar alumno': props<{id:number; alumnoActualizado: Alumno}>(),
    'Actualizar alumno Exito': props<{data: Alumno}>(),
    'Actualizar alumno Error': props<{error: Error}>(),

    //borrar alumno
    'Borrar alumno': props<{id:number}>(),
    'Borrar alumno Exito': props<{data: Alumno}>(),
    'Borrar alumno Error': props<{error: Error}>(),
  }
});

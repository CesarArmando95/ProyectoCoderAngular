import { createActionGroup, emptyProps, props } from '@ngrx/store';
import * as modelo from '../../../../modelos'

export const InicioActions = createActionGroup({
  source: 'Inicio',
  events: {
    //consultar maestros
    'Cargar maestros': emptyProps(),
    'Cargar maestros Exito': props<{data: modelo.Maestro[]}>(),
    'Cargar maestros Error': props<{error: Error}>(),
    //materias
    'Cargar materias': emptyProps(),
    'Cargar materias Exito': props<{data: modelo.Materia[]}>(),
    'Cargar materias Error': props<{error: Error}>(),
    //alumnos
    'Cargar alumnos': emptyProps(),
    'Cargar alumnos Exito': props<{data: modelo.Alumno[]}>(),
    'Cargar alumnos Error': props<{error: Error}>(),
  }
});

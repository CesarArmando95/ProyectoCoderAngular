import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Materia, Maestro } from '../../../../modelos';

export const MateriasActions = createActionGroup({
  source: 'Materias',
  events: {
    'Load Materiass': emptyProps(),
    //consultar materias
    'Cargar materias': emptyProps(),
    'Cargar materias Exito': props<{data: Materia[]}>(),
    'Cargar materias Error': props<{error: Error}>(),

    //consultar maestros
    'Cargar maestros': emptyProps(),
    'Cargar maestros Exito': props<{data: Maestro[]}>(),
    'Cargar maestros Error': props<{error: Error}>(),

    //crear materia
    'Crear materia': props<{materiaNuevo: Materia}>(),
    'Crear materia Exito': props<{data: Materia}>(),
    'Crear materia Error': props<{error: Error}>(),

    //actulizar materia
    'Actualizar materia': props<{id:number; materiaActualizado: Materia}>(),
    'Actualizar materia Exito': props<{data: Materia}>(),
    'Actualizar materia Error': props<{error: Error}>(),

    //borrar materia
    'Borrar materia': props<{id:number}>(),
    'Borrar materia Exito': props<{data: Materia}>(),
    'Borrar materia Error': props<{error: Error}>(),
    
  }
});

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscripcion, Materia, Usuario, Alumno } from '../../../../modelos';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    //consultar Inscripciones
    'Cargar Inscripciones': emptyProps(),
    'Cargar Inscripciones Exito': props<{data: Inscripcion[]}>(),
    'Cargar Inscripciones Error': props<{error: Error}>(),

    //crear Inscripcion
    'Crear Inscripcion': props<{InscripcionNuevo: Inscripcion}>(),
    'Crear Inscripcion Exito': props<{data: Inscripcion}>(),
    'Crear Inscripcion Error': props<{error: Error}>(),

    //actulizar Inscripcion
    'Actualizar Inscripcion': props<{id:number; InscripcionActualizado: Inscripcion}>(),
    'Actualizar Inscripcion Exito': props<{data: Inscripcion}>(),
    'Actualizar Inscripcion Error': props<{error: Error}>(),

    //borrar Inscripcion
    'Borrar Inscripcion': props<{id:number}>(),
    'Borrar Inscripcion Exito': props<{data: Inscripcion}>(),
    'Borrar Inscripcion Error': props<{error: Error}>(),

    //consultar materias
    'Cargar materias': emptyProps(),
    'Cargar materias Exito': props<{data: Materia[]}>(),
    'Cargar materias Error': props<{error: Error}>(),

    //consultar alumnos
    'Cargar alumnos': emptyProps(),
    'Cargar alumnos Exito': props<{data: Alumno[]}>(),
    'Cargar alumnos Error': props<{error: Error}>(),
  }
});

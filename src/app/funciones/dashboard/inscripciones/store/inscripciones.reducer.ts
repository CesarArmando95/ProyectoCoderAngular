import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Alumno, Inscripcion, Materia, Usuario } from '../../../../modelos';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  cargando: boolean;
  cargandoMateria: boolean;
  cargandoAlumno: boolean;

  errorCosulta: Error | null;
  errorCosultaMateria: Error | null;
  errorCosultaAlumno: Error | null;

  incripciones: Inscripcion[];
  materias : Materia[];
  alumnos:Alumno[];

}

export const initialState: State = {
  cargando: false,
  cargandoMateria: false,
  cargandoAlumno: false,

  errorCosulta: null,
  errorCosultaMateria: null,
  errorCosultaAlumno: null,

  incripciones: [],
  materias : [],
  alumnos: []
};

export const reducer = createReducer(
  initialState,
  on(InscripcionesActions.crearInscripcion, (state) => {
    return {
      ...state,
      cargando: true
    };
  }),
  on(InscripcionesActions.actualizarInscripcion, (state) => {
    return {
      ...state,
      cargando: true
    };
  }),
  on(InscripcionesActions.cargarInscripciones, (state) => {
    return{
      ...state,
      cargando: true
    }
  }),
  on(InscripcionesActions.cargarInscripcionesExito, (state, action) => {
    return{
      ...state,
      inscripciones: action.data,
      errorCosulta: null,
      cargando: false
    }
  }),
  on(InscripcionesActions.cargarInscripcionesError, (state, action) => {
    return{
      ...state,
      ...initialState,
      errorCosulta: action.error,
      cargando: false
    }
  }),
  on(InscripcionesActions.cargarMaterias, (state) => {
    return{
      ...state,
      cargandoMateria: true
    }
  }),
  on(InscripcionesActions.cargarMateriasExito, (state, action) => {
    return{
      ...state,
      materias: action.data,
      errorCosultaMateria: null,
      cargandoMateria: false
    }
  }),
  on(InscripcionesActions.cargarMateriasError, (state, action) => {
    return{
      ...state,
      ...initialState,
      errorCosultaMateria: action.error,
      cargandoMateria: false
    }
  }),
  on(InscripcionesActions.cargarAlumnos, (state) => {
    return{
      ...state,
      cargandoAlumno: true
    }
  }),
  on(InscripcionesActions.cargarAlumnosExito, (state, action) => {
    return{
      ...state,
      alumnos: action.data,
      errorCosultaAlumno: null,
      cargandoAlumno: false
    }
  }),
  on(InscripcionesActions.cargarAlumnosError, (state, action) => {
    return{
      ...state,
      ...initialState,
      errorCosultaAlumno: action.error,
      cargandoAlumno: false
    }
  }),

);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});


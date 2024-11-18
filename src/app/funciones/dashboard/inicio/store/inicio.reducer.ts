import { createFeature, createReducer, on } from '@ngrx/store';
import { InicioActions } from './inicio.actions';
import * as modelo from '../../../../modelos'

export const inicioFeatureKey = 'inicio';

export interface State {
  cargandoMaterias: boolean;
  cargandoMaestros: boolean;
  cargandoAlumnos: boolean;

  errorCosultaMaterias: Error | null;
  errorCosultaMaestros: Error | null;
  errorCosultaAlumnos: Error | null;

  maestros : modelo.Maestro[];
  materias : modelo.Materia[];
  alumnos : modelo.Alumno[];
}

export const initialState: State = {
  cargandoMaterias: false,
  cargandoMaestros: false,
  cargandoAlumnos: false,

  errorCosultaMaterias: null,
  errorCosultaMaestros: null,
  errorCosultaAlumnos: null,

  maestros: [],
  materias: [],
  alumnos: []
};

export const reducer = createReducer(
  initialState,
  on(InicioActions.cargarMaestros, (state) => {
    return{
      ...state,
      cargandoMaestros: true
    }
  }),
  on(InicioActions.cargarMaestrosExito, (state, action) => {
    return{
      ...state,
      maestros: action.data,
      errorCosultaMaestros: null,
      cargandoMaestros: false
    }
  }),
  on(InicioActions.cargarMaestrosError, (state, action) => {
    return{
      ...state,
      ...initialState,
      errorCosultaMaestros: action.error,
      cargandoMaestros: false
    }
  }),
  on(InicioActions.cargarMaterias, (state) => {
    return{
      ...state,
      cargandoMaterias: true
    }
  }),
  on(InicioActions.cargarMateriasExito, (state, action) => {
    return{
      ...state,
      materias: action.data,
      errorCosultaMaterias: null,
      cargandoMaterias: false
    }
  }),
  on(InicioActions.cargarMateriasError, (state, action) => {
    return{
      ...state,
      ...initialState,
      errorCosultaMaterias: action.error,
      cargandoMaterias: false
    }
  }),
  on(InicioActions.cargarAlumnos, (state) => {
    return{
      ...state,
      cargandoAlumnos: true
    }
  }),
  on(InicioActions.cargarAlumnosExito, (state, action) => {
    return{
      ...state,
      alumnos: action.data,
      errorCosultaAlumnos: null,
      cargandoAlumnos: false
    }
  }),
  on(InicioActions.cargarAlumnosError, (state, action) => {
    return{
      ...state,
      ...initialState,
      errorCosultaAlumnos: action.error,
      cargandoAlumnos: false
    }
  }),

);

export const inicioFeature = createFeature({
  name: inicioFeatureKey,
  reducer,
});


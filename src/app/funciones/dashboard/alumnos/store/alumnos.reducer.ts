import { createFeature, createReducer, on } from '@ngrx/store';
import { AlumnosActions } from './alumnos.actions';
import { Alumno } from '../../../../modelos/alumno-model';

export const alumnosFeatureKey = 'alumnos';

export interface State {
  cargando: boolean;
  errorCosulta: Error | null;
  alumnos : Alumno[]
}

export const initialState: State = {
  cargando: false,
  errorCosulta: null,
  alumnos: []
};

export const reducer = createReducer(
  initialState,
  on(AlumnosActions.crearAlumno, (state) => {
    return {
      ...state,
      cargando: true
    };
  }),
  on(AlumnosActions.actualizarAlumno, (state) => {
    return {
      ...state,
      cargando: true
    };
  }),
  on(AlumnosActions.cargarAlumnos, (state) => {
    return{
      ...state,
      cargando: true
    }
  }),
  on(AlumnosActions.cargarAlumnosExito, (state, action) => {
    return{
      ...state,
      alumnos: action.data,
      errorCosulta: null,
      cargando: false
    }
  }),
  on(AlumnosActions.cargarAlumnosError, (state, action) => {
    return{
      ...state,
      ...initialState,
      errorCosulta: action.error,
      cargando: false
    }
  }),

);

export const alumnosFeature = createFeature({
  name: alumnosFeatureKey,
  reducer,
});


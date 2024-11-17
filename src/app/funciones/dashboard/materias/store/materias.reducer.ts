import { createFeature, createReducer, on } from '@ngrx/store';
import { MateriasActions } from './materias.actions';
import { Materia } from '../../../../modelos';

export const materiasFeatureKey = 'materias';

export interface State {
  cargando: boolean;
  errorCosulta: Error | null;
  materias : Materia[]
}

export const initialState: State = {
  cargando: false,
  errorCosulta: null,
  materias: []
};

export const reducer = createReducer(
  initialState,
  on(MateriasActions.crearMateria, (state) => {
    return {
      ...state,
      cargando: true
    };
  }),
  on(MateriasActions.actualizarMateria, (state) => {
    return {
      ...state,
      cargando: true
    };
  }),
  on(MateriasActions.cargarMaterias, (state) => {
    return{
      ...state,
      cargando: true
    }
  }),
  on(MateriasActions.cargarMateriasExito, (state, action) => {
    return{
      ...state,
      materias: action.data,
      errorCosulta: null,
      cargando: false
    }
  }),
  on(MateriasActions.cargarMateriasError, (state, action) => {
    return{
      ...state,
      ...initialState,
      errorCosulta: action.error,
      cargando: false
    }
  }),

);

export const materiasFeature = createFeature({
  name: materiasFeatureKey,
  reducer,
});


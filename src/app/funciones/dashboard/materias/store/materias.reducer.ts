import { createFeature, createReducer, on } from '@ngrx/store';
import { MateriasActions } from './materias.actions';
import { Materia, Maestro } from '../../../../modelos';

export const materiasFeatureKey = 'materias';

export interface State {
  cargando: boolean;
  cargandoMaestros: boolean;

  errorCosulta: Error | null;
  errorCosultaMaestros: Error | null;

  materias : Materia[]
  maestros : Maestro[];
}

export const initialState: State = {
  cargando: false,
  cargandoMaestros: false,

  errorCosulta: null,
  errorCosultaMaestros: null,

  materias: [],
  maestros: []
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
  on(MateriasActions.cargarMaestros, (state) => {
    return{
      ...state,
      cargandoMaestros: true
    }
  }),
  on(MateriasActions.cargarMaestrosExito, (state, action) => {
    return{
      ...state,
      maestros: action.data,
      errorCosultaMaestros: null,
      cargandoMaestros: false
    }
  }),
  on(MateriasActions.cargarMaestrosError, (state, action) => {
    return{
      ...state,
      ...initialState,
      errorCosultaMaestros: action.error,
      cargandoMaestros: false
    }
  }),

);

export const materiasFeature = createFeature({
  name: materiasFeatureKey,
  reducer,
});


import { createFeature, createReducer, on } from '@ngrx/store';
import { MaestrosActions } from './maestros.actions';
import { Maestro } from '../../../../modelos';

export const maestrosFeatureKey = 'maestros';

export interface State {
  cargando: boolean;
  errorCosulta: Error | null;
  maestros : Maestro[]
}

export const initialState: State = {
  cargando: false,
  errorCosulta: null,
  maestros: []
};

export const reducer = createReducer(
  initialState,
  on(MaestrosActions.crearMaestro, (state) => {
    return {
      ...state,
      cargando: true
    };
  }),
  on(MaestrosActions.actualizarMaestro, (state) => {
    return {
      ...state,
      cargando: true
    };
  }),
  on(MaestrosActions.cargarMaestros, (state) => {
    return{
      ...state,
      cargando: true
    }
  }),
  on(MaestrosActions.cargarMaestrosExito, (state, action) => {
    return{
      ...state,
      maestros: action.data,
      errorCosulta: null,
      cargando: false
    }
  }),
  on(MaestrosActions.cargarMaestrosError, (state, action) => {
    return{
      ...state,
      ...initialState,
      errorCosulta: action.error,
      cargando: false
    }
  }),

);

export const maestrosFeature = createFeature({
  name: maestrosFeatureKey,
  reducer,
});


import { createFeature, createReducer, on } from '@ngrx/store';
import { UsuariosActions } from './usuarios.actions';
import { Usuario } from '../../../../modelos';

export const usuariosFeatureKey = 'usuarios';

export interface State {
  cargando: boolean;
  errorCosulta: Error | null;
  usuarios : Usuario[]
}

export const initialState: State = {
  cargando: false,
  errorCosulta: null,
  usuarios: []
};

export const reducer = createReducer(
  initialState,
  on(UsuariosActions.crearUsuario, (state) => {
    return {
      ...state,
      cargando: true
    };
  }),
  on(UsuariosActions.actualizarUsuario, (state) => {
    return {
      ...state,
      cargando: true
    };
  }),
  on(UsuariosActions.cargarUsuarios, (state) => {
    return{
      ...state,
      cargando: true
    }
  }),
  on(UsuariosActions.cargarUsuariosExito, (state, action) => {
    return{
      ...state,
      usuarios: action.data,
      errorCosulta: null,
      cargando: false
    }
  }),
  on(UsuariosActions.cargarUsuariosError, (state, action) => {
    return{
      ...state,
      ...initialState,
      errorCosulta: action.error,
      cargando: false
    }
  }),
);

export const usuariosFeature = createFeature({
  name: usuariosFeatureKey,
  reducer,
});


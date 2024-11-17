import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../../../modelos/usuario-model';
import { AutenticacionActions } from '../acciones/autenticacion.actions';

export const authFeatureName = 'autenticacion';

export interface AuthState {
    authenticatedUser: Usuario | null;
}

const initialState: AuthState = {
    authenticatedUser: null,
};

export const authReducer = createReducer(
    initialState,
    on(AutenticacionActions.setAuthenticatedUser, (state, action) => {
      return {
        ...state,
        authenticatedUser: action.usuario,
      };
    }),
    on(AutenticacionActions.unsetAuthenticatedUser, (state) => {
      return {
        ...state,
        authenticatedUser: null,
      };
    })
  );
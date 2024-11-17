import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuarios from './usuarios.reducer';

export const selectUsuariosState = createFeatureSelector<fromUsuarios.State>(
  fromUsuarios.usuariosFeatureKey
);

export const selectUsuarios = createSelector(
  selectUsuariosState,
  (state) => state.usuarios
);

export const selectErrorUsuarios = createSelector(
  selectUsuariosState,
  (state) => state.errorCosulta
)

export const selectCargandoUsuarios = createSelector(
  selectUsuariosState,
  (state) => state.cargando
)

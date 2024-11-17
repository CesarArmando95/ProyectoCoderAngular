import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaestros from './maestros.reducer';

export const selectMaestrosState = createFeatureSelector<fromMaestros.State>(
  fromMaestros.maestrosFeatureKey
);

//alumnos
export const selectMaestros = createSelector(
  selectMaestrosState,
  (state) => state.maestros
);

export const selectErrorMaestros = createSelector(
  selectMaestrosState,
  (state) => state.errorCosulta
)

export const selectCargandoMaestros = createSelector(
  selectMaestrosState,
  (state) => state.cargando
)
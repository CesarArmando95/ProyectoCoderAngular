import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMaterias from './materias.reducer';

export const selectMateriasState = createFeatureSelector<fromMaterias.State>(
  fromMaterias.materiasFeatureKey
);

export const selectMaterias = createSelector(
  selectMateriasState,
  (state) => state.materias
);

export const selectErrorMaterias = createSelector(
  selectMateriasState,
  (state) => state.errorCosulta
)

export const selectCargandoMaterias = createSelector(
  selectMateriasState,
  (state) => state.cargando
)
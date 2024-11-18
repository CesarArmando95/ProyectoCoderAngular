import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInicio from './inicio.reducer';

export const selectInicioState = createFeatureSelector<fromInicio.State>(
  fromInicio.inicioFeatureKey
);

export const selectMaterias = createSelector(
  selectInicioState,
  (state) => state.materias
);

export const selectErrorMaterias = createSelector(
  selectInicioState,
  (state) => state.errorCosultaMaterias
)

export const selectCargandoMaterias = createSelector(
  selectInicioState,
  (state) => state.cargandoMaterias
)

export const selectMaestros = createSelector(
  selectInicioState,
  (state) => state.maestros
);

export const selectErrorMaestros = createSelector(
  selectInicioState,
  (state) => state.errorCosultaMaestros
)

export const selectCargandoMaestros= createSelector(
  selectInicioState,
  (state) => state.cargandoMaestros
)

export const selectAlumnos= createSelector(
  selectInicioState,
  (state) => state.alumnos
);

export const selectErrorAlumnos = createSelector(
  selectInicioState,
  (state) => state.errorCosultaAlumnos
)

export const selectCargandoAlumnos = createSelector(
  selectInicioState,
  (state) => state.cargandoAlumnos
)
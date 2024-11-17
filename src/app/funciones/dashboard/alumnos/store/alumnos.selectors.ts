import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlumnos from './alumnos.reducer';

export const selectAlumnosState = createFeatureSelector<fromAlumnos.State>(
  fromAlumnos.alumnosFeatureKey
);

//alumnos
export const selectAlumnos = createSelector(
  selectAlumnosState,
  (state) => state.alumnos
);

export const selectErrorAlumnos = createSelector(
  selectAlumnosState,
  (state) => state.errorCosulta
)

export const selectCargandoAlumnos = createSelector(
  selectAlumnosState,
  (state) => state.cargando
)

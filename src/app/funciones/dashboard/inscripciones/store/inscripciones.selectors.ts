import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripciones from './inscripciones.reducer';

export const selectInscripcionesState = createFeatureSelector<fromInscripciones.State>(
  fromInscripciones.inscripcionesFeatureKey
);

export const selectInscripciones = createSelector(
  selectInscripcionesState,
  (state) => state.incripciones
);

export const selectErrorInscripciones = createSelector(
  selectInscripcionesState,
  (state) => state.errorCosulta
)

export const selectCargandoInscripciones = createSelector(
  selectInscripcionesState,
  (state) => state.cargando
)

export const selectMaterias = createSelector(
  selectInscripcionesState,
  (state) => state.materias
);

export const selectErrorMaterias = createSelector(
  selectInscripcionesState,
  (state) => state.errorCosultaMateria
)

export const selectCargandoMaterias = createSelector(
  selectInscripcionesState,
  (state) => state.cargandoMateria
)

//alumnos
export const selectAlumnos = createSelector(
  selectInscripcionesState,
  (state) => state.alumnos
);

export const selectErrorAlumnos = createSelector(
  selectInscripcionesState,
  (state) => state.errorCosultaAlumno
)

export const selectCargandoAlumnos = createSelector(
  selectInscripcionesState,
  (state) => state.cargandoAlumno
)
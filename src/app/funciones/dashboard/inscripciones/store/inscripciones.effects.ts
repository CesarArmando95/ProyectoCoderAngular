import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of, pipe } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';

import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { MateriasService } from '../../../../core/services/materias.service';
import { AlumnoService } from '../../../../core/services/alumnos.service';

@Injectable()
export class InscripcionesEffects {
  cargarInscripciones$: Observable<any>;
  crearInscripcion$: Observable<any>;
  crearInscripcionExito$: Observable<any>;
  actualizarInscripcion$: Observable<any>;
  actualizarInscripcionExito$: Observable<any>;
  borrarInscripcion$: Observable<any>;
  borrarInscripcionExito$: Observable<any>;
  cargarMaterias$: Observable<any>;

  cargarAlumnos$: Observable<any>;

  constructor(
    private actions$: Actions, 
    private inscripcionesService: InscripcionesService, 
    private materiasService: MateriasService,
    private alumnosService: AlumnoService) {
    this.cargarInscripciones$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionesActions.cargarInscripciones),
        concatMap(() => 
          this.inscripcionesService.obtenerInscripciones().pipe(
            map((response) => InscripcionesActions.cargarInscripcionesExito({data: response})),
            catchError((error) => of(InscripcionesActions.cargarInscripcionesError({error})))
          )
        )
      )
    })

    this.crearInscripcion$ = createEffect (() => {
      return this.actions$.pipe(
        ofType(InscripcionesActions.crearInscripcion),
        concatMap((actions) =>
        this.inscripcionesService.agregarInscripciones(actions.InscripcionNuevo)
        .pipe(
          map((data) => InscripcionesActions.crearInscripcionExito({data})),
          catchError((error) => 
            of(InscripcionesActions.cargarInscripcionesError({error}))
        )
        )
        )
      )
    })

    this.crearInscripcionExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionesActions.crearInscripcion),
        map(() => InscripcionesActions.cargarInscripciones())
      )
    })

    this.actualizarInscripcion$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionesActions.actualizarInscripcion),
        concatMap((action) => 
          this.inscripcionesService.actualizarInscripciones(action.id, action.InscripcionActualizado)
          .pipe(
            map((data) => InscripcionesActions.actualizarInscripcionExito({data})),
            catchError((error) => 
              of(InscripcionesActions.actualizarInscripcionError(error)))
          )  
        )
      )
    })

    this.actualizarInscripcionExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionesActions.actualizarInscripcionExito),
        map(() => InscripcionesActions.cargarInscripciones())
      )
    })

    this.borrarInscripcion$ = createEffect (() => {
      return this.actions$.pipe(
        ofType(InscripcionesActions.borrarInscripcion),
        concatMap((actions) => 
        this.inscripcionesService.borrarInscripciones(actions.id)
        .pipe(
          map((data) => InscripcionesActions.borrarInscripcionExito({data})),
          catchError((error) => 
            of(InscripcionesActions.actualizarInscripcionError({error})))
        )
        )
      )
    })

    this.borrarInscripcionExito$ = createEffect (() => {
      return this.actions$.pipe(
        ofType(InscripcionesActions.borrarInscripcionExito),
        map(() => InscripcionesActions.cargarInscripciones())
      )
    })

    this.cargarMaterias$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionesActions.cargarMaterias),
        concatMap(() => 
          this.materiasService.obtenerMaterias().pipe(
            map((response) => InscripcionesActions.cargarMateriasExito({data: response})),
            catchError((error) => of(InscripcionesActions.cargarMateriasError({error})))
          )
        )
      )
    })

    this.cargarAlumnos$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionesActions.cargarAlumnos),
        concatMap(() => 
          this.alumnosService.obtenerAlumnos().pipe(
            map((response) => InscripcionesActions.cargarAlumnosExito({data: response})),
            catchError((error) => of(InscripcionesActions.cargarAlumnosError({error})))
          )
        )
      )
    })
  }
}
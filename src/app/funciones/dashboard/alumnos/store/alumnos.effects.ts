import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AlumnosActions } from './alumnos.actions';

import { AlumnoService } from '../../../../core/services/alumnos.service';

@Injectable()
export class AlumnosEffects {

  cargarAlumnos$: Observable<any>;
  crearAlumno$: Observable<any>;
  crearAlumnoExito$: Observable<any>;
  actualizarAlumno$: Observable<any>;
  actualizarAlumnoExito$: Observable<any>;
  borrarAlumno$: Observable<any>;
  borrarAlumnoExito$: Observable<any>;

  constructor(private actions$: Actions, private alumnosSevice: AlumnoService) {
    this.cargarAlumnos$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.cargarAlumnos),
        concatMap(() => 
          this.alumnosSevice.obtenerAlumnos().pipe(
            map((response) => AlumnosActions.cargarAlumnosExito({data: response})),
            catchError((error) => of(AlumnosActions.cargarAlumnosError({error})))
          )
        )
      )
    })

    this.crearAlumno$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.crearAlumno),
        concatMap((action) => 
          this.alumnosSevice.agregarAlumno(action.alumnoNuevo)
          .pipe(
            map((data) => AlumnosActions.crearAlumnoExito({data})),
            catchError((error) =>
              of(AlumnosActions.crearAlumnoError({error}))
            )
          )
        )
      )
    })

    this.crearAlumnoExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.crearAlumnoExito),
        map(() => AlumnosActions.cargarAlumnos())
      );
    });

    this.actualizarAlumno$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.actualizarAlumno),
        concatMap((action) => 
        this.alumnosSevice.actualizarAlumno(action.id, action.alumnoActualizado)
        .pipe(
          map((data) => AlumnosActions.actualizarAlumnoExito({data})),
          catchError((error) => 
            of(AlumnosActions.actualizarAlumnoError({error}))
          )
        )
      )
      )
    })

    this.actualizarAlumnoExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.actualizarAlumnoExito),
        map(() => AlumnosActions.cargarAlumnos())
      )
    })

    this.borrarAlumno$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.borrarAlumno),
        concatMap((action) => 
        this.alumnosSevice.borrarAlumno(action.id)
        .pipe(
          map((data) => AlumnosActions.borrarAlumnoExito({data})),
          catchError((error) => 
            of(AlumnosActions.actualizarAlumnoError({error}))
          )
        )
      )
      )
    })

    this.borrarAlumnoExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AlumnosActions.borrarAlumnoExito),
        map(() => AlumnosActions.cargarAlumnos())
      )
    })
  }
}

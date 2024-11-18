import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InicioActions } from './inicio.actions';

import { MaestrosService } from '../../../../core/services/maestros.service';
import { MateriasService } from '../../../../core/services/materias.service';
import { AlumnoService } from '../../../../core/services/alumnos.service';

@Injectable()
export class InicioEffects {
  cargarMaestros$: Observable<any>;
  cargarAlumnos$: Observable<any>;
  cargarMaterias$: Observable<any>;

  constructor(private actions$: Actions,
    private maestrosService: MaestrosService,
    private materiasService: MateriasService,
    private alumnosService: AlumnoService,

  ) {
    this.cargarMaestros$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InicioActions.cargarMaestros),
        concatMap(() => 
          this.maestrosService.obtenerMaestros().pipe(
            map((response) => InicioActions.cargarMaestrosExito({data: response})),
            catchError((error) => of(InicioActions.cargarMaestrosError({error})))
          )
        )
      )
    })

    this.cargarAlumnos$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InicioActions.cargarAlumnos),
        concatMap(() => 
          this.alumnosService.obtenerAlumnos().pipe(
            map((response) => InicioActions.cargarAlumnosExito({data: response})),
            catchError((error) => of(InicioActions.cargarAlumnosError({error})))
          )
        )
      )
    })

    this.cargarMaterias$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InicioActions.cargarMaterias),
        concatMap(() => 
          this.materiasService.obtenerMaterias().pipe(
            map((response) => InicioActions.cargarMateriasExito({data: response})),
            catchError((error) => of(InicioActions.cargarMateriasError({error})))
          )
        )
      )
    })
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { MateriasActions } from './materias.actions';

import { MateriasService } from '../../../../core/services/materias.service';

@Injectable()
export class MateriasEffects {

  cargarMaterias$: Observable<any>;
  crearMateria$: Observable<any>;
  crearMateriaExito$: Observable<any>;
  actualizarMateria$: Observable<any>;
  actualizarMateriaExito$: Observable<any>;
  borrarMateria$: Observable<any>;
  borrarMateriaExito$: Observable<any>;

  constructor(private actions$: Actions, private materiasService: MateriasService) {
    this.cargarMaterias$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MateriasActions.cargarMaterias),
        concatMap(() => 
          this.materiasService.obtenerMaterias().pipe(
            map((response) => MateriasActions.cargarMateriasExito({data: response})),
            catchError((error) => of(MateriasActions.cargarMateriasError({error})))
          )
        )
      )
    })

    this.crearMateria$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MateriasActions.crearMateria),
        concatMap((action) => 
          this.materiasService.agregarMateria(action.materiaNuevo)
          .pipe(
            map((data) => MateriasActions.crearMateriaExito({data})),
            catchError((error) =>
              of(MateriasActions.crearMateriaError({error}))
            )
          )
        )
      )
    })

    this.crearMateriaExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MateriasActions.crearMateriaExito),
        map(() => MateriasActions.cargarMaterias())
      );
    });

    this.actualizarMateria$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MateriasActions.actualizarMateria),
        concatMap((action) => 
        this.materiasService.actualizarMateria(action.id, action.materiaActualizado)
        .pipe(
          map((data) => MateriasActions.actualizarMateriaExito({data})),
          catchError((error) => 
            of(MateriasActions.actualizarMateriaError({error}))
          )
        )
      )
      )
    })

    this.actualizarMateriaExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MateriasActions.actualizarMateriaExito),
        map(() => MateriasActions.cargarMaterias())
      )
    })

    this.borrarMateria$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MateriasActions.borrarMateria),
        concatMap((action) => 
        this.materiasService.borrarMateria(action.id)
        .pipe(
          map((data) => MateriasActions.borrarMateriaExito({data})),
          catchError((error) => 
            of(MateriasActions.actualizarMateriaError({error}))
          )
        )
      )
      )
    })

    this.borrarMateriaExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MateriasActions.borrarMateriaExito),
        map(() => MateriasActions.cargarMaterias())
      )
    })
  }
}

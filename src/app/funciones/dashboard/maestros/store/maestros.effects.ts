import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { MaestrosActions } from './maestros.actions';

import { MaestrosService } from '../../../../core/services/maestros.service';

@Injectable()
export class MaestrosEffects {

  cargarMaestros$: Observable<any>;
  crearMaestro$: Observable<any>;
  crearMaestroExito$: Observable<any>;
  actualizarMaestro$: Observable<any>;
  actualizarMaestroExito$: Observable<any>;
  borrarMaestro$: Observable<any>;
  borrarMaestroExito$: Observable<any>;

  constructor(private actions$: Actions, private maestrosService: MaestrosService) {
    this.cargarMaestros$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MaestrosActions.cargarMaestros),
        concatMap(() => 
          this.maestrosService.obtenerMaestros().pipe(
            map((response) => MaestrosActions.cargarMaestrosExito({data: response})),
            catchError((error) => of(MaestrosActions.cargarMaestrosError({error})))
          )
        )
      )
    })

    this.crearMaestro$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MaestrosActions.crearMaestro),
        concatMap((action) => 
          this.maestrosService.agregarMaestro(action.maestroNuevo)
          .pipe(
            map((data) => MaestrosActions.crearMaestroExito({data})),
            catchError((error) =>
              of(MaestrosActions.crearMaestroError({error}))
            )
          )
        )
      )
    })

    this.crearMaestroExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MaestrosActions.crearMaestroExito),
        map(() => MaestrosActions.cargarMaestros())
      );
    });

    this.actualizarMaestro$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MaestrosActions.actualizarMaestro),
        concatMap((action) => 
        this.maestrosService.actualizarMaestro(action.id, action.maestroActualizado)
        .pipe(
          map((data) => MaestrosActions.actualizarMaestroExito({data})),
          catchError((error) => 
            of(MaestrosActions.actualizarMaestroError({error}))
          )
        )
      )
      )
    })

    this.actualizarMaestroExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MaestrosActions.actualizarMaestroExito),
        map(() => MaestrosActions.cargarMaestros())
      )
    })

    this.borrarMaestro$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MaestrosActions.borrarMaestro),
        concatMap((action) => 
        this.maestrosService.borrarMaestro(action.id)
        .pipe(
          map((data) => MaestrosActions.borrarMaestroExito({data})),
          catchError((error) => 
            of(MaestrosActions.actualizarMaestroError({error}))
          )
        )
      )
      )
    })

    this.borrarMaestroExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(MaestrosActions.borrarMaestroExito),
        map(() => MaestrosActions.cargarMaestros())
      )
    })
  }
}
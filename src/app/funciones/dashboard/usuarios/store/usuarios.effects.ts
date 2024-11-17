import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UsuariosActions } from './usuarios.actions';

import { UsuariosService } from '../../../../core/services/usuarios.service';

@Injectable()
export class UsuariosEffects {

  cargarUsuarios$: Observable<any>;
  crearUsuario$: Observable<any>;
  crearUsuarioExito$: Observable<any>;
  actualizarUsuario$: Observable<any>;
  actualizarUsuarioExito$: Observable<any>;
  borrarUsuario$: Observable<any>;
  borrarUsuarioExito$: Observable<any>;

  constructor(private actions$: Actions, private usuariosService: UsuariosService) {
    this.cargarUsuarios$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuariosActions.cargarUsuarios),
        concatMap(() => 
          this.usuariosService.obtenerUsuarios().pipe(
            map((response) => UsuariosActions.cargarUsuariosExito({data: response})),
            catchError((error) => of(UsuariosActions.cargarUsuariosError({error})))
          )
        )
      )
    })

    this.crearUsuario$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuariosActions.crearUsuario),
        concatMap((action) => 
          this.usuariosService.agregarUsuario(action.usuarioNuevo)
          .pipe(
            map((data) => UsuariosActions.crearUsuarioExito({data})),
            catchError((error) =>
              of(UsuariosActions.crearUsuarioError({error}))
            )
          )
        )
      )
    })

    this.crearUsuarioExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuariosActions.crearUsuarioExito),
        map(() => UsuariosActions.cargarUsuarios())
      );
    });

    this.actualizarUsuario$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuariosActions.actualizarUsuario),
        concatMap((action) => 
        this.usuariosService.actualizarUsuario(action.id, action.usuarioActualizado)
        .pipe(
          map((data) => UsuariosActions.actualizarUsuarioExito({data})),
          catchError((error) => 
            of(UsuariosActions.actualizarUsuarioError({error}))
          )
        )
      )
      )
    })

    this.actualizarUsuarioExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuariosActions.actualizarUsuarioExito),
        map(() => UsuariosActions.cargarUsuarios())
      )
    })

    this.borrarUsuario$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuariosActions.borrarUsuario),
        concatMap((action) => 
        this.usuariosService.borrarUsuario(action.id)
        .pipe(
          map((data) => UsuariosActions.borrarUsuarioExito({data})),
          catchError((error) => 
            of(UsuariosActions.actualizarUsuarioError({error}))
          )
        )
      )
      )
    })

    this.borrarUsuarioExito$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UsuariosActions.borrarUsuarioExito),
        map(() => UsuariosActions.cargarUsuarios())
      )
    })
  }
}

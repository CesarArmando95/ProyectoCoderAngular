import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Usuario } from '../../../../modelos';

export const UsuariosActions = createActionGroup({
  source: 'Usuarios',
  events: {
    //consultar usuarios
    'Cargar usuarios': emptyProps(),
    'Cargar usuarios Exito': props<{data: Usuario[]}>(),
    'Cargar usuarios Error': props<{error: Error}>(),

    //crear usuario
    'Crear usuario': props<{usuarioNuevo: Usuario}>(),
    'Crear usuario Exito': props<{data: Usuario}>(),
    'Crear usuario Error': props<{error: Error}>(),

    //actulizar usuario
    'Actualizar usuario': props<{id:number; usuarioActualizado: Usuario}>(),
    'Actualizar usuario Exito': props<{data: Usuario}>(),
    'Actualizar usuario Error': props<{error: Error}>(),

    //borrar usuario
    'Borrar usuario': props<{id:number}>(),
    'Borrar usuario Exito': props<{data: Usuario}>(),
    'Borrar usuario Error': props<{error: Error}>(),
  }
});

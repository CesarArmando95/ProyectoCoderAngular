import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Maestro } from '../../../../modelos';

export const MaestrosActions = createActionGroup({
  source: 'Maestros',
  events: {
    //consultar maestros
    'Cargar maestros': emptyProps(),
    'Cargar maestros Exito': props<{data: Maestro[]}>(),
    'Cargar maestros Error': props<{error: Error}>(),

    //crear maestro
    'Crear maestro': props<{maestroNuevo: Maestro}>(),
    'Crear maestro Exito': props<{data: Maestro}>(),
    'Crear maestro Error': props<{error: Error}>(),

    //actulizar maestro
    'Actualizar maestro': props<{id:number; maestroActualizado: Maestro}>(),
    'Actualizar maestro Exito': props<{data: Maestro}>(),
    'Actualizar maestro Error': props<{error: Error}>(),

    //borrar maestro
    'Borrar maestro': props<{id:number}>(),
    'Borrar maestro Exito': props<{data: Maestro}>(),
    'Borrar maestro Error': props<{error: Error}>(),
  }
});

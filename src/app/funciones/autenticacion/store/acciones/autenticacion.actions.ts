import {createActionGroup, emptyProps, props,} from '@ngrx/store';
import { Usuario } from '../../../../modelos/usuario-model';

export const AutenticacionActions = createActionGroup({
    source : 'Auth',
    events: {
        'Set Authenticated User': props<{ usuario: Usuario }>(),
        'Unset Authenticated User': emptyProps(),
    }
})
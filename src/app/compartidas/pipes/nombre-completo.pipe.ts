import { Pipe, PipeTransform } from '@angular/core';

import {Alumno} from '../../modelos/alumno-model'

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: Alumno): string {
    return `${value.nombre} ${value.apellido}`;
  }

}

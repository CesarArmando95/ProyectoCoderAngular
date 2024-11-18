import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarArreglo'
})
export class FiltrarArregloPipe implements PipeTransform {
  transform(value: any[] | null, filter: number): any[] {
    if (!value) return [];
    if (!filter) return value;
    return value.filter(item => item.id === filter);
  }
}
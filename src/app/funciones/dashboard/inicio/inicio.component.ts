import { Component } from '@angular/core';
import * as modelo from '../../../modelos';
import { Store } from '@ngrx/store';
import { InicioActions } from './store/inicio.actions';
import * as selectores from './store/inicio.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  dataMaestros$: Observable<modelo.Maestro[]>;
  dataMaterias$: Observable<modelo.Materia[]>;
  dataAlumnos$: Observable<modelo.Alumno[]>;

  errorCargaMaestros$: Observable<Error | null>;
  errorCargaMaterias$: Observable<Error | null>;
  errorCargaAlumnos$: Observable<Error | null>;

  estaCargandoMaestros$: Observable<boolean>;
  estaCargandoMaterias$: Observable<boolean>;
  estaCargandoAlumnos$: Observable<boolean>;

  constructor(
    private store : Store
  ){
    this.dataMaestros$ = this.store.select(selectores.selectMaestros);
    this.dataMaterias$ = this.store.select(selectores.selectMaterias);
    this.dataAlumnos$ = this.store.select(selectores.selectAlumnos);

    this.errorCargaMaestros$ = this.store.select(selectores.selectErrorMaestros);
    this.errorCargaMaterias$ = this.store.select(selectores.selectErrorMaterias);
    this.errorCargaAlumnos$ = this.store.select(selectores.selectErrorAlumnos);

    this.estaCargandoMaestros$ = this.store.select(selectores.selectCargandoMaestros);
    this.estaCargandoMaterias$ = this.store.select(selectores.selectCargandoMaterias);
    this.estaCargandoAlumnos$ = this.store.select(selectores.selectCargandoAlumnos);
  }

  ngOnInit(): void {
    this.store.dispatch(InicioActions.cargarMaestros());
    this.store.dispatch(InicioActions.cargarMaterias());
    this.store.dispatch(InicioActions.cargarAlumnos());
  }
}

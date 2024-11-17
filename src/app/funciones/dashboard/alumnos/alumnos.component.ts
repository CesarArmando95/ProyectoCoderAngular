import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../../modelos/alumno-model';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { Store } from '@ngrx/store';
import { AlumnosActions } from './store/alumnos.actions';
import { selectAlumnos, selectErrorAlumnos, selectCargandoAlumnos } from './store/alumnos.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'edad', 'genero', 'creditos', 'fecha', 'acciones'];
  dataSource$: Observable<Alumno[]>;
  errorCarga$: Observable<Error | null>;
  estaCargando$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private store: Store
  ){
    this.dataSource$ = this.store.select(selectAlumnos);
    this.errorCarga$= this.store.select(selectErrorAlumnos);
    this.estaCargando$ = this.store.select(selectCargandoAlumnos);
  }

  ngOnInit(): void {
    this.store.dispatch(AlumnosActions.cargarAlumnos());
  }

  agregarAlumno(resultado: Alumno):void{
    this.store.dispatch(AlumnosActions.crearAlumno({alumnoNuevo: resultado}));
  }

  actualizarAlumno(id: number, alumnoActualizado: Alumno): void{
    this.store.dispatch(AlumnosActions.actualizarAlumno({id:id, alumnoActualizado:alumnoActualizado}))
  }
  
  borrarAlumno(id: number) {
    if(confirm('Esta seguro de eliminar este alumno')){
      this.store.dispatch(AlumnosActions.borrarAlumno({id:id}))
    }   
  }

  openModal(editarAlumno?: Alumno): void {
    const tamano = Math.floor(Math.random() * 1000);
    this.matDialog
      .open(AlumnosDialogComponent, {
        data: {
          editarAlumno,
          tamano,
        },
      })
      .afterClosed()
      .subscribe({
        next: (resultado) => {
          if (!!resultado) {
            if (editarAlumno) {
              this.actualizarAlumno(editarAlumno.id, resultado);
            } else {
              this.agregarAlumno(resultado);
            }
          }
        },
      });
  }

}
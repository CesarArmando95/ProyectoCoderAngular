import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Materia } from '../../../modelos/materia-model';
import { MateriasDialogComponent } from './materias-dialog/materias-dialog.component';
import { Store } from '@ngrx/store';
import { MateriasActions } from './store/materias.actions';
import { selectMaterias, selectErrorMaterias, selectCargandoMaterias} from './store/materias.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.scss'
})
export class MateriasComponent {
  displayedColumns: string[] = ['id', 'nombre', 'creditos', 'fecha', 'acciones'];
  dataSource$: Observable<Materia[]>;
  errorCarga$: Observable<Error | null>;
  estaCargando$: Observable<boolean>;
  
  constructor(
    private matDialog: MatDialog,
    private store: Store
  ){
    this.dataSource$ = this.store.select(selectMaterias);
    this.errorCarga$= this.store.select(selectErrorMaterias);
    this.estaCargando$ = this.store.select(selectCargandoMaterias);
  }

  ngOnInit(): void {
    this.store.dispatch(MateriasActions.cargarMaterias());
  }

  agregarMateria(resultado: Materia):void{
    this.store.dispatch(MateriasActions.crearMateria({materiaNuevo: resultado}));
  }

  actualizarMateria(id: number, materiaActualizado: Materia): void{
    this.store.dispatch(MateriasActions.actualizarMateria({id:id, materiaActualizado:materiaActualizado}))
  }
  
  borrarMateria(id: number) {
    if(confirm('Esta seguro de eliminar este materia')){
      this.store.dispatch(MateriasActions.borrarMateria({id:id}))
    } 
  }

  openModal(editarMateria?: Materia): void {
    const tamano = Math.floor(Math.random() * 1000);
    this.matDialog
      .open(MateriasDialogComponent, {
        data: {
          editarMateria,
          tamano,
        },
      })
      .afterClosed()
      .subscribe({
        next: (resultado) => {
          if (!!resultado) {
            if (editarMateria) {
              this.actualizarMateria(editarMateria.id, resultado);
            } else {
              this.agregarMateria(resultado);
            }
          }
        },
      });
  }

}
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Materia, Maestro, Usuario } from '../../../modelos';
import { MateriasDialogComponent } from './materias-dialog/materias-dialog.component';
import { Store } from '@ngrx/store';
import { MateriasActions } from './store/materias.actions';
import * as selectores from './store/materias.selectors';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../../core/services/autenticacion.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.scss'
})
export class MateriasComponent {
  displayedColumns: string[] = ['id', 'nombre', 'creditos', 'maestroId', 'fecha', 'acciones'];
  dataSource$: Observable<Materia[]>;
  errorCarga$: Observable<Error | null>;
  estaCargando$: Observable<boolean>;
  usuarioLogeado$ : Observable<Usuario | null>;
  rol: string | undefined;

  dataMaestros$: Observable<Maestro[]>;
  errorCargaMaestros$: Observable<Error | null>;
  estaCargandoMaestros$: Observable<boolean>;
  
  constructor(
    private matDialog: MatDialog,
    private store: Store,
    private autenticacionService: AutenticacionService
  ){
    this.dataSource$ = this.store.select(selectores.selectMaterias);
    this.errorCarga$= this.store.select(selectores.selectErrorMaterias);
    this.estaCargando$ = this.store.select(selectores.selectCargandoMaterias);
    
    this.dataMaestros$ = this.store.select(selectores.selectMaestros);
    this.errorCargaMaestros$ = this.store.select(selectores.selectErrorMaestros);
    this.estaCargandoMaestros$ = this.store.select(selectores.selectCargandoMaestros);

    this.rol = "";
    this.usuarioLogeado$ = this.autenticacionService.authUser$;
    this.usuarioLogeado$.subscribe((respuesta) => this.rol = respuesta?.rol)
  }

  private maestrosDialog: Maestro[] = []

  ngOnInit(): void {
    this.store.dispatch(MateriasActions.cargarMaterias());
    this.store.dispatch(MateriasActions.cargarMaestros());
    this.dataMaestros$.subscribe(valor => {
      this.maestrosDialog=valor
    })
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
    const maestro = this.maestrosDialog
    this.matDialog
      .open(MateriasDialogComponent, {
        data: {
          editarMateria,
          tamano,
          maestro,
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

  nombreMaestro(id:number): string{
    const maestro = this.maestrosDialog.filter(m => m.id === id)[0];
    return `${maestro.nombre} ${maestro.apellido}`
  }

}
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

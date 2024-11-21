import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Maestro, Usuario } from '../../../modelos';
import { MaestrosDialogComponent } from './maestros-dialog/maestros-dialog.component';
import { Store } from '@ngrx/store';
import { MaestrosActions } from './store/maestros.actions';
import { selectMaestros, selectErrorMaestros, selectCargandoMaestros } from './store/maestros.selectors';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../../core/services/autenticacion.service';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrl: './maestros.component.scss'
})
export class MaestrosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'edad', 'genero', 'fecha', 'acciones'];
  dataSource$: Observable<Maestro[]>;
  errorCarga$: Observable<Error | null>;
  estaCargando$: Observable<boolean>;
  usuarioLogeado$ : Observable<Usuario | null>;
  rol: string | undefined;
  
  estaCargando = false;

  constructor(
    private matDialog: MatDialog,
    private store : Store,
    private autenticacionService: AutenticacionService
  ){
    this.dataSource$ = this.store.select(selectMaestros);
    this.errorCarga$ = this.store.select(selectErrorMaestros);
    this.estaCargando$ = this.store.select(selectCargandoMaestros);
    this.rol = "";
    this.usuarioLogeado$ = this.autenticacionService.authUser$;
    this.usuarioLogeado$.subscribe((respuesta) => this.rol = respuesta?.rol)
  }

  ngOnInit(): void {
    this.store.dispatch(MaestrosActions.cargarMaestros());
  }

  agregarMaestro(resultado: Maestro):void{
    this.store.dispatch(MaestrosActions.crearMaestro({maestroNuevo: resultado}));
  }

  actualizarMaestro(id: number, maestroActualizado: Maestro): void{
    this.store.dispatch(MaestrosActions.actualizarMaestro({id:id, maestroActualizado:maestroActualizado}));
  }
  
  borrarMaestro(id: number) {
    if (confirm('Esta seguro de eliminar este maestros')) {
      this.store.dispatch(MaestrosActions.borrarMaestro({id:id}));
    }
  }

  openModal(editarMaestro?: Maestro): void {
    const tamano = Math.floor(Math.random() * 1000);
    this.matDialog
      .open(MaestrosDialogComponent, {
        data: {
          editarMaestro,
          tamano,
        },
      })
      .afterClosed()
      .subscribe({
        next: (resultado) => {
          if (!!resultado) {
            if (editarMaestro) {
              this.actualizarMaestro(editarMaestro.id, resultado);
            } else {
              this.agregarMaestro(resultado);
            }
          }
        },
      });
  }

}
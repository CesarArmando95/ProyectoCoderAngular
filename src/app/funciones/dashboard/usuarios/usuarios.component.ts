import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../modelos/usuario-model';
import { UsuariosDialogComponent } from './usuarios-dialog/usuarios-dialog.component';
import { Store } from '@ngrx/store';
import { UsuariosActions } from './store/usuarios.actions';
import { selectUsuarios, selectErrorUsuarios, selectCargandoUsuarios } from './store/usuarios.selectors';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../../core/services/autenticacion.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  displayedColumns: string[] = ['id', 'correo', 'nombre', 'telefono', 'direccion', 'fecha', 'rol', 'acciones'];
  dataSource$: Observable<Usuario[]>;
  errorCarga$: Observable<Error | null>;
  estaCargando$: Observable<boolean>;
  usuarioLogeado$ : Observable<Usuario | null>;
  rol: string | undefined;

  constructor(
    private matDialog: MatDialog,
    private store: Store,
    private autenticacionService: AutenticacionService
  ){
    this.dataSource$ = this.store.select(selectUsuarios);
    this.errorCarga$= this.store.select(selectErrorUsuarios);
    this.estaCargando$ = this.store.select(selectCargandoUsuarios);
    this.rol = "";
    this.usuarioLogeado$ = this.autenticacionService.authUser$;
    this.usuarioLogeado$.subscribe((respuesta) => this.rol = respuesta?.rol)
  }

  ngOnInit(): void {
    this.store.dispatch(UsuariosActions.cargarUsuarios());
  }

  agregarUsuario(resultado: Usuario):void{
    this.store.dispatch(UsuariosActions.crearUsuario({usuarioNuevo: resultado}));
  }

  actualizarUsuario(id: number, usuarioActualizado: Usuario): void{
    this.store.dispatch(UsuariosActions.actualizarUsuario({id:id, usuarioActualizado: usuarioActualizado}))
  }
  
  borrarUsuario(id: number) {
    if(confirm('Esta seguro de eliminar este usuario')){
      this.store.dispatch(UsuariosActions.borrarUsuario({id:id}))
    } 
  }

  openModal(editarUsuario?: Usuario): void {
    const tamano = Math.floor(Math.random() * 1000);
    const correo = editarUsuario?.correo;
    const contrasena = editarUsuario?.contrasena;
    this.matDialog
      .open(UsuariosDialogComponent, {
        data: {
          editarUsuario,
          tamano,
          correo,
          contrasena
        },
      })
      .afterClosed()
      .subscribe({
        next: (resultado) => {
          if (!!resultado) {
            if (editarUsuario) {
              this.actualizarUsuario(editarUsuario.id, resultado);
            } else {
              this.agregarUsuario(resultado);
            }
          }
        },
      });
  }
}


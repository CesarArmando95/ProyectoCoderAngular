import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../modelos/usuario-model';
import { UsuariosDialogComponent } from './usuarios-dialog/usuarios-dialog.component';
import { UsuariosService } from '../../../core/services/usuarios.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  displayedColumns: string[] = ['id', 'correo', 'fecha', 'contrasena', 'acciones'];
  dataSource: Usuario[] = [];

  estaCargando = false;

  constructor(
    private matDialog: MatDialog,
    private usuariosServicio: UsuariosService
  ){}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.estaCargando = true;
    this.usuariosServicio.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.dataSource = usuarios;
      },
      error: (error) => {
        console.error(error);
        this.estaCargando = false;
      },
      complete: () => {
        console.log("Usuarios cargados");
        this.estaCargando = false;
      }
    })
  }

  agregarUsuario(resultado: Usuario):void{
    let cargarUsuarios:boolean = false;
    this.usuariosServicio.agregarUsuario(resultado).subscribe({
      next: (usuarios) => {
        cargarUsuarios= usuarios;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Usuario agregado");
        if(cargarUsuarios)
          this.cargarUsuarios();
      }
    })
  }

  actualizarUsuario(id: number, UsuarioActualizado: Usuario): void{
    let cargarUsuarios:boolean = false;
    this.usuariosServicio.actualizarUsuario(id, UsuarioActualizado).subscribe({
      next: (usuarios) => {
        cargarUsuarios= usuarios;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Usuario actualizado");
        if(cargarUsuarios)
          this.cargarUsuarios();
      }
    })
  }
  
  borrarUsuario(id: number) {
    if (confirm('Esta seguro?')) {
      let cargarUsuarios:boolean = false;
      this.usuariosServicio.borrarUsuario(id).subscribe({
        next: (usuarios) => {
          cargarUsuarios= usuarios;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Usuario borrado");
          if(cargarUsuarios)
            this.cargarUsuarios();
        }
      })
    }
  }

  openModal(editarUsuario?: Usuario): void {
    const tamano = (this.dataSource.length + 1);
    this.matDialog
      .open(UsuariosDialogComponent, {
        data: {
          editarUsuario,
          tamano,
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


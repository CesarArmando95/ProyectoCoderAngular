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
    this.estaCargando = true;
    this.usuariosServicio.agregarUsuario(resultado).subscribe({
      next: (usuarios) => {
        this.dataSource = usuarios;
      },
      error: (error) => {
        console.error(error);
        this.estaCargando = false;
      },
      complete: () => {
        console.log("Usuario agregado");
        this.estaCargando = false;
      }
    })
  }

  actualizarUsuario(id: number, UsuarioActualizado: Usuario): void{
    this.estaCargando = true;
    this.usuariosServicio.actualizarUsuario(id, UsuarioActualizado).subscribe({
      next: (usuarios) => {
        this.dataSource = usuarios;
      },
      error: (error) => {
        console.error(error);
        this.estaCargando = false;
      },
      complete: () => {
        console.log("Usuario actualizado");
        this.estaCargando = false;
      }
    })
  }
  
  borrarUsuario(id: number) {
    if (confirm('Esta seguro?')) {
      this.estaCargando = true;
      this.usuariosServicio.borrarUsuario(id).subscribe({
        next: (usuarios) => {
          this.dataSource = usuarios;
        },
        error: (error) => {
          console.error(error);
          this.estaCargando = false;
        },
        complete: () => {
          console.log("Usuario borrado");
          this.estaCargando = false;
        }
      })
    }
  }

  openModal(editarUsuario?: Usuario): void {
    const tamano = obtenerMaximoId(this.dataSource);
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

//función para evitar repitir id cuando se crea un nuevo usuario
function obtenerMaximoId(usuarios: Usuario[]): number{
  if (usuarios.length === 0) {
    return 0;
  }

  return usuarios.reduce((max, usuario) => {
    return usuario.id > max ? usuario.id : max;
  }, usuarios[0].id); // Inicializa el máximo con el primer id
}


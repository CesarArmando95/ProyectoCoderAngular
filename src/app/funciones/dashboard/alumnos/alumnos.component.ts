import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../../modelos/alumno-model';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { AlumnoService } from '../../../core/services/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'edad', 'genero', 'creditos', 'fecha', 'acciones'];
  dataSource: Alumno[] = [];
  
  constructor(
    private matDialog: MatDialog,
    private alumnosServicio: AlumnoService
  ){}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void{
    this.alumnosServicio.obtenerAlumnos().subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Alumnos cargados");
      }
    })
  }

  agregarAlumno(resultado: Alumno):void{
    this.alumnosServicio.agregarAlumno(resultado).subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Alumno agregado");
      }
    })
  }

  actualizarAlumno(id: number, alumnoActualizado: Alumno): void{
    this.alumnosServicio.actualizarAlumno(id, alumnoActualizado).subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Alumno actualizado");
      }
    })
  }
  
  borrarAlumno(id: number) {
    if (confirm('Esta seguro?')) {
      this.alumnosServicio.borrarAlumno(id).subscribe({
        next: (alumnos) => {
          this.dataSource = alumnos;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Alumno borrado");
        }
      })
    }
  }

  openModal(editarAlumno?: Alumno): void {
    const tamano = obtenerMaximoId(this.dataSource);
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
              //this.dataSource = this.dataSource.map((alumno) =>
                //alumno.id === editarAlumno.id ? { ...alumno, ...resultado } : alumno
              //);
              this.actualizarAlumno(editarAlumno.id, resultado);
            } else {
              this.agregarAlumno(resultado);
            }
          }
        },
      });
  }

}


//función para evitar repitir id cuando se crea un nuevo alumno
function obtenerMaximoId(alumnos: Alumno[]): number{
  if (alumnos.length === 0) {
    return 0;
  }

  return alumnos.reduce((max, alumno) => {
    return alumno.id > max ? alumno.id : max;
  }, alumnos[0].id); // Inicializa el máximo con el primer id
}

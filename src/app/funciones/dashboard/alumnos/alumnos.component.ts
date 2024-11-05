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
  
  estaCargando = false;

  constructor(
    private matDialog: MatDialog,
    private alumnosServicio: AlumnoService
  ){}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void{
    this.estaCargando = true;
    this.alumnosServicio.obtenerAlumnos().subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos;
      },
      error: (error) => {
        console.error(error);
        this.estaCargando = false;
      },
      complete: () => {
        console.log("Alumnos cargados");
        this.estaCargando = false;
      }
    })
  }

  agregarAlumno(resultado: Alumno):void{
    let cargarAlumnos:boolean = false;
    this.alumnosServicio.agregarAlumno(resultado).subscribe({
      next: (alumnos) => {
        cargarAlumnos = alumnos;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Alumno agregado");
        if(cargarAlumnos)
          this.cargarAlumnos();
      }
    })
  }

  actualizarAlumno(id: number, alumnoActualizado: Alumno): void{
    let cargarAlumnos:boolean = false;
    this.alumnosServicio.actualizarAlumno(id, alumnoActualizado).subscribe({
      next: (alumnos) => {
        cargarAlumnos= alumnos;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Alumno actualizado");
        if(cargarAlumnos)
          this.cargarAlumnos();
      }
    })
  }
  
  borrarAlumno(id: number) {
    if (confirm('Esta seguro?')) {
      let cargarAlumnos:boolean = false;
      this.alumnosServicio.borrarAlumno(id).subscribe({
        next: (alumnos) => {
          cargarAlumnos = alumnos;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Alumno borrado");
          if(cargarAlumnos)
            this.cargarAlumnos();
        }
      })
    }
  }

  openModal(editarAlumno?: Alumno): void {
    const tamano = (this.dataSource.length + 1);
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
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../../modelos/alumno-model';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';

const ELEMENTOS: Alumno[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Perez',
    fechaCreacion: new Date()
  },
  {
    id: 2,
    nombre: 'Olga',
    apellido: 'Mari',
    fechaCreacion: new Date()
  }
]

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'fecha', 'acciones'];
  dataSource = ELEMENTOS;
  
  constructor(private matDialog: MatDialog){}

  borrarAlumno(id: number) {
    if (confirm('Esta seguro?')) {
      this.dataSource = this.dataSource.filter((alumno) => alumno.id !== id);
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
              this.dataSource = this.dataSource.map((alumno) =>
                alumno.id === editarAlumno.id ? { ...alumno, ...resultado } : alumno
              );
            } else {
              this.dataSource = [...this.dataSource, resultado];
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

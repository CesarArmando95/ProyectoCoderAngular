import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Materia } from '../../../modelos/materia-model';
import { MateriasDialogComponent } from './materias-dialog/materias-dialog.component';
import { MateriasService } from '../../../core/services/materias.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.scss'
})
export class MateriasComponent {
  displayedColumns: string[] = ['id', 'nombre', 'creditos', 'fecha', 'acciones'];
  dataSource: Materia[] = [];
  
  estaCargando = false;

  constructor(
    private matDialog: MatDialog,
    private materiasServicio: MateriasService
  ){}

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias(): void{
    this.estaCargando = true;
    this.materiasServicio.obtenerMaterias().subscribe({
      next: (materias) => {
        this.dataSource = materias;
      },
      error: (error) => {
        console.error(error);
        this.estaCargando = false;
      },
      complete: () => {
        console.log("Materias cargados");
        this.estaCargando = false;
      }
    })
  }

  agregarMateria(resultado: Materia):void{
    this.estaCargando = true;
    this.materiasServicio.agregarMateria(resultado).subscribe({
      next: (materias) => {
        this.dataSource = materias;
      },
      error: (error) => {
        console.error(error);
        this.estaCargando = false;
      },
      complete: () => {
        console.log("Materia agregado");
        this.estaCargando = false;
      }
    })
  }

  actualizarMateria(id: number, materiaActualizado: Materia): void{
    this.estaCargando = true;
    this.materiasServicio.actualizarMateria(id, materiaActualizado).subscribe({
      next: (materias) => {
        this.dataSource = materias;
      },
      error: (error) => {
        console.error(error);
        this.estaCargando = false;
      },
      complete: () => {
        console.log("Materia actualizado");
        this.estaCargando = false;
      }
    })
  }
  
  borrarMateria(id: number) {
    if (confirm('Esta seguro?')) {
      this.estaCargando = true;
      this.materiasServicio.borrarMateria(id).subscribe({
        next: (materias) => {
          this.dataSource = materias;
        },
        error: (error) => {
          console.error(error);
          this.estaCargando = false;
        },
        complete: () => {
          console.log("Materia borrado");
          this.estaCargando = false;
        }
      })
    }
  }

  openModal(editarMateria?: Materia): void {
    const tamano = obtenerMaximoId(this.dataSource);
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


//función para evitar repitir id cuando se crea un nuevo materia
function obtenerMaximoId(materias: Materia[]): number{
  if (materias.length === 0) {
    return 0;
  }

  return materias.reduce((max, materia) => {
    return materia.id > max ? materia.id : max;
  }, materias[0].id); // Inicializa el máximo con el primer id
}

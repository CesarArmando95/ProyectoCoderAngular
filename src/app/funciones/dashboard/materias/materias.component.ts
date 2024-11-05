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
    let cargarMaterias:boolean = false;
    this.materiasServicio.agregarMateria(resultado).subscribe({
      next: (materias) => {
        cargarMaterias = materias;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Materia agregado");
        if(cargarMaterias)
          this.cargarMaterias();
      }
    })
  }

  actualizarMateria(id: number, materiaActualizado: Materia): void{
    let cargarMaterias:boolean = false;
    this.materiasServicio.actualizarMateria(id, materiaActualizado).subscribe({
      next: (materias) => {
        cargarMaterias = materias;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Materia actualizado");
        if(cargarMaterias)
          this.cargarMaterias();
      }
    })
  }
  
  borrarMateria(id: number) {
    if (confirm('Esta seguro?')) {
      let cargarMaterias:boolean = false;
      this.materiasServicio.borrarMateria(id).subscribe({
        next: (materias) => {
          cargarMaterias = materias;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Materia borrado");
          if(cargarMaterias)
            this.cargarMaterias();
        }
      })
    }
  }

  openModal(editarMateria?: Materia): void {
    const tamano = (this.dataSource.length + 1);
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
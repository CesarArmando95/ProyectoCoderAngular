import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Maestro } from '../../../modelos/maestro-model';
import { MaestrosDialogComponent } from './maestros-dialog/maestros-dialog.component';
import { MaestrosService } from '../../../core/services/maestros.service';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrl: './maestros.component.scss'
})
export class MaestrosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'edad', 'genero', 'materia', 'fecha', 'acciones'];
  dataSource: Maestro[] = [];
  
  estaCargando = false;

  constructor(
    private matDialog: MatDialog,
    private maestrosServicio: MaestrosService
  ){}

  ngOnInit(): void {
    this.cargarMaestros();
  }

  cargarMaestros(): void{
    this.estaCargando = true;
    this.maestrosServicio.obtenerMaestros().subscribe({
      next: (maestros) => {
        this.dataSource = maestros;
      },
      error: (error) => {
        console.error(error);
        this.estaCargando = false;
      },
      complete: () => {
        console.log("Maestros cargados");
        this.estaCargando = false;
      }
    })
  }

  agregarMaestro(resultado: Maestro):void{
    let cargarMaestros:boolean = false;
    this.maestrosServicio.agregarMaestro(resultado).subscribe({
      next: (maestros) => {
        cargarMaestros= maestros;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Maestro agregado");
        if(cargarMaestros)
          this.cargarMaestros();
      }
    })
  }

  actualizarMaestro(id: number, maestroActualizado: Maestro): void{
    let cargarMaestros:boolean = false;
    this.maestrosServicio.actualizarMaestro(id, maestroActualizado).subscribe({
      next: (maestros) => {
        cargarMaestros= maestros;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Maestro actualizado");
        if(cargarMaestros)
          this.cargarMaestros();
      }
    })
  }
  
  borrarMaestro(id: number) {
    if (confirm('Esta seguro?')) {
      let cargarMaestros:boolean = false;
      this.maestrosServicio.borrarMaestro(id).subscribe({
        next: (maestros) => {
          cargarMaestros= maestros;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Maestro borrado");
          if(cargarMaestros)
            this.cargarMaestros();
        }
      })
    }
  }

  openModal(editarMaestro?: Maestro): void {
    const tamano = (this.dataSource.length + 1);
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
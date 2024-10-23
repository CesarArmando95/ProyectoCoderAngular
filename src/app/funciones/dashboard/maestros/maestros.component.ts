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
    this.estaCargando = true;
    this.maestrosServicio.agregarMaestro(resultado).subscribe({
      next: (maestros) => {
        this.dataSource = maestros;
      },
      error: (error) => {
        console.error(error);
        this.estaCargando = false;
      },
      complete: () => {
        console.log("Maestro agregado");
        this.estaCargando = false;
      }
    })
  }

  actualizarMaestro(id: number, maestroActualizado: Maestro): void{
    this.estaCargando = true;
    this.maestrosServicio.actualizarMaestro(id, maestroActualizado).subscribe({
      next: (maestros) => {
        this.dataSource = maestros;
      },
      error: (error) => {
        console.error(error);
        this.estaCargando = false;
      },
      complete: () => {
        console.log("Maestro actualizado");
        this.estaCargando = false;
      }
    })
  }
  
  borrarMaestro(id: number) {
    if (confirm('Esta seguro?')) {
      this.estaCargando = true;
      this.maestrosServicio.borrarMaestro(id).subscribe({
        next: (maestros) => {
          this.dataSource = maestros;
        },
        error: (error) => {
          console.error(error);
          this.estaCargando = false;
        },
        complete: () => {
          console.log("Maestro borrado");
          this.estaCargando = false;
        }
      })
    }
  }

  openModal(editarMaestro?: Maestro): void {
    const tamano = obtenerMaximoId(this.dataSource);
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


//función para evitar repitir id cuando se crea un nuevo maestro
function obtenerMaximoId(maestros: Maestro[]): number{
  if (maestros.length === 0) {
    return 0;
  }

  return maestros.reduce((max, maestro) => {
    return maestro.id > max ? maestro.id : max;
  }, maestros[0].id); // Inicializa el máximo con el primer id
}


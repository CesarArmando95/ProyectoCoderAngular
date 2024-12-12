import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Inscripcion, Materia, Usuario, Alumno } from '../../../modelos';
import { InscripcionesDialogComponent } from './inscripciones-dialog/inscripciones-dialog.component';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from './store/inscripciones.actions';
import * as selectores from './store/inscripciones.selectors';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../../core/services/autenticacion.service';
import { InscripcionesService } from '../../../core/services/inscripciones.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent {
  displayedColumns: string[] = ['id', 'alumno', 'materia', 'usuario', 'fecha', 'acciones'];
  dataSource$: Observable<Inscripcion[]>;
  errorCarga$: Observable<Error | null>;
  estaCargando$: Observable<boolean>;
  usuarioLogeado$ : Observable<Usuario | null>;
  rol: string | undefined;
  usuarioNombre: string | undefined;
  usuarioId: number | undefined;

  dataMaterias$: Observable<Materia[]>;
  errorCargarMaterias$: Observable<Error | null>;
  estaCargandoMaterias$: Observable<boolean>;

  dataAlumnos$: Observable<Alumno[]>;
  errorCargarAlumnos$: Observable<Error | null>;
  estaCargandoAlumnos$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private store: Store,
    private autenticacionService: AutenticacionService,
    private inscripcionService: InscripcionesService
  ){
    this.dataSource$ = this.inscripcionService.obtenerInscripciones();
    this.errorCarga$ = this.store.select(selectores.selectErrorInscripciones);
    this.estaCargando$ = this.store.select(selectores.selectCargandoInscripciones);

    this.dataMaterias$ = this.store.select(selectores.selectMaterias);
    this.errorCargarMaterias$ = this.store.select(selectores.selectErrorMaterias);
    this.estaCargandoMaterias$ = this.store.select(selectores.selectCargandoMaterias);

    this.dataAlumnos$ = this.store.select(selectores.selectAlumnos);
    this.errorCargarAlumnos$ = this.store.select(selectores.selectErrorAlumnos);
    this.estaCargandoAlumnos$ = this.store.select(selectores.selectCargandoAlumnos);

    this.rol = "";
    this.usuarioLogeado$ = this.autenticacionService.authUser$;
    this.usuarioLogeado$.subscribe((respuesta) => {
      this.rol = respuesta?.rol;
      this.usuarioNombre = respuesta?.nombre;
      this.usuarioId = respuesta?.id;
    });
  }

  private materiasDialog: Materia[] = [];
  private alumnosDialog: Alumno[] = [];

  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.cargarInscripciones());
    this.store.dispatch(InscripcionesActions.cargarMaterias());
    this.store.dispatch(InscripcionesActions.cargarAlumnos());
    this.dataAlumnos$.subscribe(valor => {
      this.alumnosDialog=valor
    })
    this.dataMaterias$.subscribe(valor => {
      this.materiasDialog=valor
    });
  }

  agregarInscripcion(resultado: Inscripcion):void{
    this.store.dispatch(InscripcionesActions.crearInscripcion({InscripcionNuevo: resultado}));
  }

  actualizarInscripcion(id: number, inscripcionActualizado: Inscripcion): void{
    this.store.dispatch(InscripcionesActions.actualizarInscripcion({id:id, InscripcionActualizado:inscripcionActualizado}))
  }
  
  borrarInscripcion(id: number) {
    if(confirm('Esta seguro de eliminar esta Inscripcion')){
      this.store.dispatch(InscripcionesActions.borrarInscripcion({id:id}))
    } 
  }

  openModal(editarInscripcion?: Inscripcion): void {
    const tamano = Math.floor(Math.random() * 1000);
    const materia = this.materiasDialog;
    const alumnos = this.alumnosDialog;
    const usuarioNombre = this.usuarioNombre
    const usuarioId = this.usuarioId
    console.log(this.usuarioNombre)
    this.matDialog
      .open(InscripcionesDialogComponent, {
        data: {
          editarInscripcion,
          tamano,
          materia,
          alumnos,
          usuarioNombre,
          usuarioId
        },
      })
      .afterClosed()
      .subscribe({
        next: (resultado) => {
          if (!!resultado) {
            if (editarInscripcion) {
              this.actualizarInscripcion(editarInscripcion.id, resultado);
            } else {
              this.agregarInscripcion(resultado);
            }
          }
        },
      });
  }

  nombreMaterias(id:number): string{
    const materia = this.materiasDialog.filter(m => m.id === id)[0];
    return `${materia.nombre}`
  }

  nombreAlumno(id:number): string{
    const alumno = this.alumnosDialog.filter(m => m.id === id)[0];
    return `${alumno.nombre} ${alumno.apellido}`
  }
}
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}
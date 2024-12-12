import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripcion, Alumno, Materia } from '../../../../modelos';

@Component({
  selector: 'app-inscripciones-dialog',
  templateUrl: './inscripciones-dialog.component.html',
  styleUrl: './inscripciones-dialog.component.scss'
})
export class InscripcionesDialogComponent {
  inscripcionFormulario: FormGroup;
  tamano?: number;
  alumno?: Alumno[];
  materia?: Materia[];
  usuarioNombre?: string;
  usuarioId?: string;
  constructor (
    private matDialogRef: MatDialogRef<InscripcionesDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ){
    this.tamano = data.tamano;
    this.alumno = data.alumnos;
    this.materia = data.materia;
    this.usuarioNombre = data.usuarioNombre;
    this.usuarioId = data.usuarioId;
    this.inscripcionFormulario = this.formBuilder.group({
      alumnoId: [null, [Validators.required]],
      materiaId: [null, [Validators.required]]
    })
    this.patchFormValue();
    console.log("--> " + this.usuarioNombre)
  }

  patchFormValue() {
    if (this.data?.editarInscripcion) {
      this.inscripcionFormulario.patchValue(this.data.editarInscripcion);
    }
  }

  onSave(): void {
    if(!this.tamano) this.tamano = 0;
    if (this.inscripcionFormulario.invalid) {
      this.inscripcionFormulario.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.inscripcionFormulario.value,
        id: this.esEditado
          ? this.data!.editarInscripcion!.id
          : (this.tamano),
        fechaInscripciones: this.esEditado
          ? this.data!.editarInscripcion!.fechaInscripciones
          : new Date(),
        usuarioNombre: this.usuarioNombre,
        usuarioId: this.usuarioId
      });
    }
  }

  private get esEditado() {
    return !!this.data?.editarInscripcion;
  }
}

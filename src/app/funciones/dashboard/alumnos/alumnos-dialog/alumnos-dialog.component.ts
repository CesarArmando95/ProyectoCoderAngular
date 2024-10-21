import { Component, Inject } from '@angular/core';
import { Alumno } from '../../../../modelos/alumno-model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface AlumnoDialogDatos{
  editarAlumno?: Alumno;
}

@Component({
  selector: 'app-alumnos-dialog',
  templateUrl: './alumnos-dialog.component.html',
})
export class AlumnosDialogComponent {
  alumnoFormulario: FormGroup;
  tamano?: number;
  constructor(
    private matDialogRef: MatDialogRef<AlumnosDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.tamano = data.tamano;
    this.alumnoFormulario = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      edad: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      creditos: [null, [Validators.required]]
    });
    this.patchFormValue();
  }

  patchFormValue() {
    if (this.data?.editarAlumno) {
      this.alumnoFormulario.patchValue(this.data.editarAlumno);
    }
  }

  onSave(): void {
    if(!this.tamano) this.tamano = 0;
    if (this.alumnoFormulario.invalid) {
      this.alumnoFormulario.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.alumnoFormulario.value,
        id: this.esEditado
          ? this.data!.editarAlumno!.id
          : (this.tamano + 1),
        fechaCreacion: this.esEditado
          ? this.data!.editarAlumno!.fechaCreacion
          : new Date(),
      });
    }
  }

  private get esEditado() {
    return !!this.data?.editarAlumno;
  }

}

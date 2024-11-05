import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


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
      nombre: [null, [Validators.required, Validators.maxLength(30)]],
      apellido: [null, [Validators.required, Validators.maxLength(30)]],
      edad: [null, [Validators.required, this.edadValidator]],
      genero: [null, [Validators.required]],
      creditos: [null, [Validators.required, this.creditosValidator]]
    });
    this.patchFormValue();
  }

  edadValidator(control: AbstractControl): ValidationErrors | null {
    return (control.value< 18 || control.value > 90) ? { 'edadInvalida': true } : null;
  }

  creditosValidator(control: AbstractControl): ValidationErrors | null {
    return (control.value<0 || control.value > 2000) ? {'creditosInvalidos': true } : null;
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
          : (this.tamano),
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

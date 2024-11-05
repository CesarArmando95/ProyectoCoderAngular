import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-materias-dialog',
  templateUrl: './materias-dialog.component.html',
})
export class MateriasDialogComponent {
  materiaFormulario: FormGroup;
  tamano?: number;
  constructor(
    private matDialogRef: MatDialogRef<MateriasDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.tamano = data.tamano;
    this.materiaFormulario = this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.maxLength(30)]],
      creditos: [null, [Validators.required, this.creditosValidator]]
    });
    this.patchFormValue();
  }

  creditosValidator(control: AbstractControl): ValidationErrors | null {
    return (control.value<25 || control.value > 100) ? {'creditosInvalidos': true } : null;
  }

  patchFormValue() {
    if (this.data?.editarMateria) {
      this.materiaFormulario.patchValue(this.data.editarMateria);
    }
  }

  onSave(): void {
    if(!this.tamano) this.tamano = 0;
    if (this.materiaFormulario.invalid) {
      this.materiaFormulario.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.materiaFormulario.value,
        id: this.esEditado
          ? this.data!.editarMateria!.id
          : (this.tamano),
        fechaCreacion: this.esEditado
          ? this.data!.editarMateria!.fechaCreacion
          : new Date(),
      });
    }
  }

  private get esEditado() {
    return !!this.data?.editarMateria;
  }

}


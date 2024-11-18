import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-maestros-dialog',
  templateUrl: './maestros-dialog.component.html',
  styles: ``
})
export class MaestrosDialogComponent {
  maestroFormulario: FormGroup;
  tamano?: number;
  constructor(
    private matDialogRef: MatDialogRef<MaestrosDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.tamano = data.tamano;
    this.maestroFormulario = this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.maxLength(30)]],
      apellido: [null, [Validators.required, Validators.maxLength(30)]],
      edad: [null, [Validators.required, this.edadValidator]],
      genero: [null, [Validators.required]]
    });
    this.patchFormValue();
  }

  edadValidator(control: AbstractControl): ValidationErrors | null {
    return (control.value< 18 || control.value > 90) ? { 'edadInvalida': true } : null;
  }

  patchFormValue() {
    if (this.data?.editarMaestro) {
      this.maestroFormulario.patchValue(this.data.editarMaestro);
    }
  }

  onSave(): void {
    if(!this.tamano) this.tamano = 0;
    if (this.maestroFormulario.invalid) {
      this.maestroFormulario.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.maestroFormulario.value,
        id: this.esEditado
          ? this.data!.editarMaestro!.id
          : (this.tamano),
        fechaCreacion: this.esEditado
          ? this.data!.editarMaestro!.fechaCreacion
          : new Date(),
      });
    }
  }

  private get esEditado() {
    return !!this.data?.editarMaestro;
  }
}

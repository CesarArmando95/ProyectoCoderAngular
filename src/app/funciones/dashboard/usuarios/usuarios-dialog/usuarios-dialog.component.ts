import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-usuarios-dialog',
  templateUrl: './usuarios-dialog.component.html',
})
export class UsuariosDialogComponent {
  usuarioFormulario: FormGroup;
  tamano?: number;
  correo?: string;
  contrasena?: string;
  constructor(
    private matDialogRef: MatDialogRef<UsuariosDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.tamano = data.tamano;
    this.correo = data.correo;
    this.contrasena = data.contrasena;
    this.usuarioFormulario = this.formBuilder.group({
      rol: [null, [Validators.required]],
      contrasena: [null, [Validators.required, Validators.maxLength(30)]],
      nombre: [null, [Validators.required, Validators.maxLength(15)]],
      direccion: [null, [Validators.required, Validators.maxLength(50)]],
      telefono: [null, [Validators.required, Validators.maxLength(10)]]
    });
    this.patchFormValue();
  }

  patchFormValue() {
    if (this.data?.editarUsuario) {
      this.usuarioFormulario.patchValue(this.data.editarUsuario);
    }
  }

  onSave(): void {
    if(!this.tamano) 
      this.tamano = 0;
    if (this.usuarioFormulario.invalid) {
      this.usuarioFormulario.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.usuarioFormulario.value,
        id: this.esEditado
          ? this.data!.editarUsuario!.id
          : (this.tamano),
        fechaCreacion: this.esEditado
          ? this.data!.editarUsuario!.fechaCreacion
          : new Date(),
        correo: this.correo,
        contrasena: this.contrasena  
      });
    }
  }

  private get esEditado() {
    return !!this.data?.editarUsuario;
  }
}

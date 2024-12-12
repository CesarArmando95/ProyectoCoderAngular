import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, nameValidator } from '../../../compartidas/validaciones/validacionesUsuario'
import { UsuariosService } from '../../../core/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  contrasenaInputType: 'password' | 'text' = 'password';
  messageCreated: string;
  formulario: FormGroup;
  redireccionar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router
  ){
    this.formulario = formBuilder.group({
      nombre: [null, [Validators.required ,nameValidator]],
      direccion : [null,[Validators.required, Validators.minLength(3)]],
      telefono : [null,[Validators.required, Validators.minLength(6)]],
      correo: [null, [Validators.required, emailValidator]],
      contrasena: [null, [Validators.required, Validators.minLength(6)]]
    });
    this.messageCreated = "";
  }

  get nombreControl(){
    return this.formulario.get('nombre');
  }

  get direccionControl(){
    return this.formulario.get('direccion');
  }

  get telefonoControl(){
    return this.formulario.get('telefono');
  }

  get correoControl(){
    return this.formulario.get('correo');
  }

  get contrasenaControl(){
    return this.formulario.get('contrasena');
  }

  togglePasswordInputType(): void {
    if (this.contrasenaInputType === 'password') {
      this.contrasenaInputType = 'text';
    } else {
      this.contrasenaInputType = 'password';
    }
  }

  onSubmit(): void{
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
    }else{
      this.usuarioService.agregarUsuario({
        ...this.formulario.value,
        id: Math.floor(Math.random() * 1000),
      }).subscribe({
        next: (result) => {
          this.messageCreated = "Usuario creado con éxito";
          this.redireccionar = true;
          setTimeout(() => {
            this.router.navigate(['login'])
          }, 2000)
        }
      })
    }
  }
}

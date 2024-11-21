import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../../core/services/autenticacion.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  passwordInputType: 'contrasena' | 'text' = 'contrasena';

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacionService : AutenticacionService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('token'))
      localStorage.removeItem('token');
  }

  togglePasswordInputType(): void {
    if (this.passwordInputType === 'contrasena') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'contrasena';
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      // login
      this.autenticacionService.login(this.loginForm.value).subscribe({
        next: (result) => {
          this.router.navigate(['dashboard', 'inicio']);
        },
        error: (err) => {
          console.error(err);
          if (err instanceof Error) {
            alert(err.message);
          }

          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              alert('No se pudo conectar con el servidor');
            }
          }
        },
      });
    }
  }
}

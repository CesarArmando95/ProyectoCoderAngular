import { TestBed } from '@angular/core/testing';
import { AutenticacionService } from './autenticacion.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Autenticacion } from '../../modelos/autenticacion-model';
import { Usuario } from '../../modelos/usuario-model';
import { MockProvider } from 'ng-mocks';
import { NavigationExtras, Router } from '@angular/router';

const mockUser: Usuario = {
  id: 1,
  correo: 'mockusuario@mail.com',
  contrasena: '123456',
  fechaCreacion: new Date(),
  token: 'FJDSFNSDvmfSKDdmsddaamds',
};
const mockAuthData: Autenticacion = {
  correo: 'mockusuario@mail.com',
  contrasena: '123456',
};

fdescribe('AutenticacionService', () => {
  let service: AutenticacionService;
  let httpContoller: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AutenticacionService,
        MockProvider(Router, {
          navigate: (commands: any[], extras?: NavigationExtras) => {
            return new Promise((res) => res(true));
          },
        }),
      ],
    });

    httpContoller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AutenticacionService);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('El servicio debe ser definido', () => {
    expect(service).toBeTruthy();
  });

  it('Debe realizarse el login debe establecer el token en localStorage', (done) => {
    service.login(mockAuthData).subscribe({
      next: (usuario) => {
        expect(usuario).toEqual(mockUser);
        expect(localStorage.getItem('token')).toEqual(mockUser.token);
        done();
      },
    });
    const mockReq = httpContoller.expectOne({
      url: `${service['baseURL']}/usuarios?correo=${mockAuthData.correo}&contrasena=${mockAuthData.contrasena}`,
      method: 'GET',
    });
    mockReq.flush([mockUser]);
  });

  it('Debe retornar un error al realizar un login invalido', (done) => {
    service.login(mockAuthData).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err['message']).toBe('Los datos son invalidos');
        done();
      },
    });

    const mockReq = httpContoller.expectOne({
      url: `${service['baseURL']}/usuarios?correo=${mockAuthData.correo}&contrasena=${mockAuthData.contrasena}`,
      method: 'GET',
    });
    // mockReq.flush([], { status: 401, statusText: 'Unauthorized' });
    mockReq.flush([]);
  });

  it('Logout debe remover el token de localstorage, debe desestablecer el usuario autenticado y debe redirigir a /autenticacion/login', (done) => {
    const spyOnNavigate = spyOn(router, 'navigate');

    service.login(mockAuthData).subscribe();
    const mockReq = httpContoller.expectOne({
      url: `${service['baseURL']}/usuarios?correo=${mockAuthData.correo}&contrasena=${mockAuthData.contrasena}`,
      method: 'GET',
    });
    mockReq.flush([mockUser]);

    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    service.authUser$.subscribe({
      next: (usuario) => {
        expect(usuario).toBeNull();
        done();
      },
    });

    expect(spyOnNavigate).toHaveBeenCalledOnceWith(['auth', 'login']);
  });
});
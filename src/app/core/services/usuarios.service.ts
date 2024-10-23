import { Injectable } from "@angular/core";
import { Usuario } from '../../modelos/usuario-model'; 
import { Observable } from 'rxjs';

let USUARIOS: Usuario [] =[
    {
        id: 1,
        correo: "jose@lua.com",
        fechaCreacion: new Date(),
        contrasena: "123456"
    },
    {
        id: 2,
        correo: "maria@lua.com",
        fechaCreacion: new Date(),
        contrasena: "654321"
    },
    {
        id: 3,
        correo: "karla@lua.com",
        fechaCreacion: new Date(),
        contrasena: "963852"
    }
];

@Injectable({
    providedIn: 'root',
})

export class UsuariosService{
    constructor(){}

    obtenerUsuarios(): Observable<Usuario[]>{
        return new Observable((observer) => {
            setInterval(() => {
                observer.next(USUARIOS);
                //observer.error('Error al cargar los USUARIOS');
                observer.complete();              
            }, 1000)
        })
    }

    agregarUsuario(resultado: Usuario): Observable<Usuario[]>{
        USUARIOS = [...USUARIOS, resultado];
        return new Observable((observer) => {
            setInterval(() => {
                observer.next(USUARIOS);               
                //observer.error('Error al agregar Usuario');
                observer.complete();
            }, 1000)
        })
    }

    borrarUsuario(id:number):Observable<Usuario[]>{
        USUARIOS = USUARIOS.filter((Usuario) => Usuario.id != id);
        return new Observable((observer) => {
            setInterval(() => {
                observer.next(USUARIOS);               
                //observer.error('Error al borrar Usuario');
                observer.complete();
            }, 1000)
        })
    }

    actualizarUsuario(id: number, UsuarioActualizado: Partial<Usuario>):Observable<Usuario[]> {
        USUARIOS = USUARIOS.map((Usuario) => 
        Usuario.id === id ? {...Usuario, ...UsuarioActualizado} : Usuario
        );

        return new Observable((observer) => {
            setInterval(() => {
                observer.next(USUARIOS);
                //observer.error('Error al actualizar el USUARIOS');
                observer.complete();              
            }, 1000)
        })    
    }
}

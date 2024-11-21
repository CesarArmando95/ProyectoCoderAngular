export interface Usuario{
    id: number,
    correo: string,
    fechaCreacion: Date,
    contrasena: string,
    token: string,
    rol: string,
    nombre: string,
    direccion: string,
    telefono: string
}
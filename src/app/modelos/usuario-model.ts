export interface Usuario{
    id: number,
    correo: string,
    fechaCreacion: Date,
    contrasena: string,
    token: string,
    rol: string
}
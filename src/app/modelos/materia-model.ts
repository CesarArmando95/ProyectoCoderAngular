import { Maestro } from './maestro-model';
export interface Materia {
    id: number,
    nombre: string,
    creditos: number,
    maestroId: number,
    descripcion: string,
    fechaCreacion: Date,
}
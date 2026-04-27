import { Note } from './note.entity';
export declare class Usuario {
    id: string;
    email: string;
    password: string;
    nombre: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    notes: Note[];
}

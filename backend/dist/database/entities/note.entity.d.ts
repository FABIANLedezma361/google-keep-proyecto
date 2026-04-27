import { Usuario } from './usuario.entity';
import { NoteShare } from './noteshare.entity';
export declare class Note {
    id: string;
    titulo: string;
    contenido: string;
    tipo: string;
    etiquetas: string;
    checklist: any;
    recordatorio: Date;
    archivada: boolean;
    createdAt: Date;
    updatedAt: Date;
    usuario: Usuario;
    usuarioId: string;
    shares: NoteShare[];
}

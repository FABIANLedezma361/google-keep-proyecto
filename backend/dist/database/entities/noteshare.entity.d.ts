import { Note } from './note.entity';
import { Usuario } from './usuario.entity';
export declare enum SharePermission {
    READ = "READ",
    WRITE = "WRITE"
}
export declare class NoteShare {
    id: string;
    note: Note;
    noteId: string;
    sharedWith: Usuario;
    sharedWithId: string;
    permission: SharePermission;
    sharedAt: Date;
}

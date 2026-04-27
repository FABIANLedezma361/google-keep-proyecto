import { Repository } from 'typeorm';
import { NoteShare } from '../../database/entities/noteshare.entity';
import { Note } from '../../database/entities/note.entity';
import { Usuario } from '../../database/entities/usuario.entity';
import { SharePermission } from '../../database/entities/noteshare.entity';
export interface ShareNoteDto {
    noteId: string;
    userEmail: string;
    permission: SharePermission;
}
export declare class NoteshareService {
    private noteShareRepository;
    private noteRepository;
    private usuarioRepository;
    constructor(noteShareRepository: Repository<NoteShare>, noteRepository: Repository<Note>, usuarioRepository: Repository<Usuario>);
    shareNote(usuarioId: string, shareNoteDto: ShareNoteDto): Promise<NoteShare>;
    getSharedWithMe(usuarioId: string): Promise<NoteShare[]>;
    getSharedByMe(usuarioId: string): Promise<NoteShare[]>;
    updatePermission(shareId: string, usuarioId: string, permission: SharePermission): Promise<NoteShare>;
    unshareNote(shareId: string, usuarioId: string): Promise<void>;
    remove(shareId: string): Promise<void>;
}

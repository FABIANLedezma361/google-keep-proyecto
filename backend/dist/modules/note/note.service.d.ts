import { Repository } from 'typeorm';
import { Note } from '../../database/entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NoteService {
    private noteRepository;
    constructor(noteRepository: Repository<Note>);
    create(usuarioId: string, createNoteDto: CreateNoteDto): Promise<Note>;
    findAll(usuarioId: string): Promise<Note[]>;
    findArchived(usuarioId: string): Promise<Note[]>;
    findOne(id: string, usuarioId: string): Promise<Note>;
    update(id: string, usuarioId: string, updateNoteDto: UpdateNoteDto): Promise<Note>;
    archive(id: string, usuarioId: string): Promise<Note>;
    unarchive(id: string, usuarioId: string): Promise<Note>;
    remove(id: string, usuarioId: string): Promise<void>;
}

import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    create(req: any, createNoteDto: CreateNoteDto): Promise<import("../../database/entities/note.entity").Note>;
    findAll(req: any): string;
    findArchived(req: any): Promise<import("../../database/entities/note.entity").Note[]>;
    findOne(id: string, req: any): Promise<import("../../database/entities/note.entity").Note>;
    update(id: string, req: any, updateNoteDto: UpdateNoteDto): Promise<import("../../database/entities/note.entity").Note>;
    archive(id: string, req: any): Promise<import("../../database/entities/note.entity").Note>;
    unarchive(id: string, req: any): Promise<import("../../database/entities/note.entity").Note>;
    remove(id: string, req: any): Promise<void>;
}

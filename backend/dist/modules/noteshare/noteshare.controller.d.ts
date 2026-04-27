import { NoteshareService } from './noteshare.service';
import { ShareNoteDto } from './noteshare.service';
import { SharePermission } from '../../database/entities/noteshare.entity';
export declare class NoteshareController {
    private readonly noteshareService;
    constructor(noteshareService: NoteshareService);
    share(req: any, shareNoteDto: ShareNoteDto): Promise<import("../../database/entities/noteshare.entity").NoteShare>;
    getSharedWithMe(req: any): Promise<import("../../database/entities/noteshare.entity").NoteShare[]>;
    getSharedByMe(req: any): Promise<import("../../database/entities/noteshare.entity").NoteShare[]>;
    updatePermission(id: string, req: any, permission: SharePermission): Promise<import("../../database/entities/noteshare.entity").NoteShare>;
    remove(id: string, req: any): Promise<void>;
}

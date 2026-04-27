"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteshareService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const noteshare_entity_1 = require("../../database/entities/noteshare.entity");
const note_entity_1 = require("../../database/entities/note.entity");
const usuario_entity_1 = require("../../database/entities/usuario.entity");
let NoteshareService = class NoteshareService {
    constructor(noteShareRepository, noteRepository, usuarioRepository) {
        this.noteShareRepository = noteShareRepository;
        this.noteRepository = noteRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async shareNote(usuarioId, shareNoteDto) {
        const { noteId, userEmail, permission } = shareNoteDto;
        const note = await this.noteRepository.findOne({
            where: { id: noteId, usuarioId },
        });
        if (!note) {
            throw new common_1.NotFoundException('Nota no encontrada o no tienes permisos');
        }
        const userToShare = await this.usuarioRepository.findOne({
            where: { email: userEmail },
        });
        if (!userToShare) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const existingShare = await this.noteShareRepository.findOne({
            where: {
                noteId,
                sharedWithId: userToShare.id,
            },
        });
        if (existingShare) {
            throw new common_1.ForbiddenException('La nota ya está compartida con este usuario');
        }
        const noteShare = this.noteShareRepository.create({
            noteId,
            sharedWithId: userToShare.id,
            permission,
        });
        return this.noteShareRepository.save(noteShare);
    }
    async getSharedWithMe(usuarioId) {
        return this.noteShareRepository.find({
            where: { sharedWithId: usuarioId },
            relations: ['note', 'note.usuario'],
            order: { sharedAt: 'DESC' },
        });
    }
    async getSharedByMe(usuarioId) {
        return this.noteShareRepository.find({
            where: {
                note: { usuarioId },
            },
            relations: ['note', 'sharedWith'],
            order: { sharedAt: 'DESC' },
        });
    }
    async updatePermission(shareId, usuarioId, permission) {
        const share = await this.noteShareRepository.findOne({
            where: { id: shareId },
            relations: ['note'],
        });
        if (!share) {
            throw new common_1.NotFoundException('Compartido no encontrado');
        }
        if (share.note.usuarioId !== usuarioId) {
            throw new common_1.ForbiddenException('Solo el propietario puede cambiar permisos');
        }
        share.permission = permission;
        return this.noteShareRepository.save(share);
    }
    async unshareNote(shareId, usuarioId) {
        const share = await this.noteShareRepository.findOne({
            where: { id: shareId },
            relations: ['note'],
        });
        if (!share) {
            throw new common_1.NotFoundException('Compartido no encontrado');
        }
        if (share.note.usuarioId !== usuarioId) {
            throw new common_1.ForbiddenException('Solo el propietario puede dejar de compartir');
        }
        await this.noteShareRepository.remove(share);
    }
    async remove(shareId) {
        const share = await this.noteShareRepository.findOne({
            where: { id: shareId },
        });
        if (!share) {
            throw new common_1.NotFoundException('Compartido no encontrado');
        }
        await this.noteShareRepository.remove(share);
    }
};
exports.NoteshareService = NoteshareService;
exports.NoteshareService = NoteshareService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(noteshare_entity_1.NoteShare)),
    __param(1, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __param(2, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], NoteshareService);
//# sourceMappingURL=noteshare.service.js.map
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
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("../../database/entities/note.entity");
let NoteService = class NoteService {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    async create(usuarioId, createNoteDto) {
        const note = this.noteRepository.create({
            ...createNoteDto,
            usuarioId,
        });
        return this.noteRepository.save(note);
    }
    async findAll(usuarioId) {
        return this.noteRepository.find({
            where: { usuarioId },
            order: { updatedAt: 'DESC' },
        });
    }
    async findArchived(usuarioId) {
        return this.noteRepository.find({
            where: { usuarioId, archivada: true },
            order: { updatedAt: 'DESC' },
        });
    }
    async findOne(id, usuarioId) {
        const note = await this.noteRepository.findOne({
            where: { id },
            relations: ['shares'],
        });
        if (!note) {
            throw new common_1.NotFoundException('Nota no encontrada');
        }
        const isOwner = note.usuarioId === usuarioId;
        const hasSharedAccess = note.shares?.some((share) => share.sharedWithId === usuarioId);
        if (!isOwner && !hasSharedAccess) {
            throw new common_1.ForbiddenException('No tienes acceso a esta nota');
        }
        return note;
    }
    async update(id, usuarioId, updateNoteDto) {
        const note = await this.findOne(id, usuarioId);
        if (note.usuarioId !== usuarioId) {
            throw new common_1.ForbiddenException('Solo el propietario puede editar la nota');
        }
        Object.assign(note, updateNoteDto);
        return this.noteRepository.save(note);
    }
    async archive(id, usuarioId) {
        const note = await this.findOne(id, usuarioId);
        if (note.usuarioId !== usuarioId) {
            throw new common_1.ForbiddenException('Solo el propietario puede archivar la nota');
        }
        note.archivada = true;
        return this.noteRepository.save(note);
    }
    async unarchive(id, usuarioId) {
        const note = await this.findOne(id, usuarioId);
        if (note.usuarioId !== usuarioId) {
            throw new common_1.ForbiddenException('Solo el propietario puede desarchivar la nota');
        }
        note.archivada = false;
        return this.noteRepository.save(note);
    }
    async remove(id, usuarioId) {
        const note = await this.findOne(id, usuarioId);
        if (note.usuarioId !== usuarioId) {
            throw new common_1.ForbiddenException('Solo el propietario puede eliminar la nota');
        }
        await this.noteRepository.remove(note);
    }
};
exports.NoteService = NoteService;
exports.NoteService = NoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NoteService);
//# sourceMappingURL=note.service.js.map
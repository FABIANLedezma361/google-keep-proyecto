import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../../database/entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async create(usuarioId: string, createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create({
      ...createNoteDto,
      usuarioId,
    });

    return this.noteRepository.save(note);
  }

  async findAll(usuarioId: string): Promise<Note[]> {
    return this.noteRepository.find({
      where: { usuarioId },
      order: { updatedAt: 'DESC' },
    });
  }

  async findArchived(usuarioId: string): Promise<Note[]> {
    return this.noteRepository.find({
      where: { usuarioId, archivada: true },
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string, usuarioId: string): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ['shares'],
    });

    if (!note) {
      throw new NotFoundException('Nota no encontrada');
    }

    const isOwner = note.usuarioId === usuarioId;
    const hasSharedAccess = note.shares?.some(
      (share) => share.sharedWithId === usuarioId,
    );

    if (!isOwner && !hasSharedAccess) {
      throw new ForbiddenException('No tienes acceso a esta nota');
    }

    return note;
  }

  async update(id: string, usuarioId: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id, usuarioId);

    if (note.usuarioId !== usuarioId) {
      throw new ForbiddenException('Solo el propietario puede editar la nota');
    }

    Object.assign(note, updateNoteDto);
    return this.noteRepository.save(note);
  }

  async archive(id: string, usuarioId: string): Promise<Note> {
    const note = await this.findOne(id, usuarioId);

    if (note.usuarioId !== usuarioId) {
      throw new ForbiddenException('Solo el propietario puede archivar la nota');
    }

    note.archivada = true;
    return this.noteRepository.save(note);
  }

  async unarchive(id: string, usuarioId: string): Promise<Note> {
    const note = await this.findOne(id, usuarioId);

    if (note.usuarioId !== usuarioId) {
      throw new ForbiddenException('Solo el propietario puede desarchivar la nota');
    }

    note.archivada = false;
    return this.noteRepository.save(note);
  }

  async remove(id: string, usuarioId: string): Promise<void> {
    const note = await this.findOne(id, usuarioId);

    if (note.usuarioId !== usuarioId) {
      throw new ForbiddenException('Solo el propietario puede eliminar la nota');
    }

    await this.noteRepository.remove(note);
  }
}
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class NoteshareService {
  constructor(
    @InjectRepository(NoteShare)
    private noteShareRepository: Repository<NoteShare>,
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async shareNote(
    usuarioId: string,
    shareNoteDto: ShareNoteDto,
  ): Promise<NoteShare> {
    const { noteId, userEmail, permission } = shareNoteDto;

    // Verificar que la nota existe y pertenece al usuario
    const note = await this.noteRepository.findOne({
      where: { id: noteId, usuarioId },
    });

    if (!note) {
      throw new NotFoundException('Nota no encontrada o no tienes permisos');
    }

    // Buscar el usuario con el email proporcionado
    const userToShare = await this.usuarioRepository.findOne({
      where: { email: userEmail },
    });

    if (!userToShare) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar si ya está compartida
    const existingShare = await this.noteShareRepository.findOne({
      where: {
        noteId,
        sharedWithId: userToShare.id,
      },
    });

    if (existingShare) {
      throw new ForbiddenException('La nota ya está compartida con este usuario');
    }

    const noteShare = this.noteShareRepository.create({
      noteId,
      sharedWithId: userToShare.id,
      permission,
    });

    return this.noteShareRepository.save(noteShare);
  }

  async getSharedWithMe(usuarioId: string): Promise<NoteShare[]> {
    return this.noteShareRepository.find({
      where: { sharedWithId: usuarioId },
      relations: ['note', 'note.usuario'],
      order: { sharedAt: 'DESC' },
    });
  }

  async getSharedByMe(usuarioId: string): Promise<NoteShare[]> {
    return this.noteShareRepository.find({
      where: {
        note: { usuarioId },
      },
      relations: ['note', 'sharedWith'],
      order: { sharedAt: 'DESC' },
    });
  }

  async updatePermission(
    shareId: string,
    usuarioId: string,
    permission: SharePermission,
  ): Promise<NoteShare> {
    const share = await this.noteShareRepository.findOne({
      where: { id: shareId },
      relations: ['note'],
    });

    if (!share) {
      throw new NotFoundException('Compartido no encontrado');
    }

    if (share.note.usuarioId !== usuarioId) {
      throw new ForbiddenException('Solo el propietario puede cambiar permisos');
    }

    share.permission = permission;
    return this.noteShareRepository.save(share);
  }

  async unshareNote(shareId: string, usuarioId: string): Promise<void> {
    const share = await this.noteShareRepository.findOne({
      where: { id: shareId },
      relations: ['note'],
    });

    if (!share) {
      throw new NotFoundException('Compartido no encontrado');
    }

    if (share.note.usuarioId !== usuarioId) {
      throw new ForbiddenException('Solo el propietario puede dejar de compartir');
    }

    await this.noteShareRepository.remove(share);
  }

  async remove(shareId: string): Promise<void> {
    const share = await this.noteShareRepository.findOne({
      where: { id: shareId },
    });

    if (!share) {
      throw new NotFoundException('Compartido no encontrado');
    }

    await this.noteShareRepository.remove(share);
  }
}

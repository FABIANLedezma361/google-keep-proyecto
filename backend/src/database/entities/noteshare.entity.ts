import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Note } from './note.entity';
import { Usuario } from './usuario.entity';

export enum SharePermission {
  READ = 'READ',
  WRITE = 'WRITE',
}

@Entity('note_shares')
export class NoteShare {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('Note', 'shares', { onDelete: 'CASCADE' })
  @JoinColumn()
  note: Note;

  @Column()
  noteId: string;

  @ManyToOne('Usuario')
  @JoinColumn()
  sharedWith: Usuario;

  @Column()
  sharedWithId: string;

  @Column({
    type: 'enum',
    enum: SharePermission,
    default: SharePermission.READ,
  })
  permission: SharePermission;

  @CreateDateColumn()
  sharedAt: Date;
}

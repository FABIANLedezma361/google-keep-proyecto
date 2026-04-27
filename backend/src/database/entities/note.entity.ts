import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { NoteShare } from './noteshare.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column('text')
  contenido: string;

  @Column({ default: 'text' })
  tipo: string;

  @Column({ nullable: true })
  etiquetas: string;

  @Column({ type: 'jsonb', nullable: true })
  checklist: any;

  @Column({ nullable: true })
  recordatorio: Date;

  @Column({ default: false })
  archivada: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne('Usuario', 'notes', { onDelete: 'CASCADE' })
  usuario: Usuario;

  @Column()
  usuarioId: string;

  @OneToMany('NoteShare', 'note')
  shares: NoteShare[];
}

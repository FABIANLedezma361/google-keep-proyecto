import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, user => user.notes)
  user: Usuario;

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
  is_archived: boolean;
}

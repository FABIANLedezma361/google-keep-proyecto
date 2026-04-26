import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteshareService } from './noteshare.service';
import { NoteshareController } from './noteshare.controller';
import { NoteShare } from '../../database/entities/noteshare.entity';
import { Note } from '../../database/entities/note.entity';
import { Usuario } from '../../database/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoteShare, Note, Usuario])],
  controllers: [NoteshareController],
  providers: [NoteshareService],
  exports: [NoteshareService],
})
export class NoteshareModule {}

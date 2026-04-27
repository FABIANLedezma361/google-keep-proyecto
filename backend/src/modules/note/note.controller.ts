import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Request() req, @Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(String(req.user.userId), createNoteDto);
  }

  @Get()
  findAll(@Request() req) {
    return "FUNCIONA"; // 👈 PRUEBA TEMPORAL
  }

  @Get('archived')
  findArchived(@Request() req) {
    return this.noteService.findArchived(String(req.user.userId));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.noteService.findOne(id, String(req.user.userId));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.noteService.update(id, String(req.user.userId), updateNoteDto);
  }

  @Patch(':id/archive')
  archive(@Param('id') id: string, @Request() req) {
    return this.noteService.archive(id, String(req.user.userId));
  }

  @Patch(':id/unarchive')
  unarchive(@Param('id') id: string, @Request() req) {
    return this.noteService.unarchive(id, String(req.user.userId));
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.noteService.remove(id, String(req.user.userId));
  }
}
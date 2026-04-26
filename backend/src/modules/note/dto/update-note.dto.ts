import { IsString, IsOptional, IsBoolean, IsArray, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}

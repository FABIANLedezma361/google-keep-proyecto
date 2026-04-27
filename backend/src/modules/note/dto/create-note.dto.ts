import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNoteDto {
  @IsString()
  titulo: string;

  @IsString()
  contenido: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  etiquetas?: string;

  @IsOptional()
  recordatorio?: Date;

  @IsOptional()
  @IsBoolean()
  archivada?: boolean;
}

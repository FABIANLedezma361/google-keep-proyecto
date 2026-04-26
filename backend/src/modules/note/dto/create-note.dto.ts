import { IsString, IsOptional, IsBoolean, IsArray, IsDateString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  titulo: string;

  @IsString()
  contenido: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsBoolean()
  archivada?: boolean;

  @IsOptional()
  @IsDateString()
  recordatorio?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  etiquetas?: string[];
}

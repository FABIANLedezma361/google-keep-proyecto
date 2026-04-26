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
import { NoteshareService } from './noteshare.service';
import { ShareNoteDto } from './noteshare.service';
import { SharePermission } from '../../database/entities/noteshare.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('shares')
@UseGuards(JwtAuthGuard)
export class NoteshareController {
  constructor(private readonly noteshareService: NoteshareService) {}

  @Post('share')
  share(@Request() req, @Body() shareNoteDto: ShareNoteDto) {
    return this.noteshareService.shareNote(req.user.userId, shareNoteDto);
  }

  @Get('shared-with-me')
  getSharedWithMe(@Request() req) {
    return this.noteshareService.getSharedWithMe(req.user.userId);
  }

  @Get('shared-by-me')
  getSharedByMe(@Request() req) {
    return this.noteshareService.getSharedByMe(req.user.userId);
  }

  @Patch(':id')
  updatePermission(
    @Param('id') id: string,
    @Request() req,
    @Body('permission') permission: SharePermission,
  ) {
    return this.noteshareService.updatePermission(id, req.user.userId, permission);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.noteshareService.unshareNote(id, req.user.userId);
  }
}

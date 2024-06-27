import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AnswerResponseService } from './answer-response.service';
import { AuthGuard } from '../auth/auth.guard';
import { getCurrentUser } from '../auth/auth.decorator';
import { Role, user } from '@prisma/client';
import { AnswerResponseDTO, ratingDTO } from './answer-response.dto';
import { Roles } from '../auth/roles.guard';

@UseGuards(AuthGuard)
@Controller('answer-response')
export class AnswerResponseController {
  constructor(private readonly answerResponseService: AnswerResponseService) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  @Roles(Role.CANDIDATE)
  async getAnswerResponse(
    @getCurrentUser('id') currentUserId: user['id'],
    @Body() data: AnswerResponseDTO,
  ) {
    return this.answerResponseService.getAnswerResponse(currentUserId, data);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('')
  @Roles(Role.CANDIDATE)
  async submitResponse(
    @getCurrentUser('id') currentUserId: user['id'],
    @Body() data: AnswerResponseDTO,
  ) {
    return this.answerResponseService.updateAnswerResponse(currentUserId, data);
  }

  @Post('rate')
  @Roles(Role.REVIEWER)
  async rateResponse(@Body() data: ratingDTO) {
    return this.answerResponseService.rateResponse(data);
  }
}

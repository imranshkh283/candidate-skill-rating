import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role, user } from '@prisma/client';
import { getCurrentUser } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Roles(Role.CANDIDATE)
  @Get('getCandidateSkillRatings')
  getCandidateSkillRatings(@getCurrentUser('id') currentUserId: user['id']) {
    return this.userService.getCandidateSkillRatings(currentUserId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Roles(Role.REVIEWER)
  @Get('getCandidateSkillRatingsById/:id')
  getCandidateSkillRatingsById(@Param('id') id: user['id']) {
    return this.userService.getCandidateSkillRatings(id);
  }
}

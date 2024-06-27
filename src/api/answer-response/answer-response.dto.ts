import { PickType } from '@nestjs/mapped-types';
import { answer, user } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuesResDTO {
  @IsNotEmpty()
  @IsString()
  id: answer['id'];

  @IsNotEmpty()
  @IsString()
  userId: answer['userId'];

  @IsNotEmpty()
  @IsString()
  questionId: answer['questionId'];

  @IsNotEmpty()
  @IsNumber()
  response: answer['response'];

  @IsNotEmpty()
  @IsNumber()
  rating: answer['rating'];
}

export class AnswerResponseDTO extends PickType(QuesResDTO, [
  'questionId',
  'response',
] as const) {}

export class ratingDTO extends PickType(QuesResDTO, [
  'id',
  'rating',
] as const) {}

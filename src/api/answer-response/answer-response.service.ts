import {
  BadGatewayException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnswerResponseDTO, ratingDTO } from './answer-response.dto';
import { UserService } from '../user/user.service';
import { Ans, AnswerResponse } from './answer-response.type';

@Injectable()
export class AnswerResponseService {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getAnswerResponse(
    currentUserId: user['id'],
    { questionId, response }: AnswerResponseDTO,
  ) {
    const question = await this.prisma.question.findFirst({
      where: {
        id: questionId.toString(),
      },
    });
    if (question) {
      const result = await this.prisma.answer.create({
        data: {
          userId: currentUserId.toString(),
          questionId,
          response,
          rating: 0,
        },
        include: {
          question: {
            select: {
              skillId: true,
              difficultyLevel: true,
              question: true,
              answers: {
                select: {
                  response: true,
                },
              },
            },
          },
        },
      });

      const data = await this.convertToDesiredFormat(result);
      return data;
    }
  }

  async updateAnswerResponse(
    currentUserId: user['id'],
    { questionId, response }: AnswerResponseDTO,
  ): Promise<Ans<AnswerResponse>> {
    const id = await this.prisma.answer.findFirst({
      where: {
        questionId,
        userId: currentUserId,
      },
      select: {
        id: true,
      },
    });
    if (!id) {
      throw new BadGatewayException('No response found for this question');
    }

    const result = await this.prisma.answer.update({
      where: {
        id: id.id,
      },
      data: {
        response,
      },
      include: {
        question: {
          select: {
            skillId: true,
            difficultyLevel: true,
            question: true,
            answers: {
              select: {
                response: true,
              },
            },
          },
        },
      },
    });

    const data = await this.convertToDesiredFormat(result);
    return data;
  }

  async rateResponse({ id, rating }: ratingDTO): Promise<Ans<AnswerResponse>> {
    const userId = await this.prisma.answer.findUnique({
      where: {
        id: id.toString(),
      },
      select: {
        userId: true,
        questionId: true,
      },
    });

    const userExists = await this.userService.getUserById(userId.userId);

    if (!userExists) {
      throw new BadGatewayException('User does not exist');
    }

    const question = await this.prisma.question.findFirst({
      where: {
        id: userId.questionId,
      },
    });
    if (question) {
      const result = await this.prisma.answer.update({
        where: { id },
        data: {
          rating,
        },
        select: {
          question: {
            select: {
              skillId: true,
              question: true,
              difficultyLevel: true,
              answers: {
                select: {
                  response: true,
                  rating: true,
                },
              },
            },
          },
        },
      });
      const data = await this.convertToDesiredFormat(result);
      return data;
    }
  }

  async getCandidateSkillRatings(userId) {
    const result = await this.prisma.answer.findMany({
      where: {
        userId,
      },
      include: {
        question: {
          select: {
            skillId: true,
            difficultyLevel: true,
            question: true,
            answers: {
              select: {
                response: true,
                rating: true,
              },
            },
          },
        },
      },
    });

    return result;
  }

  async convertToDesiredFormat(data): Promise<Ans<AnswerResponse>> {
    return {
      skillId: data.question.skillId,
      difficulty_level: data.question.difficultyLevel.toLowerCase(),
      question: data.question.question,
      response: data.question.answers.map((answer) => {
        return {
          response: answer.response,
          rating: answer.rating > 0 ? answer.rating : 0,
        };
      }),
    };
  }
}

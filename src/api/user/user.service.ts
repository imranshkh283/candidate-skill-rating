import {
  BadGatewayException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnswerResponseService } from '../answer-response/answer-response.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(forwardRef(() => AnswerResponseService))
    private readonly answerResponseService: AnswerResponseService,
  ) {}

  async getUserByEmail(email: user['email']) {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });

    return user;
  }

  async getUserById(id: user['id']) {
    const user = this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    return user;
  }

  async getCandidateSkillRatings(userId: user['id']) {
    const userExists = await this.getUserById(userId);
    if (!userExists) {
      throw new BadGatewayException('User does not exist');
    }

    const result =
      await this.answerResponseService.getCandidateSkillRatings(userId);

    return result.map((rating) => {
      return {
        skillId: rating.question.skillId,
        difficulty_level: rating.question.difficultyLevel.toLowerCase(),
        question: rating.question.question,
        response: rating.question.answers.map((answer) => {
          return {
            response: answer.response,
            rating: answer.rating > 0 ? answer.rating : 0,
          };
        }),
      };
    });
  }
}

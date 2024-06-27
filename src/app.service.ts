import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async getHello() {
    // const insertBulk = await this.prisma.question.createMany({
    //   data:
    //   ],
    // });
    // return insertBulk;
  }
}

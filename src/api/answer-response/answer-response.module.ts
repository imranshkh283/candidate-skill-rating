import { Module, forwardRef } from '@nestjs/common';
import { AnswerResponseService } from './answer-response.service';
import { AnswerResponseController } from './answer-response.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AnswerResponseController],
  providers: [AnswerResponseService],
  exports: [AnswerResponseService],
})
export class AnswerResponseModule {}

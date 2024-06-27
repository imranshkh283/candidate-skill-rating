import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';

import { UserController } from './user.controller';
import { AnswerResponseModule } from '../answer-response/answer-response.module';

@Module({
  imports: [forwardRef(() => AnswerResponseModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

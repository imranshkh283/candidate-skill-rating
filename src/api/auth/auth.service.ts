import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { signInDTO, signUpDTO } from './auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly jwtService: JwtService,
  ) {}

  async signup({ name, email, password, role }: signUpDTO) {
    const user = await this.userService.getUserByEmail(email);

    if (user) {
      throw new BadRequestException('Email already used');
    }

    const hashedPassword = await hashPassword(password);

    return await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async login({ email, password }: signInDTO) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = { id: user.id, email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: process.env.BACKEND_JWT_SECRET,
    });
    delete user.password;
    return {
      ...user,
      token,
    };
  }
}

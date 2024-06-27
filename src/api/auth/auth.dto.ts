import { PickType } from '@nestjs/mapped-types';
import { Role, user } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  @IsString()
  name: user['name'];

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: user['email'];

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least one letter, one number, and one special character.',
  })
  password: user['password'];

  @IsString()
  @IsEnum(Role)
  role: Role;
}

export class signUpDTO extends PickType(AuthDTO, [
  'name',
  'email',
  'password',
  'role',
] as const) {}

export class signInDTO extends PickType(AuthDTO, [
  'email',
  'password',
] as const) {}

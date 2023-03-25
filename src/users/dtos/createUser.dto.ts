import {
  IsNotEmpty,
  IsAlphanumeric,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(8)
  password: string;
}

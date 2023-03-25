import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/createUser.dto';

@Controller('users')
export class UsersController {
  @Post('create')
  createUser(@Body() userData: CreateUserDto) {}
}

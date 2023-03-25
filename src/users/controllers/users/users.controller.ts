import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('users')
  getUsers() {
    return this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async createUser(@Body() userData: CreateUserDto) {
    const user = await this.userService.createUser(userData);
    return { success: true, user };
  }
}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findOneUser({ id });
  }

  @Post('signup')
  async createUser(@Body() userData: CreateUserDto) {
    const user = await this.userService.createUser(userData);
    return { success: true, user };
  }
}

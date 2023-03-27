import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/passport/jwt-auth.guard';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.userService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
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

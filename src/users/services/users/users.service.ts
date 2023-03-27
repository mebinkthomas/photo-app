import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../typeorm/entities/User.entity';
import { hashPassword } from '../../../utils/bcrypt';
import { CreateUserParams } from '../../../utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAllUsers() {
    return this.userRepository.find();
  }

  findOneUser(query: object): Promise<User | undefined> {
    return this.userRepository.findOneBy(query);
  }

  async createUser(userData: CreateUserParams) {
    const userExists = await this.userRepository.findOneBy({
      email: userData.email.toLowerCase(),
    });
    if (userExists)
      throw new HttpException('Invalid data supplied', HttpStatus.BAD_REQUEST);

    const password = await hashPassword(userData.password);
    const newUser = this.userRepository.create({ ...userData, password });
    return this.userRepository.save(newUser);
  }
}

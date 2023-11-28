import { Injectable } from '@nestjs/common';
import { createUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: createUserDTO): Promise<UserEntity> {
    const satlOrRounds = 10;
    const hashedPassword = await hash(createUserDTO.password, satlOrRounds);

    return this.userRepository.save({
      ...createUserDTO,
      password: hashedPassword,
      typeUser: 1,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
